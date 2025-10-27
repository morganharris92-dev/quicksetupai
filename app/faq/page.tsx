// app/faq/page.tsx
import Link from "next/link";

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <a href="/" className="text-sm text-slate-500 hover:text-violet">&larr; Back to home</a>

      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-violet">
        Frequently Asked Questions
      </h1>

      <div className="mt-8 divide-y divide-slate-200 rounded-2xl bg-white border border-slate-200">
        <div className="p-6">
          <h2 className="font-semibold text-midnight">How fast is setup?</h2>
          <p className="mt-2 text-slate-700">Most projects ship within ~5 business days after the intake call.</p>
        </div>
        <div className="p-6">
          <h2 className="font-semibold text-midnight">What do you actually build?</h2>
          <p className="mt-2 text-slate-700">
            Custom GPTs trained on your docs/tone, workflow automations (email triage, summaries, proposals,
            follow-ups), and ongoing prompt tuning.
          </p>
        </div>
        <div className="p-6">
          <h2 className="font-semibold text-midnight">What does maintenance include?</h2>
          <p className="mt-2 text-slate-700">
            Prompt tuning, minor feature tweaks, and proactive improvements as models change.
          </p>
        </div>
        <div className="p-6">
          <h2 className="font-semibold text-midnight">Do I own the deliverables?</h2>
          <p className="mt-2 text-slate-700">Yes—everything built specifically for your business is yours after payment.</p>
        </div>
        <div className="p-6">
          <h2 className="font-semibold text-midnight">How do we start?</h2>
          <p className="mt-2 text-slate-700">
            Fill the intake at the bottom of the homepage or{" "}
            <Link href="/#contact" className="text-violet underline-offset-2 hover:underline">
              book a call
            </Link>.
          </p>
        </div>
      </div>
    </main>
  );
}