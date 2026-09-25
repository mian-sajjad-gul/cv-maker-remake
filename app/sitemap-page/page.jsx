import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { getPublishedPosts } from "@/lib/blog";
import { blogPosts as staticPosts } from "@/lib/blogData";
import Link from "next/link";

export const metadata = {
  title: "Sitemap | CVPair",
  description:
    "Browse all pages on CVPair — CV builder, templates, blog articles, and legal pages.",
};

export default async function SitemapPage() {
  const dbPosts = await getPublishedPosts();
  const posts = dbPosts.length > 0 ? dbPosts : staticPosts;

  const sections = [
    {
      title: "Main Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "CV Builder", href: "/resume" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Templates",
      links: [
        { label: "Modern Template", href: "/resume?modern" },
        { label: "Classic Template", href: "/resume?classic" },
        { label: "ATS Template", href: "/resume?minimalAts" },
        { label: "Executive Template", href: "/resume?executive" },
        { label: "Developer Template", href: "/resume?developer" },
        { label: "MBA Template", href: "/resume?mba" },
        { label: "Sidebar Template", href: "/resume?sidebar" },
        { label: "Creative Template", href: "/resume?creative" },
        { label: "Compact Template", href: "/resume?compact" },
        { label: "Timeline Template", href: "/resume?timeline" },
        { label: "Harvard Template", href: "/resume?harvard" },
        { label: "Europass Template", href: "/resume?europass" },
        { label: "Consulting Template", href: "/resume?consulting" },
        { label: "Product Manager Template", href: "/resume?productManager" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Disclaimer", href: "/disclaimer" },
        { label: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ];

  return (
    <main className="bg-white">
      <Header />

      <section className="bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-white/50">
            Navigation
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight">Sitemap</h1>
          <p className="mt-4 text-lg text-white/70">
            A complete list of all pages on CVPair.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-10 md:grid-cols-2">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {section.title}
                </h2>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-base font-semibold text-slate-950 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {posts.length > 0 && (
              <div className="md:col-span-2">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Blog Articles
                </h2>
                <ul className="mt-4 grid gap-2 md:grid-cols-2">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-base font-semibold text-slate-950 hover:underline"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
