// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge"; // required for Cloudflare/Next.js edge compatibility

const resend = new Resend(process.env.RESEND_API_KEY);

// your destination email
const TO = "contactquicksetupai@gmail.com";
const FROM = "QuickSetupAI <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const subject = `New Contact Form Submission from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`;
    const html = `
      <div style="font-family: sans-serif; padding: 16px;">
        <h2>New Contact Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br>${message}</p>
      </div>
    `;

    const data = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email, // ✅ fixed property
      subject,
      html,
      text,
    });

    console.log("Resend API response:", data);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || "/"}?sent=1`, 303);
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}