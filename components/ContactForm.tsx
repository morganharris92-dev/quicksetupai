"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");

  // form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [website, setWebsite] = useState("");
  const [tools, setTools] = useState("");
  const [budget, setBudget] = useState("");
  const [followUp, setFollowUp] = useState<"Email" | "Call" | "">("");
  const [phone, setPhone] = useState(""); // NEW
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    // Client-side guard: if Call is chosen, phone is required
    if (followUp === "Call" && !phone.trim()) {
      setStatus("error");
      setError("Please enter your phone number for a call.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          business,
          website,
          tools,
          budget,
          followUp,
          phone: followUp === "Call" ? phone.trim() : "", // only send when needed
          message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.ok !== true) {
        throw new Error(data?.error || "Failed to send message");
      }

      setStatus("ok");
      // clear the form
      setName("");
      setEmail("");
      setBusiness("");
      setWebsite("");
      setTools("");
      setBudget("");
      setFollowUp("");
      setPhone(""); // clear phone too
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Failed to send message");
    }
  }

  const inputCls =
    "rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet/20 focus:border-violet";

  return (
    <form className="mt-4 grid gap-3" onSubmit={onSubmit} noValidate>
      {/* Name / Email (required) */}
      <input
        required
        className={inputCls}
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />
      <input
        required
        type="email"
        className={inputCls}
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />

      {/* Existing intake fields */}
      <input
        className={inputCls}
        placeholder="Business name (optional)"
        name="business"
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        autoComplete="organization"
      />
      <input
        className={inputCls}
        placeholder="Website (optional)"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        autoComplete="url"
      />
      <input
        className={inputCls}
        placeholder="What tools do you use? (e.g., Google Workspace, Calendly, CRM)"
        name="tools"
        value={tools}
        onChange={(e) => setTools(e.target.value)}
      />

      {/* Budget + Follow-up preference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select
          className={inputCls}
          name="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          <option value="">Budget range (optional)</option>
          <option value="$0–$500">$0–$500</option>
          <option value="$500–$1,000">$500–$1,000</option>
          <option value="$1,000–$2,500">$1,000–$2,500</option>
          <option value="$2,500+">$2,500+</option>
        </select>

        <select
          className={inputCls}
          name="followUp"
          value={followUp}
          onChange={(e) => {
            const val = e.target.value as "Email" | "Call" | "";
            setFollowUp(val);
            if (val !== "Call") setPhone(""); // hide/clear phone when switching away
          }}
        >
          <option value="">Preferred follow-up (optional)</option>
          <option value="Email">Email</option>
          <option value="Call">Call</option>
        </select>
      </div>

      {/* Phone appears only when "Call" is chosen */}
      {followUp === "Call" && (
        <input
          type="tel"
          inputMode="tel"
          pattern="^[0-9+()\\-\\s]{7,}$"
          title="Please enter a valid phone number"
          className={inputCls}
          placeholder="Phone number"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      )}

      {/* Message (required) */}
      <textarea
        required
        className={inputCls}
        placeholder="What do you want to automate?"
        name="message"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="rounded-xl bg-violet text-white px-5 py-3 font-semibold hover:opacity-90 disabled:opacity-60"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      {status === "ok" && (
        <div className="flex items-center gap-2 text-sm p-3 rounded-lg bg-green-100 border border-green-300 text-green-800">
          <span aria-hidden>✅</span>
          <span>Message sent! We typically respond within 24 hours.</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm p-3 rounded-lg bg-red-100 border border-red-300 text-red-800">
          <span aria-hidden>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <p className="text-xs text-slate-500">
        We’ll never share your info. Replies usually within 1 business day.
      </p>
    </form>
  );
}