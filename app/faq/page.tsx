// app/faq/page.tsx
import Section from "@/components/Section";

export const metadata = {
  title: "FAQ — QuickSetupAI",
  description: "Answers to common questions about QuickSetupAI services.",
};

const Q = ({ q, a }: { q: string; a: React.ReactNode }) => (
  <div className="rounded-2xl bg-white p-6 border border-slate-200">
    <h4 className="font-semibold">{q}</h4>
    <div className="text-sm mt-2 text-slate-700">{a}</div>
  </div>
);

export default function FAQPage() {
  return (
    <main>
      <Section title="Frequently Asked Questions" subtitle="Quick answers before we get to work">
        <div className="grid md:grid-cols-2 gap-6">
          <Q
            q="What exactly do you build?"
            a="Custom GPTs trained on your docs & tone, workflow automations (email triage, lead intake, summaries), and clean hand-offs with docs so your team can run it."
          />
          <Q
            q="How fast can we go live?"
            a="Most setups go live within 5 business days after the kickoff call."
          />
          <Q
            q="Do you handle maintenance?"
            a="Yes. We offer a low-cost monthly plan for prompt tuning, small tweaks, and proactive improvements."
          />
          <Q
            q="Do I need my own AI accounts?"
            a="If you already have them, great. If not, we’ll help you set up the right providers (OpenAI, Resend, Calendly, etc.)."
          />
          <Q
            q="How do we start?"
            a={
              <>
                Fill the contact form on the{" "}
                <a className="text-violet hover:underline" href="/#contact">
                  homepage
                </a>{" "}
                (free AI Blueprint within 24 hours) or book a call via Calendly.
              </>
            }
          />
          <Q
            q="What will it cost?"
            a="Transparent pricing is listed on the homepage. Most clients start with the Setup Package and add Monthly Maintenance."
          />
        </div>
      </Section>
    </main>
  );
}
