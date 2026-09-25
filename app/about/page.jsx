import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import Link from "next/link";

export const metadata = {
  title: "About Us | CVPair",
  description:
    "CVPair helps professionals worldwide build job-winning CVs in minutes. Learn about our mission, what we offer, and why thousands trust us.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-white/50">
            About CVPair
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight">
            Build Your Professional CV in Minutes
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            CVPair is a free online CV and resume builder designed to help job
            seekers at every level create polished, ATS-friendly documents that
            get noticed by recruiters.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            Our Mission
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            We believe everyone deserves a professional CV — regardless of
            budget or design skills. CVPair removes the friction from the
            job-search process by giving you powerful templates, a live preview
            editor, and one-click PDF export, all in one place.
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Whether you are a recent graduate, a seasoned executive, or
            switching careers entirely, CVPair has a template and layout built
            for your story.
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            What CVPair Offers
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "14+ Professional Templates",
                desc: "Modern, Classic, ATS, Executive, Developer, MBA, Europass, Harvard, and more — each optimised for different industries and roles.",
              },
              {
                title: "Live Preview Editor",
                desc: "See your CV update in real time as you type. No lag, no refresh — just instant feedback.",
              },
              {
                title: "ATS Optimisation",
                desc: "Built-in ATS checklist scores your CV against recruiter-friendly criteria before you apply.",
              },
              {
                title: "One-Click PDF Export",
                desc: "Print or save a pixel-perfect PDF directly from your browser with no watermarks.",
              },
              {
                title: "Cover Letter Builder",
                desc: "Write and export a matching cover letter alongside your CV in the same session.",
              },
              {
                title: "Shareable CV Link",
                desc: "Generate a shareable link to your CV and send it to recruiters instantly.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            Ready to build your CV?
          </h2>
          <p className="mt-4 text-slate-600">
            It is free to start. No sign-up required.
          </p>
          <Link
            href="/resume"
            className="mt-8 inline-flex rounded-full bg-slate-950 px-8 py-3 text-sm font-black text-white hover:bg-slate-700"
          >
            Build Your CV
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
