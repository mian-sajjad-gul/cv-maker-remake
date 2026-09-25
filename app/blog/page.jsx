import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";
import { blogPosts as staticPosts } from "@/lib/blogData";
import { AdBlock } from "@/components/ads/AdBlock";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export const metadata = {
  title: "CV Tips Blog | CVPair",
  description:
    "Actionable CV writing, ATS optimization, career, and job search advice from the CVPair team.",
};

function normalizePosts(raw) {
  return raw.map((p) => ({
    id: p.id ?? p.slug,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    cover_image: p.cover_image ?? p.image ?? null,
    cover_alt: p.cover_alt ?? p.title,
    reading_time: p.reading_time ?? parseInt(p.readTime) ?? null,
  }));
}

export default async function BlogPage() {
  const dbPosts = await getPublishedPosts();
  const posts = normalizePosts(dbPosts.length > 0 ? dbPosts : staticPosts);

  return (
    <main className="bg-white px-4 py-16">
      <Header />
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">
          Career Blog
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950">
          CV advice that helps you get interviews.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          CV writing guides, ATS tips, template advice, and job search
          strategies.
        </p>
        <AdBlock type="native" slot="blog-native" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {post.cover_image && (
                <Link href={`/blog/${post.slug}`}>
                  <img
                    src={post.cover_image}
                    alt={post.cover_alt}
                    className="h-48 w-full object-cover"
                  />
                </Link>
              )}
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  {post.category}{post.reading_time ? ` · ${post.reading_time} min read` : ""}
                </p>
                <h2 className="mt-3 text-xl font-black tracking-tight text-slate-950">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex text-sm font-black text-slate-950"
                >
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <AdBlock type="native" slot="blog-native" />
      </section>
      <Footer />
    </main>
  );
}
