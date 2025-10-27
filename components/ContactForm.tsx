// components/ContactForm.tsx
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // <-- prevents navigation to /api/contact
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message.");
      }
      form.reset();
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      {/* The fields look exactly like your current form */}
      <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
        <input
          required
          className="rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Name"
          name="name"
        />
        <input
          required
          type="email"
          className="rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Email"
          name="email"
        />
        <textarea
          className="rounded-lg border border-slate-300 px-3 py-2"
          placeholder="What do you want to automate?"
          name="message"
          rows={4}
        />
        <button
          className="rounded-xl bg-violet text-white px-5 py-3 font-semibold hover:opacity-90 disabled:opacity-60"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
      </form>

      {/* Inline confirmation message — no layout change */}
      <div className="mt-3" aria-live="polite" aria-atomic="true">
        {status === "success" && (
          <p className="text-sm rounded-md bg-green-50 border border-green-200 text-green-700 px-3 py-2">
            ✅ Message sent! We typically respond within 24 hours.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm rounded-md bg-red-50 border border-red-200 text-red-700 px-3 py-2">
            ❌ {error}
          </p>
        )}
      </div>

      <p className="text-xs text-slate-500 mt-3">
        We’ll never share your info. Replies usually within 1 business day.
      </p>
    </div>
  );
}