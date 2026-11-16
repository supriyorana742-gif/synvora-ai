import { NextResponse, type NextRequest } from "next/server";
import { contactSchema, type ContactFieldErrors } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";
import {
  emailConfigured,
  emailLead,
  saveLead,
  supabaseConfigured,
  turnstileEnabled,
  verifyTurnstile,
  type DeliveryResult,
} from "@/lib/leads";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 3_000;

type ErrorBody = { ok: false; code: string; message: string; fieldErrors?: ContactFieldErrors };
const fail = (status: number, code: string, message: string, fieldErrors?: ContactFieldErrors) =>
  NextResponse.json<ErrorBody>({ ok: false, code, message, fieldErrors }, { status });

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!rateLimit(`contact:${ip}`)) {
    return fail(429, "rate_limited", "Too many submissions. Wait a few minutes and try again, or email us directly.");
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return fail(413, "too_large", "That message is too large.");

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return fail(400, "bad_json", "The request could not be read. Reload the page and try again.");
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFieldErrors | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // A filled honeypot fails validation above; report it as a generic failure, not as a field error.
    if (fieldErrors.website) return fail(400, "rejected", "The submission was rejected.");
    return fail(422, "validation", "Check the highlighted fields and try again.", fieldErrors);
  }
  const input = parsed.data;

  // Time trap: humans take longer than 3 seconds to fill seven fields.
  if (!input.startedAt || Date.now() - input.startedAt < MIN_FILL_MS) {
    return fail(400, "too_fast", "That was too quick. Wait a moment and send it again.");
  }

  if (turnstileEnabled() && !(await verifyTurnstile(input.turnstileToken, ip))) {
    return fail(400, "captcha", "Spam check failed. Complete the check and try again.");
  }

  const useDb = supabaseConfigured();
  const useEmail = emailConfigured();

  // Never pretend a submission worked when nothing is set up to receive it.
  if (!useDb && !useEmail) {
    console.error("[contact] No delivery channel configured. Set Supabase and/or Resend variables (see .env.example).");
    return fail(
      503,
      "not_configured",
      "The contact form is not connected yet, so your message was not sent. Please email us directly.",
    );
  }

  const meta = { ip, userAgent: req.headers.get("user-agent") ?? "" };
  const results: DeliveryResult[] = await Promise.all([
    useDb ? saveLead(input, meta) : null,
    useEmail ? emailLead(input) : null,
  ]).then((r) => r.filter((x): x is DeliveryResult => x !== null));

  for (const r of results) if (!r.ok) console.error(`[contact] ${r.channel} delivery failed:`, r.error);

  if (!results.some((r) => r.ok)) {
    return fail(502, "delivery_failed", "We could not record your message. Please try again, or email us directly.");
  }

  return NextResponse.json({ ok: true });
}
