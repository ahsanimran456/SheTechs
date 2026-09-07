"use client";

import { FormEvent, useState } from "react";
import {
  validateContact,
  type ContactPayload,
  type FieldErrors,
} from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success" | "error";

const initial: ContactPayload = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");

    const result = validateContact(form);
    setErrors(result.errors);
    if (!result.ok) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        setServerMessage(
          data.message ??
            "Something went wrong. Please try again or email directly.",
        );
        return;
      }

      setStatus("success");
      setForm(initial);
      setErrors({});
      trackEvent("contact_submit", { ok: true });
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please try again shortly.");
      trackEvent("contact_submit", { ok: false });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-[1.85rem] border border-border/80 bg-[linear-gradient(165deg,#fffcf8_0%,#f4f1eb_100%)] p-7 shadow-[0_20px_50px_rgba(20,24,31,0.08)] md:p-9"
      noValidate
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-soft/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="eyebrow">Message</p>
        <h3 className="subheading mt-2 text-ink">
          Partnership inquiry
        </h3>
        <p className="mt-2 text-[1.02rem] leading-relaxed text-muted">
          Share a brief overview of your campaign goals, timeline, and how you
          found this page.
        </p>
      </div>

      <div className="relative mt-8 grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          value={form.name}
          error={errors.name}
          onChange={(value) => setForm((f) => ({ ...f, name: value }))}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={form.email}
          error={errors.email}
          onChange={(value) => setForm((f) => ({ ...f, email: value }))}
        />
        <div className="sm:col-span-2">
          <Field
            id="company"
            label="Company"
            value={form.company ?? ""}
            error={errors.company}
            onChange={(value) => setForm((f) => ({ ...f, company: value }))}
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            id="message"
            label="Message"
            required
            multiline
            value={form.message}
            error={errors.message}
            onChange={(value) => setForm((f) => ({ ...f, message: value }))}
          />
        </div>

        {/* Honeypot - hidden from users */}
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website ?? ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, website: e.target.value }))
            }
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary relative mt-7 w-full sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>

      <div className="relative mt-4 min-h-[1.5rem]" aria-live="polite">
        {status === "success" ? (
          <p className="text-[0.95rem] text-accent-deep">
            Message sent. Maham will get back to you soon.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-[0.95rem] text-red-700">{serverMessage}</p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  multiline,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  multiline?: boolean;
}) {
  const describedBy = error ? `${id}-error` : undefined;
  const shared = cn(
    "mt-2 w-full rounded-2xl border bg-white/85 px-4 py-3.5 text-[1.02rem] outline-none transition duration-200",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]",
    error
      ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(220,38,38,0.12)]"
      : "border-border focus:border-accent focus:shadow-[0_0_0_4px_rgba(31,107,102,0.14)]",
  );

  return (
    <div>
      <label htmlFor={id} className="text-[0.95rem] font-medium text-ink">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
        {!required ? (
          <span className="font-normal text-faint"> (optional)</span>
        ) : null}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={6}
          required={required}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          placeholder="Share your campaign goals, timeline, and partnership details…"
          className={cn(shared, "min-h-[9rem] resize-y")}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={shared}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
