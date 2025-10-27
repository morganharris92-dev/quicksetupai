"use client";

import { useState } from "react";

type Status = { type: "idle" | "sending" | "success" | "error"; message?: string };

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [followUp, setFollowUp] = useState<"Email" | "Call">("Email");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setFollowUp("Email");
    setPhone("");
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // If Call is selected, phone is required
    if (followUp === "Call" && !phone.trim()) {
      setStatus({ type: "error", message: "Please add a phone number for a call-back." });
      return;
    }

    setStatus({ type: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          followUp,
          phone: followUp === "Call" ? phone : "", // don’t send stale value
          source: "contact-form", // helpful for your inbox later
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send");

      setStatus({ type: "success", message: "✅ Message sent! We typically respond within 24 hours." });
      reset();
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.message || "Failed to send message. Please try again.",
      });
    }
  }

  // When switching away from Call, wipe the phone to avoid stale values
  function onFollowUpChange(v: "Email" | "Call") {
    setFollowUp(v);
    if (v !== "Call") setPhone("");
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3">
      <input
        required
        className="rounded-lg border border-slate-300 px-3 py-2"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        required
        type="email"
        className="rounded-lg border border-slate-300 px-3 py-2"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Preferred follow-up (already on your form) */}
      <div className="grid gap-2">
        <label className="text-xs text-slate-500">Preferred follow-up (optional)</label>
        <select
          className="rounded-lg border border-slate-300 px-3 py-2"
          name="followUp"
          value={followUp}
          onChange={(e) => onFollowUpChange(e.target.value as "Email" | "Call")}
        >
          <option>Email</option>
          <option>Call</option>
        </select>
      </div>

      {/* Phone appears only when “Call” is selected. It becomes required in that case. */}
      {followUp === "Call" && (
        <input
          className="rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Phone"
          name="phone"
          inputMode="tel"
          pattern="^[0-9+()\-\s]{7,}$"
          title="Please enter a valid phone number"
          value={phone}
          required={followUp === "Call"}
          onChange={(e) => setPhone(e.target.value)}
        />
      )}

      <textarea
        className="rounded-lg border border-slate-300 px-3 py-2"
        placeholder="What do you want to automate?"
        name="message"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="rounded-xl bg-violet text-white px-5 py-3 font-semibold hover:opacity-90 disabled:opacity-60"
        type="submit"
        disabled={status.type === "sending"}
      >
        {status.type === "sending" ? "Sending..." : "Send"}
      </button>

      {status.type === "success" && (
        <p className="mt-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {status.message}
        </p>
      )}
      {status.type === "error" && (
        <p className="mt-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {status.message}
        </p>
      )}

      <p className="text-xs text-slate-500 mt-1">
        We’ll never share your info. Replies usually within 1 business day.
      </p>
    </form>
  );
}