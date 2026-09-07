import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  sanitizeContact,
  validateContact,
  type ContactPayload,
} from "@/lib/validation";
import { siteConfig } from "@/content/site";

export const runtime = "nodejs";

async function deliverEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from =
    process.env.CONTACT_FROM_EMAIL || "Maham Techworld <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] Dev mode - message received:", payload);
      return { ok: true as const, mode: "dev-log" as const };
    }
    return {
      ok: false as const,
      message: "Email delivery is not configured yet.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `New collaboration enquiry from ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company || "-"}`,
        "",
        payload.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("[contact] Resend error:", detail);
    return {
      ok: false as const,
      message: "Unable to send message right now. Please email directly.",
    };
  }

  return { ok: true as const, mode: "resend" as const };
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limited = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot - silently succeed for bots
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const clean = sanitizeContact(body);
  const validation = validateContact(clean);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors, message: "Please fix the highlighted fields." },
      { status: 400 },
    );
  }

  const delivery = await deliverEmail(clean);
  if (!delivery.ok) {
    return NextResponse.json(
      { ok: false, message: delivery.message },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
