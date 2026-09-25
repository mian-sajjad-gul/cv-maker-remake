import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export const metadata = {
  title: "Disclaimer | CVPair",
  description:
    "Read the CVPair Disclaimer regarding the limitations of our CV builder service and the advice provided on our website.",
};

const LAST_UPDATED = "17 June 2026";

export default function DisclaimerPage() {
  return (
    <main className="bg-white">
      <Header />

      <section className="bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-white/50">
            Legal
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight">
            Disclaimer
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="prose prose-slate mx-auto max-w-4xl">

          <h2>1. General Information Only</h2>
          <p>
            The information provided on CVPair (cvpair.com) is for general
            informational and educational purposes only. Nothing on this website
            constitutes professional career, legal, or employment advice. CVPair
            makes no guarantees regarding job placement, interview success, or
            hiring outcomes.
          </p>

          <h2>2. No Guarantee of Employment</h2>
          <p>
            While CVPair provides templates, tools, and guidance intended to
            help improve your CV, we make no representation or warranty that
            using our Service will result in job interviews, employment offers,
            or career advancement. Employment outcomes depend on many factors
            beyond the scope of any CV builder tool.
          </p>

          <h2>3. Accuracy of Information</h2>
          <p>
            We strive to keep all content on CVPair accurate and up to date.
            However, we make no warranties or representations as to the
            accuracy, completeness, or suitability of any information on the
            website. We reserve the right to update, change, or remove content
            at any time without notice.
          </p>

          <h2>4. Blog and Editorial Content</h2>
          <p>
            Articles, guides, and tips published on the CVPair blog are based
            on general best practices and publicly available information. They
            represent the views of the authors and should not be taken as
            definitive career or legal advice. Always consult a qualified
            professional for specific career guidance.
          </p>

          <h2>5. Third-Party Links and Resources</h2>
          <p>
            CVPair may contain links to external websites or resources. These
            links are provided for convenience only. We have no control over the
            content of those sites and accept no responsibility or liability for
            their content, products, or services. Inclusion of any link does not
            imply endorsement by CVPair.
          </p>

          <h2>6. Advertising</h2>
          <p>
            CVPair displays third-party advertisements through Google AdSense
            and other networks. We do not endorse the products or services
            advertised and are not responsible for any transactions you may
            enter into with advertisers. Advertising revenue helps us keep the
            Service free.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, CVPair shall not
            be liable for any direct, indirect, incidental, consequential, or
            punitive damages arising from your use of, or reliance on, any
            information or tools provided through the Service.
          </p>

          <h2>8. Changes to This Disclaimer</h2>
          <p>
            We reserve the right to modify this Disclaimer at any time. Changes
            will be effective upon posting to the website. Continued use of the
            Service following any changes constitutes acceptance of the revised
            Disclaimer.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you have questions about this Disclaimer, please contact us at{" "}
            <a href="mailto:legal@cvpair.com">legal@cvpair.com</a>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
