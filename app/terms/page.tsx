// app/terms/page.tsx
import Section from "@/components/Section";

export const metadata = {
  title: "Terms of Service — QuickSetupAI",
  description: "The terms that govern use of QuickSetupAI’s website and services.",
};

export default function TermsPage() {
  return (
    <main>
      <Section title="Terms of Service" subtitle="Updated: October 27, 2025">
        <div className="prose prose-slate max-w-none">
          <p>
            These Terms of Service (“Terms”) govern your access to and use of the website quicksetupai.com
            (the “Site”) and any services we provide (“Services”). By using the Site or Services, you agree
            to these Terms.
          </p>

          <h3>1. Who we are</h3>
          <p>
            QuickSetupAI (“we,” “us,” “our”) provides AI configuration, automation, and related advisory
            services to businesses.
          </p>

          <h3>2. Use of the Site</h3>
          <p>
            You agree not to misuse the Site, attempt unauthorized access, or interfere with its operation.
            We may modify or discontinue the Site at any time.
          </p>

          <h3>3. Proposals, scope & payment</h3>
          <p>
            Any Services are governed by a mutually agreed scope (e.g., email, proposal, or order form).
            Fees, timelines, and deliverables are specified therein. Unless stated otherwise, invoices are
            due upon receipt.
          </p>

          <h3>4. Client content & licenses</h3>
          <p>
            You grant us a limited license to use your materials (e.g., brand assets, documentation) solely
            to perform the Services. You represent you have rights to provide such materials.
          </p>

          <h3>5. Confidentiality</h3>
          <p>
            Each party will keep the other’s non-public information confidential and use it only to perform
            or receive the Services.
          </p>

          <h3>6. Intellectual property</h3>
          <p>
            Unless otherwise agreed in writing, you own the bespoke deliverables we create for you upon full
            payment. We retain ownership of our pre-existing know-how, libraries, and templates used to
            deliver the work, granting you a perpetual, non-exclusive license to use them within the
            deliverables.
          </p>

          <h3>7. Third-party tools</h3>
          <p>
            Our work may integrate third-party platforms (e.g., OpenAI, Google, Calendly, Resend). Your use
            of those tools is governed by their terms and fees. We are not responsible for third-party
            outages, policy changes, or costs.
          </p>

          <h3>8. Disclaimers</h3>
          <p>
            The Site and Services are provided “as is.” We disclaim all warranties to the fullest extent
            permitted by law, including fitness for a particular purpose and non-infringement. AI systems can
            produce errors; you remain responsible for human review and compliance.
          </p>

          <h3>9. Limitation of liability</h3>
          <p>
            To the maximum extent permitted by law, our total liability arising out of or related to the
            Services or these Terms shall not exceed the amounts you paid to us in the three (3) months
            preceding the event giving rise to the claim. We are not liable for indirect, incidental, special,
            consequential, or punitive damages.
          </p>

          <h3>10. Termination</h3>
          <p>
            Either party may terminate work for convenience where allowed by the applicable scope, or for
            cause if the other party materially breaches and fails to cure within 10 days after notice.
          </p>

          <h3>11. Governing law</h3>
          <p>
            These Terms are governed by the laws of the State of {`[your state]`} (without regard to conflict
            of law principles). Venue lies in the courts located in {`[your county/state]`}.
          </p>

          <h3>12. Changes</h3>
          <p>
            We may update these Terms by posting a revised version on the Site. Continued use after changes
            becomes effective constitutes acceptance.
          </p>

          <h3>Contact</h3>
          <p>
            Questions? Email <a href="mailto:contactquicksetupai@gmail.com">contactquicksetupai@gmail.com</a>.
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
