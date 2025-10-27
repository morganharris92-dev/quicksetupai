// app/api/contact/route.ts
import { NextRequest } from "next/server";

export const runtime = "edge"; // runs great on Cloudflare/Next-on-Pages

// ✅ Configure addresses here if you ever need to change them.
// We default FROM to Resend's onboarding address so it works even
// if your domain isn't verified yet.
const TO = (process.env.TO_EMAIL || "contactquicksetupai@gmail.com").trim();
const FROM =
  (process.env.FROM_EMAIL || "QuickSetupAI <onboarding@resend.dev>").trim();

export async function POST(req: NextRequest) {
  try {
    // 1) Read form data (works with your existing <form method="post">)
    const form = await req.formData();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const subject =
      String(form.get("subject") || "").trim() ||
      `New message from ${name || "Website"}`;

    if (!name || !email || !message) {
      return html(
        400,
        "Missing required fields. Please go back and complete the form."
      );
    }

    // 2) Assemble email
    const htmlBody = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#0f172a">
        <h2 style="margin:0 0 12px">New Website Inquiry</h2>
        <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:16px 0 4px"><strong>Message:</strong></p>
        <div style="white-space:pre-wrap">${escapeHtml(message)}</div>
      </div>
    `.trim();

    const textBody = `New Website Inquiry

Name: ${name}
Email: ${email}

Message:
${message}
`.trim();

    // 3) Send via Resend HTTP API (no SDK; edge-safe)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      // Secret not available to this environment
      return html(
        500,
        "Email service is not configured. Please try again later."
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,           // e.g., 'QuickSetupAI <onboarding@resend.dev>' or your verified domain
        to: [TO],             // contactquicksetupai@gmail.com
        reply_to: email,      // so Reply in your inbox goes back to the sender
        subject,
        html: htmlBody,
        text: textBody,
      }),
    });

    // 4) Handle API response
    if (!res.ok) {
      // Don’t leak internal details to the user, but log error text for debugging
      // (Cloudflare will show this in function logs)
      const errText = await res.text().catch(() => "");
      console.error("Resend API error:", res.status, errText);
      return html(500, "Failed to send message. Please try again later.");
    }

    // 5) Success — keep the UX you asked for (no layout changes)
    return html(200, "Message sent! We typically respond within 24 hours.");
  } catch (e) {
    console.error("Contact route error:", e);
    return html(500, "Failed to send message. Please try again later.");
  }
}

// Small helper to return minimal HTML (works with plain <form> posts)
function html(status: number, message: string): Response {
  const body = `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(message)}</title>
<body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;display:grid;place-items:center;height:100dvh;margin:0;background:#f8fafc">
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:24px;max-width:560px;box-shadow:0 10px 20px rgba(2,6,23,.06)">
    <p style="margin:0;font-size:16px;color:#0f172a">${escapeHtml(
      message
    )}</p>
    <div style="margin-top:16px">
      <a href="/" style="text-decoration:none;border-radius:10px;padding:10px 14px;border:1px solid #e2e8f0;background:#f1f5f9;color:#0f172a">Back to site</a>
    </div>
  </div>
</body>
</html>`;
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}