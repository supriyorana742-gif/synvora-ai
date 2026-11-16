"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Script from "next/script";
import { CircleCheck, CircleAlert, LoaderCircle } from "lucide-react";
import {
  budgets,
  contactSchema,
  industries,
  serviceOptions,
  type ContactFieldErrors,
} from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  defaultService?: string;
  turnstileSiteKey?: string;
}

const inputClass =
  "w-full rounded-(--radius-control) border border-line-strong bg-surface px-3.5 py-3 text-base text-ink placeholder:text-muted/60 transition-colors hover:border-white/30 focus:border-brand focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-[invalid=true]:border-danger";

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
    onTurnstileExpired?: () => void;
  }
}

export function ContactForm({ defaultService, turnstileSiteKey }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [token, setToken] = useState<string | undefined>();
  const startedAt = useRef<number>(0);
  const errorSummary = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    window.onTurnstileSuccess = (t) => setToken(t);
    window.onTurnstileExpired = () => setToken(undefined);
    return () => {
      delete window.onTurnstileSuccess;
      delete window.onTurnstileExpired;
    };
  }, []);

  const validService = serviceOptions.some((s) => s.value === defaultService) ? defaultService : "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setFormError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const payload = { ...data, startedAt: startedAt.current, turnstileToken: token };

    // Same schema as the server, so messages match.
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe: ContactFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFieldErrors | undefined;
        if (key && !fe[key]) fe[key] = issue.message;
      }
      setErrors(fe);
      setStatus("idle");
      setFormError("Check the highlighted fields and try again.");
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }
    if (turnstileSiteKey && !token) {
      setErrors({});
      setStatus("error");
      setFormError("Complete the spam check before sending.");
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; message?: string; fieldErrors?: ContactFieldErrors }
        | null;

      if (res.ok && body?.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      if (body && !body.ok && body.fieldErrors) setErrors(body.fieldErrors);
      setFormError((body && !body.ok && body.message) || "Something went wrong. Please try again.");
      setStatus("error");
      requestAnimationFrame(() => errorSummary.current?.focus());
    } catch {
      setFormError(`We could not reach the server. Check your connection and try again, or email ${siteConfig.email}.`);
      setStatus("error");
      requestAnimationFrame(() => errorSummary.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-(--radius-card) border border-ok/40 bg-ok/10 p-8">
        <CircleCheck aria-hidden className="size-8 text-ok" />
        <h2 className="mt-4 text-2xl font-semibold">Inquiry received.</h2>
        <p className="mt-2 text-muted">
          Thanks for the details. We will read your message and reply to the email you provided.
        </p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setToken(undefined);
            setStatus("idle");
          }}
          className="mt-6 text-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const describe = (id: string, hint?: boolean) =>
    [errors[id as keyof ContactFieldErrors] ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") ||
    undefined;
  const invalid = (id: keyof ContactFieldErrors) => (errors[id] ? true : undefined);

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === "submitting"} className="space-y-6">
      {turnstileSiteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      )}

      {formError && (
        <div
          ref={errorSummary}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-(--radius-card) border border-danger/50 bg-danger/10 p-4 text-sm"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-danger" />
          <p>{formError}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="fullName" label="Full name" error={errors.fullName}>
          <input id="fullName" name="fullName" type="text" autoComplete="name" required aria-invalid={invalid("fullName")} aria-describedby={describe("fullName")} className={inputClass} />
        </Field>
        <Field id="email" label="Business email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required aria-invalid={invalid("email")} aria-describedby={describe("email")} className={inputClass} />
        </Field>
        <Field id="company" label="Company name" error={errors.company}>
          <input id="company" name="company" type="text" autoComplete="organization" required aria-invalid={invalid("company")} aria-describedby={describe("company")} className={inputClass} />
        </Field>
        <Field id="industry" label="Industry" error={errors.industry}>
          <select id="industry" name="industry" defaultValue="" required aria-invalid={invalid("industry")} aria-describedby={describe("industry")} className={inputClass}>
            <option value="" disabled>
              Select an industry
            </option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </Field>
        <Field id="service" label="Service required" error={errors.service}>
          <select id="service" name="service" defaultValue={validService} required aria-invalid={invalid("service")} aria-describedby={describe("service")} className={inputClass}>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Project budget" error={errors.budget}>
          <select id="budget" name="budget" defaultValue="" required aria-invalid={invalid("budget")} aria-describedby={describe("budget")} className={inputClass}>
            <option value="" disabled>
              Select a range
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="description"
        label="Project description"
        error={errors.description}
        hint="What task slows your team down, and which tools are involved today?"
      >
        <textarea
          id="description"
          name="description"
          rows={6}
          required
          aria-invalid={invalid("description")}
          aria-describedby={describe("description", true)}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech. Bots that fill it are rejected. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {turnstileSiteKey && (
        <div
          className="cf-turnstile"
          data-sitekey={turnstileSiteKey}
          data-theme="dark"
          data-callback="onTurnstileSuccess"
          data-expired-callback="onTurnstileExpired"
        />
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-w-44 items-center justify-center gap-2 rounded-(--radius-control) bg-brand px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#5b8aff] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          "Submit Inquiry"
        )}
      </button>
    </form>
  );
}
