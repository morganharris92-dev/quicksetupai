// app/api/contact/route.ts
import { NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

// Where YOU receive messages:
const TO = "contactquicksetupai@gmail.com";

// Visible From line (domain must be verified in Resend DNS)
const FROM = "QuickSetupAI <no-reply@quicksetupai.com>";

const resend = new Resend(process.env.RESEND_API_KEY);

// basic HTML escape
function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get("content-type") || "";
    let name = "";
    let email = "";
    let message = "";

    // new intake fields (optional)
    let business = "";
    let website = "";
    let tools = "";
    let budget = "";
    let followUp = "";

    if (ct.includes("application/json")) {
      const body = await req.json();
      name = (body.name || "").toString();
      email = (body.email || "").toString();
      message = (body.message || "").toString();

      business = (body.business || "").toString();
      website = (body.website || "").toString();
      tools = (body.tools || "").toString();
      budget = (body.budget || "").toString();
      followUp = (body.followUp || "").toString();
    } else if (ct.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      name = (form.get("name") || "").toString();
      email = (form.get("email") || "").toString();
      message = (form.get("message") || "").toString();

      business = (form.get("business") || "").toString();
      website = (form.get("website") || "").toString();
      tools = (form.get("tools") || "").toString();
      budget = (form.get("budget") || "").toString();
      followUp = (form.get("followUp") || "").toString();
    } else if (ct.includes("text/plain")) {
      const text = await req.text();
      for (const line of text.split("\n")) {
        const [k, ...rest] = line.split(":");
        const v = rest.join(":").trim();
        const key = (k || "").toLowerCase();
        if (key === "name") name = v;
        if (key === "email") email = v;
        if (key === "message") message = v;
        if (key === "business") business = v;
        if (key === "website") website = v;
        if (key === "tools") tools = v;
        if (key === "budget") budget = v;
        if (key === "followup") followUp = v;
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

    const subject = `New AI Setup Intake — ${name}`;

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
        <h2>New AI Setup Intake</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        ${business ? `<p><strong>Business:</strong> ${esc(business)}</p>` : ""}
        ${website ? `<p><strong>Website:</strong> ${esc(website)}</p>` : ""}
        ${tools ? `<p><strong>Tools:</strong> ${esc(tools)}</p>` : ""}
        ${budget ? `<p><strong>Budget:</strong> ${esc(budget)}</p>` : ""}
        ${followUp ? `<p><strong>Preferred follow-up:</strong> ${esc(followUp)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;">${esc(
          message
        )}</pre>
      </div>
    `;

    const text =
`New AI Setup Intake

Name: ${name}
Email: ${email}
${business ? `Business: ${business}\n` : ""}${website ? `Website: ${website}\n` : ""}${tools ? `Tools: ${tools}\n` : ""}${budget ? `Budget: ${budget}\n` : ""}${followUp ? `Preferred follow-up: ${followUp}\n` : ""}
Message:
${message}
`;

    // Keep the same field name that your current working setup expects.
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      reply_to: email, // keep as-is for your working Resend version
      subject,
      html,
      text,
    } as any);

    if (error) {
      return new Response(JSON.stringify({ ok: false, error: String(error) }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
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