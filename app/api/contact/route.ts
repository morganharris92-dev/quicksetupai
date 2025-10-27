// app/api/contact/route.ts
import { NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "edge"; // great on Cloudflare/Next-on-Pages

// Where YOU receive messages:
const TO = "contactquicksetupai@gmail.com";

// The visible "From" line on the email your inbox receives.
// This must be on a domain verified in Resend DNS, but it doesn't need a real mailbox.
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
      // naive parse of key:value lines
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
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

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

    // 1) Send notification to you
    const resOwner = await resend.emails.send({
      from: FROM,
      to: TO,
      // keep the same casing that worked in your build
      reply_to: email, // replies in your inbox go back to the sender
      subject,
      html,
      text
    });

    if (resOwner.error) {
      return new Response(JSON.stringify({ ok: false, error: String(resOwner.error) }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

    // 2) Send auto-reply to the lead (best-effort)
    const autoSubject = "Thanks! We’ve got your message ✅";
    const autoHtml = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height:1.5">
        <p>Hi ${safeName},</p>
        <p>Thanks for reaching out. We’ve got your message and we’ll reply within 24 hours with next steps.</p>
        <p>If you’d like to talk sooner, you can book a time here:<br/>
          <a href="https://calendly.com/morgan-harris92/30min">Book a Free AI Setup Call</a>
        </p>
        <p>— QuickSetupAI</p>
      </div>
    `;
    const autoText =
`Hi ${name},

Thanks for reaching out. We’ve got your message and we’ll reply within 24 hours with next steps.

Prefer to talk sooner? Book here:
https://calendly.com/morgan-harris92/30min

— QuickSetupAI
`;
    // Fire and forget; no need to block success if this fails
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: autoSubject,
      html: autoHtml,
      text: autoText
    });

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