// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "edge"; // runs great on Cloudflare/Next-on-Pages

const resend = new Resend(process.env.RESEND_API_KEY);

// If you verify a sender in Resend later, set RESEND_FROM in Cloudflare.
// Until then, Resend’s sandbox sender works for testing:
const FROM = process.env.RESEND_FROM || "onboarding@resend.dev";

// Where you want to receive the messages:
const TO = "contactquicksetupai@gmail.com";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  // Support both standard form POSTs and JSON fetches
  let name = "";
  let email = "";
  let message = "";
  let honeypot = "";

  const ctype = req.headers.get("content-type") || "";

  if (ctype.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    name = (body.name || "").toString().trim();
    email = (body.email || "").toString().trim();
    message = (body.message || "").toString().trim();
    honeypot = (body.company || "").toString().trim();
  } else {
    const form = await req.formData();
    name = String(form.get("name") || "").trim();
    email = String(form.get("email") || "").trim();
    message = String(form.get("message") || "").trim();
    // honeypot (hidden field). Bots will often fill it.
    honeypot = String(form.get("company") || "").trim();
  }

  // Silently accept bots that fill the honeypot
  if (honeypot) return new Response(null, { status: 204 });

  // Basic validation
  if (!name || !email || !message || !isEmail(email)) {
    return Response.json({ ok: false, error: "Invalid form data." }, { status: 400 });
  }

  // Compose email
  const subject = `New QuickSetupAI contact from ${name}`;
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.6;">
      <h2>New contact submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    </div>
  `;
  const text = `New contact submission

Name: ${name}
Email: ${email}

Message:
${message}
`;

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email, // reply in your inbox goes back to the sender
      subject,
      html,
      text,
    });

    // If the browser posted a regular form, redirect to thanks page
    if (!ctype.includes("application/json")) {
      return Response.redirect(new URL("/thanks", req.url), 303);
    }
    return Response.json({ ok: true });
  } catch (err: any) {
    console.error("Resend error:", err);
    return Response.json(
      { ok: false, error: err?.message || "Failed to send email" },
      { status: 500 }
    );
  }
}

// Simple HTML escape to avoid any odd characters breaking markup
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
