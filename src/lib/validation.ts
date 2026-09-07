export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string; // honeypot
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactPayload): {
  ok: boolean;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const company = input.company?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 100) errors.name = "Name is too long.";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  else if (email.length > 200) errors.email = "Email is too long.";

  if (company.length > 120) errors.company = "Company name is too long.";

  if (!message) errors.message = "Please enter a message.";
  else if (message.length < 10)
    errors.message = "Message must be at least 10 characters.";
  else if (message.length > 4000) errors.message = "Message is too long.";

  return { ok: Object.keys(errors).length === 0, errors };
}

export function sanitizeContact(input: ContactPayload): ContactPayload {
  return {
    name: input.name.trim().slice(0, 100),
    email: input.email.trim().toLowerCase().slice(0, 200),
    company: input.company?.trim().slice(0, 120) || undefined,
    message: input.message.trim().slice(0, 4000),
    website: input.website?.trim() || undefined,
  };
}
