// app/terms/page.tsx
export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <a href="/" className="text-sm text-slate-500 hover:text-violet">&larr; Back to home</a>

      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-violet">Terms of Service</h1>
      <p className="mt-1 text-sm text-slate-500">Last updated: October 27, 2025</p>

      <section className="mt-8 space-y-8">
        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">1. Overview</h2>
          <p className="mt-2 text-slate-700">
            QuickSetupAI (“we”, “us”) provides AI consulting and automation services. By using our website or
            services you agree to these Terms.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">2. Use of Services</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
            <li>You must have rights to any data you provide for training or automation.</li>
            <li>Do not use our services for illegal or harmful purposes.</li>
          </ul>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">3. Payments &amp; Refunds</h2>
          <p className="mt-2 text-slate-700">
            Setup fees and subscriptions are billed as quoted. Except where required by law, fees are
            non-refundable once work begins.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">4. Deliverables &amp; IP</h2>
          <p className="mt-2 text-slate-700">
            Upon full payment, you own business-specific prompts, blueprints, and automations we build for you.
            We retain rights to our underlying methods/templates.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">5. Disclaimers</h2>
          <p className="mt-2 text-slate-700">
            AI outputs can be imperfect. You’re responsible for reviewing results before use in your business.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">6. Limitation of Liability</h2>
          <p className="mt-2 text-slate-700">
            To the fullest extent permitted by law, our liability is limited to fees paid in the 3 months prior to a claim.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">7. Contact</h2>
          <p className="mt-2 text-slate-700">
            Questions? <a className="text-violet underline-offset-2 hover:underline" href="mailto:contactquicksetupai@gmail.com">
              contactquicksetupai@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}