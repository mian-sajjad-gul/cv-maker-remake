import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export const metadata = {
  title: "Cookie Policy | CVPair",
  description:
    "Learn how CVPair uses cookies and similar technologies to improve your experience.",
};

const LAST_UPDATED = "17 June 2026";

export default function CookiePolicyPage() {
  return (
    <main className="bg-white">
      <Header />

      <section className="bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-white/50">
            Legal
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="prose prose-slate mx-auto max-w-4xl">

          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device (computer,
            tablet, or mobile) when you visit a website. They are widely used to
            make websites work more efficiently and to provide information to
            website owners. Cookies cannot run programs or deliver viruses to
            your computer.
          </p>

          <h2>2. How CVPair Uses Cookies</h2>
          <p>CVPair uses cookies and similar technologies for the following purposes:</p>

          <h3>Essential Cookies</h3>
          <p>
            These are required for the Service to function. They enable core
            features such as page navigation and access to secure areas. The
            Service cannot function properly without these cookies.
          </p>

          <h3>Analytics Cookies</h3>
          <p>
            We use analytics tools (such as Google Analytics) to understand how
            visitors interact with CVPair — which pages are visited, how long
            users stay, and where they come from. This helps us improve the
            Service. Analytics data is aggregated and anonymised.
          </p>

          <h3>Advertising Cookies</h3>
          <p>
            CVPair is supported by advertising through Google AdSense. Google
            uses cookies to show you relevant ads based on your browsing
            history. These cookies are set by Google, not CVPair. You can
            control ad personalisation via{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            .
          </p>

          <h3>Preference Cookies</h3>
          <p>
            These cookies remember your choices and settings (such as selected
            CV template) to provide a more personalised experience on return
            visits.
          </p>

          <h2>3. localStorage and sessionStorage</h2>
          <p>
            In addition to cookies, CVPair stores your CV data using your
            browser's <strong>localStorage</strong>. This is local to your
            device and is not transmitted to our servers. It allows your CV
            content to persist between sessions without requiring an account.
            You can clear this data at any time via your browser settings.
          </p>

          <h2>4. Third-Party Cookies</h2>
          <p>
            Third-party services used by CVPair may set their own cookies.
            These include:
          </p>
          <ul>
            <li>
              <strong>Google AdSense</strong> — for displaying relevant
              advertisements
            </li>
            <li>
              <strong>Google Analytics</strong> — for usage analytics
            </li>
          </ul>
          <p>
            These third parties have their own privacy and cookie policies, over
            which we have no control.
          </p>

          <h2>5. Managing Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings.
            Most browsers allow you to:
          </p>
          <ul>
            <li>View cookies stored on your device</li>
            <li>Delete individual or all cookies</li>
            <li>Block cookies from all or specific websites</li>
            <li>Block third-party cookies</li>
          </ul>
          <p>
            Please note that disabling certain cookies may affect the
            functionality of CVPair. Instructions for managing cookies in
            popular browsers:
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h2>6. Opt-Out of Personalised Advertising</h2>
          <p>
            You can opt out of personalised advertising from Google by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>{" "}
            or by using the{" "}
            <a
              href="https://optout.networkadvertising.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NAI opt-out tool
            </a>
            .
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect
            changes in technology or legislation. We will update the "Last
            updated" date at the top of this page when changes are made.
          </p>

          <h2>8. Contact</h2>
          <p>
            If you have questions about our use of cookies, please contact us
            at{" "}
            <a href="mailto:privacy@cvpair.com">privacy@cvpair.com</a>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
