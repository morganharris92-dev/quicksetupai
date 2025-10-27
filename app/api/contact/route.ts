// app/api/contact/route.ts
import { NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "edge"; // works great on Cloudflare/Next-on-Pages

// Where YOU receive messages:
const TO = "contactquicksetupai@gmail.com";

// Must be on your verified domain (quicksetupai.com).
const FROM = "QuickSetupAI <no-reply@quicksetupai.com>";

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

    // required
    let name = "";
    let email = "";
    let message = "";

    // optional intake fields
    let business = "";
    let website = "";
    let tools = "";
    let budget = "";
    let followUp = ""; // "Email" | "Call" | ""
    let phone = "";    // only required if followUp === "Call"

    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = (body.name || "").toString();
      email = (body.email || "").toString();
      message = (body.message || "").toString();
      business = (body.business || "").toString();
      website = (body.website || "").toString();
      tools = (body.tools || "").toString();
      budget = (body.budget || "").toString();
      followUp = (body.followUp || "").toString();
      phone = (body.phone || "").toString();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      name = (form.get("name") || "").toString();
      email = (form.get("email") || "").toString();
      message = (form.get("message") || "").toString();
      business = (form.get("business") || "").toString();
      website = (form.get("website") || "").toString();
      tools = (form.get("tools") || "").toString();
      budget = (form.get("budget") || "").toString();
      followUp = (form.get("followUp") || "").toString();
      phone = (form.get("phone") || "").toString();
    } else if (contentType.includes("text/plain")) {
      const text = await req.text();
      for (const line of text.split("\n")) {
        const [k, ...rest] = line.split(":");
        const v = rest.join(":").trim();
        if (!k) continue;
        const key = k.toLowerCase();
        if (key === "name") name = v;
        if (key === "email") email = v;
        if (key === "message") message = v;
        if (key === "business") business = v;
        if (key === "website") website = v;
        if (key === "tools") tools = v;
        if (key === "budget") budget = v;
        if (key === "preferred follow-up" || key === "followup" || key === "follow_up") followUp = v;
        if (key === "phone") phone = v;
      }
    } else {
      return new Response(JSON.stringify({ ok: false, error: "Unsupported Content-Type" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    // validate basics
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
    // if caller chose Call, phone is required
    if (followUp === "Call" && !phone.trim()) {
      return new Response(JSON.stringify({ ok: false, error: "Phone is required when 'Call' is selected." }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    // sanitize
    const sName = escapeHtml(name);
    const sEmail = escapeHtml(email);
    const sPhone = escapeHtml(phone);
    const sBusiness = escapeHtml(business);
    const sWebsite = escapeHtml(website);
    const sTools = escapeHtml(tools);
    const sBudget = escapeHtml(budget);
    const sFollowUp = escapeHtml(followUp);
    const sMessage = escapeHtml(message);

    // exactly the layout you asked for
    const subject = "New AI Setup Intake";

    const text =
`New AI Setup Intake

Name: ${name}
Email: ${email}
Phone: ${phone || ""}
Business: ${business}
Website: ${website}
Tools: ${tools}
Budget: ${budget}
Preferred follow-up: ${followUp}

Message:
${message}
`;

    const html =
`<div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; white-space: pre-wrap;">
  <h2>New AI Setup Intake</h2>
  <p><strong>Name:</strong> ${sName}</p>
  <p><strong>Email:</strong> ${sEmail}</p>
  <p><strong>Phone:</strong> ${sPhone}</p>
  <p><strong>Business:</strong> ${sBusiness}</p>
  <p><strong>Website:</strong> ${sWebsite}</p>
  <p><strong>Tools:</strong> ${sTools}</p>
  <p><strong>Budget:</strong> ${sBudget}</p>
  <p><strong>Preferred follow-up:</strong> ${sFollowUp}</p>
  <p><strong>Message:</strong></p>
  <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${sMessage}</pre>
</div>`;

    // 1) Send to you
    const adminSend = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email, // correct typing for current Resend SDK
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

    // 2) Auto-reply to the sender (kept as-is)
    const autoReplySubject = "Thanks! We’ve got your info — QuickSetupAI";
    const autoReplyHtml =
`<div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
  <h2>Thanks, ${sName}!</h2>
  <p>We’ve received your message and will review your business and send a free AI Blueprint within 24 hours.</p>
  <p>Want to talk sooner? You can book a call here:</p>
  <p><a href="https://calendly.com/morgan-harris92/30min">Book a quick setup call</a></p>
  <hr />
  <p style="color:#64748b;font-size:12px;">Sent by QuickSetupAI · quicksetupai.com</p>
</div>`;

    const autoReplyText =
`Thanks, ${name}!

We’ve received your message and will review your business and send a free AI Blueprint within 24 hours.

Book a quick setup call: https://calendly.com/morgan-harris92/30min
`;

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