"use client";

import { useState, useEffect } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [pref, setPref] = useState<"Email" | "Call">("Email");
  const [phone, setPhone] = useState("");

  // If user switches away from "Call", clear phone to avoid stale submission
  useEffect(() => {
    if (pref !== "Call" && phone !== "") {
      setPhone("");
    }
  }, [pref]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Ensure our current dropdown/phone state is what gets sent
    data.set("followup", pref);
    if (pref === "Call") {
      data.set("phone", phone.trim());
    } else {
      data.delete("phone");
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
      form.reset();
      setPref("Email");
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  return (
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

      {/* Preferred follow-up */}
      <div className="grid gap-2">
        <label className="text-sm text-slate-600">Preferred follow-up (optional)</label>
        <select
          className="rounded-lg border border-slate-300 px-3 py-2"
          value={pref}
          onChange={(e) => setPref(e.target.value as "Email" | "Call")}
          name="followup"
        >
          <option>Email</option>
          <option>Call</option>
        </select>
      </div>

      {/* Conditionally show Phone when Call is selected */}
      {pref === "Call" && (
        <input
          type="tel"
          inputMode="tel"
          pattern="^[0-9+()\\-\\s]{7,}$"
          title="Please enter a valid phone number"
          className="rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Phone number"
          name="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      )}

      <textarea
        className="rounded-lg border border-slate-300 px-3 py-2"
        placeholder="What do you want to automate?"
        name="message"
        rows={4}
        required
      />

      <button
        className="rounded-xl bg-violet text-white px-5 py-3 font-semibold hover:opacity-90 disabled:opacity-60"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          Message sent! We typically respond within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          Failed to send message. Please try again in a moment.
        </p>
      )}

      {/* Keep your original note (only once) */}
      <p className="text-xs text-slate-500">We’ll never share your info. Replies usually within 1 business day.</p>
    </form>
  );
}