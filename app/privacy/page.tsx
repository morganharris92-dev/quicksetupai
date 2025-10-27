// app/privacy/page.tsx
import Section from "@/components/Section";

export const metadata = {
  title: "Privacy Policy — QuickSetupAI",
  description: "How QuickSetupAI collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Section title="Privacy Policy" subtitle="Updated: October 27, 2025">
        <div className="prose prose-slate max-w-none">
          <p>
            This Privacy Policy explains how QuickSetupAI (“we,” “us”) collects, uses, and protects personal
            information when you visit quicksetupai.com (the “Site”) or use our Services.
          </p>

          <h3>Information we collect</h3>
          <ul>
            <li>
              <strong>Contact details</strong> you submit (e.g., name, email, phone) via forms.
            </li>
            <li>
              <strong>Business information</strong> you provide for scoping and delivery of Services.
            </li>
            <li>
              <strong>Technical data</strong> such as IP address, device/browser info, and analytics events.
            </li>
          </ul>

          <h3>How we use information</h3>
          <ul>
            <li>To respond to inquiries, provide proposals, and deliver Services.</li>
            <li>To operate, secure, and improve the Site and our offerings.</li>
            <li>To send service messages and occasional updates (you can opt out).</li>
          </ul>

          <h3>Sharing</h3>
          <p>
            We may share data with trusted processors that help us operate (e.g., hosting, email delivery,
            analytics, scheduling). We do not sell personal information.
          </p>

          <h3>Data retention</h3>
          <p>
            We retain information only as long as necessary for the purposes above or as required by law. You
            may request deletion at any time.
          </p>

          <h3>Security</h3>
          <p>
            We use reasonable technical and organizational measures to protect information. No method of
            transmission or storage is 100% secure.
          </p>

          <h3>Your choices</h3>
          <ul>
            <li>Request access, correction, or deletion of your data.</li>
            <li>Opt out of non-essential email communications.</li>
          </ul>

          <h3>International transfers</h3>
          <p>
            If you access the Site from outside the United States, your data may be processed in the U.S. and
            other countries with different data protection laws.
          </p>

          <h3>Children</h3>
          <p>Our Site and Services are not directed to children under 13.</p>

          <h3>Changes</h3>
          <p>We may update this Policy and will indicate the “Updated” date above.</p>

          <h3>Contact</h3>
          <p>
            Email <a href="mailto:contactquicksetupai@gmail.com">contactquicksetupai@gmail.com</a>.
          </p>

          <p className="text-xs text-slate-500">
            Template provided for convenience and general information — not legal advice. Consider legal
            review for your jurisdiction and use case.
          </p>
        </div>
      </Section>
    </main>
  );
}
