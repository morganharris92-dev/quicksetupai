// app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <a href="/" className="text-sm text-slate-500 hover:text-violet">&larr; Back to home</a>

      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-violet">Privacy Policy</h1>
      <p className="mt-1 text-sm text-slate-500">Last updated: October 27, 2025</p>

      <section className="mt-8 space-y-8">
        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">What we collect</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
            <li>Contact details (name, email, phone if provided)</li>
            <li>Business info you submit in forms</li>
            <li>Basic analytics (pages visited, device, referrer)</li>
          </ul>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">How we use it</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
            <li>To reply to inquiries and deliver services you request</li>
            <li>To improve our website and offerings</li>
            <li>Transactional emails via Resend; scheduling via Calendly</li>
          </ul>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">Sharing</h2>
          <p className="mt-2 text-slate-700">
            We don’t sell personal data. We share with service providers (e.g., email, analytics, scheduling) only as
            needed to operate the site.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">Data retention &amp; security</h2>
          <p className="mt-2 text-slate-700">
            We retain inquiry data for service and recordkeeping and remove it when no longer needed. We use
            reasonable safeguards but no system is 100% secure.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">Your choices</h2>
          <p className="mt-2 text-slate-700">
            You can request access or deletion of your data by emailing{" "}
            <a className="text-violet underline-offset-2 hover:underline" href="mailto:contactquicksetupai@gmail.com">
              contactquicksetupai@gmail.com
            </a>.
          </p>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="font-semibold text-midnight">Contact</h2>
          <p className="mt-2 text-slate-700">
            QuickSetupAI •{" "}
            <a className="text-violet underline-offset-2 hover:underline" href="mailto:contactquicksetupai@gmail.com">
              contactquicksetupai@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}