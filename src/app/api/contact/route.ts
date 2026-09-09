import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import {
  sanitizeContact,
  validateContact,
  type ContactPayload,
} from "@/lib/validation";

export const runtime = "nodejs";

async function deliverEmail(payload: ContactPayload) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] Dev mode - message received:", payload);
      return { ok: true as const, mode: "dev-log" as const };
    }
    return {
      ok: false as const,
      message: "Email delivery is not configured yet.",
    };
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New collaboration enquiry from ${payload.name}`,
      from_name: "Maham Techworld Website",
      name: payload.name,
      email: payload.email,
      company: payload.company || "-",
      message: payload.message,
    }),
  });

  const detail = await response.text();
  let parsed: { success?: boolean; message?: string } = {};
  try {
    parsed = JSON.parse(detail) as { success?: boolean; message?: string };
  } catch {
    // non-JSON body
  }

  if (!response.ok || parsed.success === false) {
    console.error("[contact] Web3Forms error:", detail);
    return {
      ok: false as const,
      message:
        process.env.NODE_ENV === "development" && parsed.message
          ? parsed.message
          : "Unable to send message right now. Please email directly.",
    };
  }

  return { ok: true as const, mode: "web3forms" as const };
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
      {
        ok: false,
        errors: validation.errors,
        message: "Please fix the highlighted fields.",
      },
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
