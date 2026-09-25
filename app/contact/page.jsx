import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, Clock, MessageSquare, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us | CVPair",
  description:
    "Get in touch with the CVPair team. Send an inquiry or question about resume templates, formatting, or partnerships.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400">
            Get in Touch
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
            Contact the CVPair Team
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed">
            Have a question, suggestion, or need technical help with your CV?
            Send us a message and our team will get back to you promptly.
          </p>
        </div>
      </section>

      {/* Main Content: Form + Details */}
      <section className="px-4 py-16 sm:py-20 bg-slate-50/50">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-12 items-start">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Contact Details & FAQs Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-950">
                Reach Us Directly
              </h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Mail className="h-4 w-4" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Email Support
                    </p>
                  </div>
                  <a
                    href="mailto:support@cvpair.com"
                    className="mt-1.5 block text-base font-bold text-slate-950 hover:text-indigo-600 hover:underline"
                  >
                    support@cvpair.com
                  </a>
                  <p className="mt-1 text-xs text-slate-500">
                    Typically replied to within 24–48 hours.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Clock className="h-4 w-4" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Support Hours
                    </p>
                  </div>
                  <p className="mt-1.5 text-sm font-bold text-slate-950">
                    Monday – Friday, 9:00 AM – 6:00 PM UTC
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Emergency inquiries monitored on weekends.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-indigo-600" />
                <span>Common Questions</span>
              </h3>
              <div className="mt-3 space-y-3">
                {[
                  {
                    q: "Is CVPair free to use?",
                    a: "Yes. Building, editing, and downloading your CV as a PDF is completely free.",
                  },
                  {
                    q: "Do I need to create an account?",
                    a: "No account required. Your CV data is stored locally in your browser for privacy.",
                  },
                  {
                    q: "How do I report a formatting bug?",
                    a: "Use the contact form here or email support@cvpair.com with your template name.",
                  },
                ].map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
                  >
                    <p className="text-xs font-bold text-slate-900">{item.q}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
