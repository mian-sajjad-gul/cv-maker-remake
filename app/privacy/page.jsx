import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export const metadata = {
  title: "Privacy Policy | CVPair",
  description:
    "Read the CVPair Privacy Policy to understand how we collect, use, and protect your personal information.",
};

const LAST_UPDATED = "17 June 2026";

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <Header />

      <section className="bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-white/50">
            Legal
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="prose prose-slate mx-auto max-w-4xl">

          <h2>1. Introduction</h2>
          <p>
            Welcome to CVPair ("we", "our", or "us"). We operate the website
            cvpair.com (the "Service"). This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our Service. Please read this policy carefully. If you disagree with
            its terms, please discontinue use of the site.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>Information you provide directly</h3>
          <p>
            CVPair stores your CV data (name, work history, education, skills,
            and other resume content) locally in your browser's localStorage. We
            do not transmit this data to our servers unless you explicitly use
            the share or export features.
          </p>
          <h3>Automatically collected information</h3>
          <p>
            When you visit our site, we may automatically collect certain
            information including your IP address, browser type, operating
            system, referring URLs, and pages viewed. This data is used for
            analytics and improving the Service.
          </p>
          <h3>Cookies and tracking technologies</h3>
          <p>
            We use cookies and similar tracking technologies to improve your
            experience. See our <a href="/cookie-policy">Cookie Policy</a> for
            full details.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain the Service</li>
            <li>Improve and personalise your experience</li>
            <li>Analyse usage patterns to enhance features</li>
            <li>Display relevant advertisements via Google AdSense</li>
            <li>Respond to your comments and support requests</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Google AdSense</h2>
          <p>
            We use Google AdSense to display advertisements. Google may use
            cookies to serve ads based on your prior visits to our website or
            other websites. You may opt out of personalised advertising by
            visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            .
          </p>

          <h2>5. Data Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share data with trusted service providers who assist
            us in operating the website, provided those parties agree to keep
            this information confidential.
          </p>
          <p>
            We may also disclose your information if required by law or to
            protect our rights, property, or safety.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            CV data entered into CVPair is stored in your browser's localStorage
            and remains on your device until you clear it. We do not retain
            personal CV data on our servers beyond what is necessary to provide
            the share feature.
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:privacy@cvpair.com">privacy@cvpair.com</a>.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            CVPair is not directed to children under 13. We do not knowingly
            collect personal information from children under 13. If you believe
            we have collected such information, please contact us immediately.
          </p>

          <h2>9. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those sites. We
            encourage you to review the privacy policy of every site you visit.
          </p>

          <h2>10. Security</h2>
          <p>
            We implement reasonable administrative, technical, and physical
            security measures to protect your information. However, no method of
            transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of changes by updating the "Last updated" date at the top of
            this page. Continued use of the Service after changes constitutes
            your acceptance of the updated policy.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at:
          </p>
          <p>
            <strong>CVPair</strong>
            <br />
            Email: <a href="mailto:privacy@cvpair.com">privacy@cvpair.com</a>
            <br />
            Website: <a href="https://cvpair.com">cvpair.com</a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
