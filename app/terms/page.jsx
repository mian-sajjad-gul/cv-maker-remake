import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export const metadata = {
  title: "Terms & Conditions | CVPair",
  description:
    "Read the CVPair Terms & Conditions governing your use of our CV builder service.",
};

const LAST_UPDATED = "17 June 2026";

export default function TermsPage() {
  return (
    <main className="bg-white">
      <Header />

      <section className="bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-white/50">
            Legal
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="prose prose-slate mx-auto max-w-4xl">

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using CVPair at cvpair.com ("the Service"), you
            agree to be bound by these Terms &amp; Conditions ("Terms"). If you
            do not agree with any part of these Terms, you must not use the
            Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            CVPair provides a free online CV and resume builder that allows
            users to create, edit, preview, and export professional CV
            documents. Features include multiple templates, cover letter
            editing, ATS scoring, and PDF export.
          </p>

          <h2>3. Eligibility</h2>
          <p>
            You must be at least 13 years of age to use the Service. By using
            CVPair, you represent and warrant that you meet this requirement.
          </p>

          <h2>4. Use of the Service</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>
              Submit false, misleading, or fraudulent information in your CV
            </li>
            <li>
              Attempt to gain unauthorised access to any part of the Service
            </li>
            <li>
              Use automated tools to scrape, crawl, or extract data from the
              Service
            </li>
            <li>Interfere with or disrupt the Service or its servers</li>
            <li>
              Use the Service for any unlawful or harmful commercial purposes
            </li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            All content, templates, design elements, code, and other materials
            on CVPair are the property of CVPair or its licensors and are
            protected by applicable intellectual property laws. You may not
            reproduce, distribute, modify, or create derivative works without
            our prior written consent.
          </p>
          <p>
            The CV documents you create using the Service are your own. You
            retain full ownership of the content you enter.
          </p>

          <h2>6. User Content</h2>
          <p>
            You are solely responsible for the content you enter into CVPair.
            You warrant that your content does not infringe any third-party
            rights and complies with all applicable laws. CVPair does not store
            your CV data on its servers unless you use the share feature.
          </p>

          <h2>7. Advertisements</h2>
          <p>
            CVPair is supported by advertising, including Google AdSense. By
            using the Service, you acknowledge that advertisements may be
            displayed. We are not responsible for the content of third-party
            advertisements.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            The Service may contain links to third-party websites. CVPair has
            no control over these sites and accepts no responsibility for their
            content or practices. Access to third-party sites is at your own
            risk.
          </p>

          <h2>9. Disclaimers</h2>
          <p>
            The Service is provided on an "as is" and "as available" basis
            without warranties of any kind, either express or implied, including
            but not limited to warranties of merchantability, fitness for a
            particular purpose, or non-infringement.
          </p>
          <p>
            CVPair does not guarantee that the Service will be uninterrupted,
            error-free, or free of viruses. We do not warrant that using our
            templates will result in job offers or interviews.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, CVPair shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising from your use of, or inability to use, the Service.
            Our total liability to you shall not exceed £100 in any
            circumstances.
          </p>

          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless CVPair, its affiliates,
            and its team members from any claims, damages, losses, or expenses
            (including legal fees) arising from your use of the Service or
            violation of these Terms.
          </p>

          <h2>12. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes
            will be effective upon posting to the website. Continued use of the
            Service after changes constitutes your acceptance of the revised
            Terms.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of England and Wales. Any disputes arising under these
            Terms shall be subject to the exclusive jurisdiction of the courts
            of England and Wales.
          </p>

          <h2>14. Contact</h2>
          <p>
            For questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@cvpair.com">legal@cvpair.com</a>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
