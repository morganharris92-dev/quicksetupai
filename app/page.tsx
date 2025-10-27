// app/page.tsx
import Section from "@/components/Section";

export default function Page() {
  return (
    <>
      {/* --- SERVICES --- */}
      <Section
        id="services"
        title="Our Services"
        subtitle="We help you audit, design, build, and maintain smart AI systems that save time and drive results."
      >
        <ul className="list-disc ml-6 space-y-2 text-slate-700">
          <li><strong>Audit:</strong> We map goals, workflows, tools, and bottlenecks.</li>
          <li><strong>Blueprint:</strong> We create a clear plan for GPTs, automations, and success metrics.</li>
          <li><strong>Build:</strong> We set up GPTs, routes, prompts, and integrations.</li>
          <li><strong>Maintain:</strong> We provide ongoing optimization, new use-cases, and faster results.</li>
        </ul>
      </Section>

      {/* --- PRICING --- */}
      <Section
        id="pricing"
        title="Pricing"
        subtitle="Start free and scale your automation as your business grows."
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-midnight mb-2">Starter</h3>
            <p className="text-slate-600 mb-3">Perfect for testing ideas.</p>
            <p className="font-bold text-2xl text-midnight mb-4">$0</p>
            <ul className="text-slate-600 space-y-1 text-sm">
              <li>✔ Limited GPT setup</li>
              <li>✔ Email support</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-violet p-6 shadow-md bg-violet/5 hover:bg-violet/10 transition">
            <h3 className="text-xl font-semibold text-violet mb-2">Pro</h3>
            <p className="text-slate-600 mb-3">For small teams automating daily work.</p>
            <p className="font-bold text-2xl text-violet mb-4">$49/mo</p>
            <ul className="text-slate-600 space-y-1 text-sm">
              <li>✔ 5 automations</li>
              <li>✔ Priority email support</li>
              <li>✔ Strategy session</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-midnight mb-2">Enterprise</h3>
            <p className="text-slate-600 mb-3">For full AI system integration.</p>
            <p className="font-bold text-2xl text-midnight mb-4">Custom</p>
            <ul className="text-slate-600 space-y-1 text-sm">
              <li>✔ Unlimited automations</li>
              <li>✔ Dedicated support</li>
              <li>✔ Custom AI agents</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* --- CONTACT --- */}
      <Section
        id="contact"
        title="Contact Us"
        subtitle="Let’s start your automation journey. Fill out the form below and we’ll reply soon."
      >
        <form
          className="mt-6 grid gap-4 max-w-lg"
          action="/api/contact"
          method="post"
        >
          <input
            required
            className="rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-violet focus:outline-none"
            placeholder="Your name"
            name="name"
          />
          <input
            required
            type="email"
            className="rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-violet focus:outline-none"
            placeholder="Your email"
            name="email"
          />
          <textarea
            required
            className="rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-violet focus:outline-none"
            placeholder="Your message"
            name="message"
            rows={5}
          />
          <button
            className="rounded-xl bg-violet text-white px-6 py-3 font-semibold hover:opacity-90 transition"
            type="submit"
          >
            Send Message
          </button>
        </form>

        <p className="mt-4 text-slate-600 text-sm">
          Prefer email? Reach us directly at{" "}
          <a
            href="mailto:contactquicksetupai@gmail.com"
            className="text-violet underline hover:no-underline"
          >
            contactquicksetupai@gmail.com
          </a>
        </p>
      </Section>
    </>
  );
}