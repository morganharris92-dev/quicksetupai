// app/api/contact/route.ts
import { NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

// Where YOU receive messages:
const TO = "contactquicksetupai@gmail.com";

// Visible “From” (must be on your verified domain; doesn’t need a real inbox)
const FROM = "QuickSetupAI <no-reply@quicksetupai.com>";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let name = "";
    let email = "";
    let message = "";
    let followUp = "";
    let phone = "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = (body.name || "").toString();
      email = (body.email || "").toString();
      message = (body.message || "").toString();
      followUp = (body.followUp || "").toString();
      phone = (body.phone || "").toString();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      name = (form.get("name") || "").toString();
      email = (form.get("email") || "").toString();
      message = (form.get("message") || "").toString();
      followUp = (form.get("followUp") || "").toString();
      phone = (form.get("phone") || "").toString();
    } else if (contentType.includes("text/plain")) {
      const text = await req.text();
      for (const line of text.split("\n")) {
        const [k, ...rest] = line.split(":");
        const v = rest.join(":").trim();
        if (k?.toLowerCase() === "name") name = v;
        if (k?.toLowerCase() === "email") email = v;
        if (k?.toLowerCase() === "message") message = v;
        if (k?.toLowerCase() === "followup") followUp = v;
        if (k?.toLowerCase() === "phone") phone = v;
      }
    } else {
      return new Response(JSON.stringify({ ok: false, error: "Unsupported Content-Type" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing name, email, or message" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid email" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const subject = `New QuickSetupAI inquiry from ${name}`;

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);
    const safeFollow = sanitize(followUp || "—");
    const safePhone = sanitize(phone || "—");

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Preferred follow-up:</strong> ${safeFollow}</p>
        <p><strong>Phone (if call):</strong> ${safePhone}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${safeMessage}</pre>
      </div>
    `;
    const text = `New Contact Form Submission

Name: ${name}
Email: ${email}
Preferred follow-up: ${followUp || "—"}
Phone (if call): ${phone || "—"}

Message:
${message}
`;

    // 1) Send to you
    {
      const { error } = await resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email, // camelCase for your current Resend SDK
        subject,
        html,
        text,
      });
      if (error) {
        return new Response(JSON.stringify({ ok: false, error: String(error) }), {
          status: 500,
          headers: { "content-type": "application/json" },
        });
      }
    }

    // 2) Auto-reply to the sender (keeps your existing behavior)
    {
      const autoHtml = `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
          <h2>Thanks, ${safeName} — we got your message ✅</h2>
          <p>We typically respond within 24 hours.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
          <p><strong>Your message:</strong></p>
          <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${safeMessage}</pre>
          <p style="color:#6b7280;font-size:12px;margin-top:16px">If you didn’t submit this, you can ignore this email.</p>
        </div>
      `;
      const autoText = `Thanks, ${name} — we got your message. We typically respond within 24 hours.

Your message:
${message}
`;

      const { error: autoErr } = await resend.emails.send({
        from: FROM,
        to: email,
        subject: "We received your message — QuickSetupAI",
        html: autoHtml,
        text: autoText,
      });
      // Note: even if auto-reply fails, we don't block the main success path.
      if (autoErr) {
        console.warn("Auto-reply failed:", autoErr);
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Unknown error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}