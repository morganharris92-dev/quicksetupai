// app/api/contact/route.ts
import { NextResponse } from "next/server";

// Make this route run on Cloudflare's Edge runtime
export const runtime = "edge";

// --- EDIT THIS: set where you want to RECEIVE emails ---
const RECIPIENTS = ["hello@quicksetupai.com"]; 
// If you haven't set up hello@quicksetupai.com yet, temporarily do: 
// const RECIPIENTS = ["yourgmail@example.com"];

// Optional helper to safely render text in HTML
function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));
}

export async function POST(request: Request) {
  try {
    // The form posts as application/x-www-form-urlencoded
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    // Honeypot (hidden field). Bots will fill this; humans won’t.
    const company = String(formData.get("company") || "").trim();
    if (company) {
      // Silently succeed to /thanks to avoid tipping off bots
      return NextResponse.redirect(new URL("/thanks", request.url), 303);
    }

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Use your verified sender if available, otherwise use onboarding@resend.dev
    const fromAddress =
      process.env.RESEND_FROM || "QuickSetupAI <onboarding@resend.dev>";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: RECIPIENTS,
        reply_to: email,
        subject: `New contact from ${name}`,
        html: `
          <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const details = await res.text().catch(() => "No details");
      return NextResponse.json(
        { ok: false, error: "Resend API error", details },
        { status: 502 }
      );
    }

    // On success, send user to /thanks
    return NextResponse.redirect(new URL("/thanks", request.url), 303);
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

