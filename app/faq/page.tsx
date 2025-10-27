export const metadata = { title: "FAQ — QuickSetupAI" };

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 prose prose-slate">
      <h1>Frequently Asked Questions</h1>

      <h2>How fast is setup?</h2>
      <p>Most projects ship within ~5 business days after the intake call.</p>

      <h2>What do you actually build?</h2>
      <p>
        Custom GPTs trained on your docs/tone, workflow automations (email triage, summaries,
        proposals, follow-ups), and ongoing prompt tuning.
      </p>

      <h2>What does maintenance include?</h2>
      <p>Prompt tuning, minor feature tweaks, and proactive improvements as models change.</p>

      <h2>Do I own the deliverables?</h2>
      <p>Yes—everything built specifically for your business is yours after payment.</p>

      <h2>How do we start?</h2>
      <p>
        Fill the intake at the bottom of the homepage or{" "}
        <a href="#contact">book a call</a>.
      </p>
    </main>
  );
}