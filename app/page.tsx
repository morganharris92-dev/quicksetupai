// app/page.tsx
import CTAButton from "@/components/CTAButton";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <div className="gradient-hero border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <p className="text-teal font-semibold mb-4">QuickSetupAI.com</p>
          <h1 className="text-3xl md:text-6xl font-extrabold text-midnight leading-tight max-w-4xl">
            Custom AI Systems for Small Businesses — Built Fast, Priced Low, Maintained Long-Term
          </h1>
          <p className="mt-6 text-slate-700 max-w-2xl">
            Stop wasting time on prompts and plugins. We’ll set up your entire AI system—tailored to your business—in days, not months.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="#contact">Book a Free AI Setup Call</CTAButton>
            <CTAButton href="#pricing" variant="secondary">See Pricing</CTAButton>
          </div>
        </div>
      </div>

      {/* WHAT WE DO (SERVICES) */}
      <Section
        id="services"
        title="We Build AI Systems That Actually Make You Money"
        subtitle="Custom GPTs, workflow automations, and long-term maintenance so you never have to touch the tech."
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white p-6 border border-slate-200">
            <h3 className="font-semibold text-lg">Custom GPT Development</h3>
            <p className="mt-2 text-sm text-slate-700">
              Branded GPTs trained on your FAQs, tone, and SOPs to triage emails, leads, and support.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 border border-slate-200">
            <h3 className="font-semibold text-lg">Workflow Automation</h3>
            <p className="mt-2 text-sm text-slate-700">
              AI flows that summarize calls, draft proposals, schedule follow-ups, and sync with your tools.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 border border-slate-200">
            <h3 className="font-semibold text-lg">AI Maintenance & Updates</h3>
            <p className="mt-2 text-sm text-slate-700">
              Monthly tune-ups so your stack stays fast, accurate, and compatible with new model updates.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <CTAButton href="#process">How Our Process Works</CTAButton>
        </div>
      </Section>

      {/* VALUE */}
      <Section title="Fast. Affordable. Ongoing." subtitle="Other agencies disappear after setup. We stay and keep improving.">
        <div className="grid md:grid-cols-3 gap-6">
          <CardStat title="Speed" value="Live in 5 business days" />
          <CardStat title="Low Cost" value="Setup from $499" />
          <CardStat title="Long-Term Support" value="Proactive monthly improvements" />
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" title="Audit → Blueprint → Build → Maintain">
        <ol className="grid md:grid-cols-4 gap-6 list-decimal list-inside">
          <li className="rounded-2xl bg-white p-6 border border-slate-200">
            <h4 className="font-semibold">Audit</h4>
            <p className="text-sm mt-2 text-slate-700">We map goals, workflows, tools, and bottlenecks.</p>
          </li>
          <li className="rounded-2xl bg-white p-6 border border-slate-200">
            <h4 className="font-semibold">Blueprint</h4>
            <p className="text-sm mt-2 text-slate-700">Clear plan: GPTs, automations, success metrics.</p>
          </li>
          <li className="rounded-2xl bg-white p-6 border border-slate-200">
            <h4 className="font-semibold">Build</h4>
            <p className="text-sm mt-2 text-slate-700">We set up GPTs, routes, prompts, and integrations.</p>
          </li>
          <li className="rounded-2xl bg-white p-6 border border-slate-200">
            <h4 className="font-semibold">Maintain</h4>
            <p className="text-sm mt-2 text-slate-700">Ongoing optimization, new use-cases, faster results.</p>
          </li>
        </ol>
        <div className="mt-8">
          <CTAButton href="#contact">Book Your Free Audit Call</CTAButton>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing" title="Simple, Transparent Pricing">
        <div className="grid md:grid-cols-3 gap-6">
          <PriceCard name="Setup Package" price="$499 one-time" features={["Custom GPT","1–2 key automations","Documentation & onboarding"]} />
          <PriceCard name="Monthly Maintenance" price="$79 / month" features={["Prompt tuning","Minor feature tweaks","Priority support"]} />
          <PriceCard highlight name="Growth Plan" price="$699 setup + $99 / month" features={["Everything in Setup","Maintenance included","Quarterly roadmap"]} />
        </div>
        <div className="mt-8 flex gap-4">
          <CTAButton href="#contact">Get Started</CTAButton>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section title="Real Results from Real Businesses">
        <div className="grid md:grid-cols-3 gap-6">
          <Quote text="Automated 70% of our intake—saved ~15 hours/week." author="Megan L., Agency Owner" />
          <Quote text="Customer email triage now runs itself. Huge time saver." author="Tom R., HVAC" />
          <Quote text="Fast build, clean docs, ongoing tweaks. Worth it." author="Sara D., E-commerce" />
        </div>
      </Section>

      {/* ABOUT */}
      <Section
        title="Your AI Partner for the Long Run"
        subtitle="We make AI practical. We build systems that ship quickly, pay for themselves, and keep getting better."
      >
        <p className="text-slate-700 max-w-3xl">
          Clear communication, clean hand-offs, and measurable results—without the jargon. Everything we create is designed to work, not just look smart.
        </p>
      </Section>

      {/* CTA / CONTACT */}
      <Section id="contact" title="Your AI Setup Starts Here" subtitle="Book a free call and see how fast AI can start working for you.">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* CALENDLY EMBED (iframe version: reliable, no external script needed) */}
          <div className="rounded-2xl bg-white p-6 border border-slate-200">
            <div className="w-full rounded-xl overflow-hidden border border-slate-200">
              <iframe
                title="Book a call — Calendly"
                src="https://calendly.com/morgan-harris92/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                className="w-full"
                style={{ minWidth: 320, height: 700 }}
                loading="lazy"
                allow="clipboard-write; fullscreen"
              />
            </div>
            <p className="mt-3 text-sm text-slate-600">Prefer email? contactquicksetupai@gmail.com</p>
          </div>

          {/* CONTACT FORM */}
          <div className="rounded-2xl bg-white p-6 border border-slate-200">
            <h3 className="font-semibold text-lg">Quick Contact</h3>
            <p className="text-sm text-slate-700">Tell us your goal and we’ll reply with a quick plan.</p>
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* FOOTER (now uses the shared component with links/icons) */}
      <SiteFooter />
    </main>
  );
}

function CardStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 border border-slate-200">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-xl font-semibold text-midnight">{value}</p>
    </div>
  );
}

function PriceCard({
  name,
  price,
  features,
  highlight,
}: {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-6 border ${highlight ? "border-violet" : "border-slate-200"} bg-white relative`}>
      {highlight && (
        <span className="absolute -top-3 right-6 bg-violet text-white text-xs px-2 py-1 rounded-md">Popular</span>
      )}
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="mt-1 text-2xl font-extrabold text-midnight">{price}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {features.map((f, i) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>
      <div className="mt-6">
        <CTAButton href="#contact">Choose Plan</CTAButton>
      </div>
    </div>
  );
}

function Quote({ text, author }: { text: string; author: string }) {
  return (
    <blockquote className="rounded-2xl bg-white p-6 border border-slate-200 text-slate-800">
      <p>“{text}”</p>
      <footer className="mt-3 text-sm text-slate-500">— {author}</footer>
    </blockquote>
  );
}