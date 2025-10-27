// app/api/contact/route.ts
import { NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

const TO = "contactquicksetupai@gmail.com";
const FROM = "QuickSetupAI <no-reply@quicksetupai.com>";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(s: string) {
  return s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
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

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      reply_to: email, // keep using snake_case that worked in your build
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

    // (Auto-reply block you already added can remain here, unchanged)
    // If you removed it earlier, you can keep this file as-is and it will still work.

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