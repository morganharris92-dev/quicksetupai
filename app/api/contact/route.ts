// app/api/contact/route.ts
import { NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "edge"; // great on Cloudflare/Next-on-Pages

// Where YOU receive messages:
const TO = "contactquicksetupai@gmail.com";

// The visible "From" line on emails sent via Resend.
// Must be on your verified domain (quicksetupai.com).
const FROM = "QuickSetupAI <no-reply@quicksetupai.com>";

// Auto-reply will also come from the same FROM address.
const resend = new Resend(process.env.RESEND_API_KEY);

// small, safe HTML escaping
function escapeHtml(s: string) {
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

    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = (body.name || "").toString();
      email = (body.email || "").toString();
      message = (body.message || "").toString();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      name = (form.get("name") || "").toString();
      email = (form.get("email") || "").toString();
      message = (form.get("message") || "").toString();
    } else if (contentType.includes("text/plain")) {
      const text = await req.text();
      for (const line of text.split("\n")) {
        const [k, ...rest] = line.split(":");
        const v = rest.join(":").trim();
        if (k?.toLowerCase() === "name") name = v;
        if (k?.toLowerCase() === "email") email = v;
        if (k?.toLowerCase() === "message") message = v;
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

    // basic email sanity
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid email" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const subject = `New QuickSetupAI inquiry from ${name}`;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${safeMessage}</pre>
      </div>
    `;
    const text = `New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
`;

    // 1) Send the inquiry to you
    const adminSend = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email, // <- correct casing for your installed Resend SDK
      subject,
      html,
      text,
    });

    if (adminSend.error) {
      return new Response(JSON.stringify({ ok: false, error: String(adminSend.error) }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

    // 2) Auto-reply to the sender
    const autoReplySubject = "Thanks! We’ve got your info — QuickSetupAI";
    const autoReplyHtml = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
        <h2>Thanks, ${safeName}!</h2>
        <p>We’ve received your message and will review your business and send a free AI Blueprint within 24 hours.</p>
        <p>Want to talk sooner? You can book a call here:</p>
        <p><a href="https://calendly.com/morgan-harris92/30min">Book a quick setup call</a></p>
        <hr />
        <p style="color:#64748b;font-size:12px;">Sent by QuickSetupAI · quicksetupai.com</p>
      </div>
    `;
    const autoReplyText =
      `Thanks, ${name}!\n\n` +
      `We’ve received your message and will review your business and send a free AI Blueprint within 24 hours.\n\n` +
      `Book a quick setup call: https://calendly.com/morgan-harris92/30min\n`;

    const userSend = await resend.emails.send({
      from: FROM,
      to: email,
      subject: autoReplySubject,
      html: autoReplyHtml,
      text: autoReplyText,
    });

    if (userSend.error) {
      // don't fail the whole request if auto-reply trips — you still got the lead
      console.warn("Auto-reply failed:", userSend.error);
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