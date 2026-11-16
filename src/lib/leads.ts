import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { serviceLabel, type ContactInput } from "./contact-schema";

export type DeliveryResult = { channel: "supabase" | "email"; ok: boolean; error?: string };

export const supabaseConfigured = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
export const emailConfigured = () =>
  Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL);

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Saves the lead in the `leads` table (see supabase/schema.sql). */
export async function saveLead(input: ContactInput, meta: { ip: string; userAgent: string }): Promise<DeliveryResult> {
  try {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { error } = await supabase.from("leads").insert({
      full_name: input.fullName,
      email: input.email,
      company: input.company,
      industry: input.industry,
      service: input.service,
      budget: input.budget,
      description: input.description,
      ip: meta.ip,
      user_agent: meta.userAgent.slice(0, 300),
    });
    if (error) return { channel: "supabase", ok: false, error: error.message };
    return { channel: "supabase", ok: true };
  } catch (e) {
    return { channel: "supabase", ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

/** Emails the inquiry to CONTACT_TO_EMAIL through Resend. */
export async function emailLead(input: ContactInput): Promise<DeliveryResult> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const rows: [string, string][] = [
      ["Name", input.fullName],
      ["Email", input.email],
      ["Company", input.company],
      ["Industry", input.industry],
      ["Service", serviceLabel(input.service)],
      ["Budget", input.budget],
    ];
    const html = `
      <h2>New inquiry from ${escapeHtml(input.fullName)}</h2>
      <table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
        .join("")}</table>
      <h3>Project description</h3>
      <p style="white-space:pre-wrap">${escapeHtml(input.description)}</p>`;
    const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${input.description}`;

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: input.email,
      subject: `New inquiry: ${input.company} (${serviceLabel(input.service)})`,
      html,
      text,
    });
    if (error) return { channel: "email", ok: false, error: error.message };
    return { channel: "email", ok: true };
  } catch (e) {
    return { channel: "email", ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

/** Verifies a Cloudflare Turnstile token. */
export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export const turnstileEnabled = () => Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
