import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog";
import { getBlogPost as getStaticPost } from "@/lib/blogData";
import { getCommentsForPost } from "@/lib/supabase/admin";
import {
  BlogRenderer,
  JsonLd,
  TableOfContents,
} from "@/components/blog/BlogRenderer";
import { CommentsSection } from "@/components/blog/CommentsSection";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { AdBlock } from "@/components/ads/AdBlock";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = (await getBlogPostBySlug(slug)) ?? getStaticPost(slug);
  if (!post) return { title: "Blog Post" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    alternates: {
      canonical: post.canonical_url || `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      images: post.cover_image
        ? [{ url: post.cover_image, alt: post.cover_alt || post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

function normalizeStaticPost(p) {
  return {
    ...p,
    content_blocks:
      p.content_blocks ??
      (p.content || []).map((text) => ({ type: "paragraph", text })),
    cover_image: p.image ?? null,
    cover_alt: p.title,
    author_name: p.author || "CVPair Editorial Team",
    published_at: p.date,
    reading_time: parseInt(p.readTime) || 5,
    seo_title: p.title,
    seo_description: p.excerpt,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const dbPost = await getBlogPostBySlug(slug);
  const rawStatic = dbPost ? null : getStaticPost(slug);
  const post = dbPost ?? (rawStatic ? normalizeStaticPost(rawStatic) : null);
  if (!post) notFound();

  // Fetch approved comments & nested threads for this article
  const comments = await getCommentsForPost(post.slug);

  return (
    <main className="bg-white px-4 py-12">
      <Header />
      <JsonLd post={post} />
      <article className="mx-auto max-w-4xl">
        <div className="text-sm font-bold text-slate-500">
          <Link href="/">Home</Link> / <Link href="/blog">Blog</Link> /{" "}
          {post.category}
        </div>

        <div className="mt-8">
          <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-600">
            {post.category}
          </p>

          <h1 className="mt-5 text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
            {post.title}
          </h1>
          <AdBlock type="leaderboard" slot="homepage-top" />

          <p className="mt-5 text-xl leading-8 text-slate-600">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>
              By <strong className="text-slate-800">{post.author_name}</strong>
            </span>

            <span>·</span>
            <time dateTime={post.published_at}>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString()
                : "Draft"}
            </time>
            <span>·</span>
            <span>{post.reading_time} min read</span>
          </div>
        </div>
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.cover_alt || post.title}
            className="mt-10 max-h-[460px] w-full rounded-3xl object-cover shadow-sm"
          />
        )}

        <div className="mt-10">
          <TableOfContents blocks={post.content_blocks} />
        </div>
        <AdBlock type="leaderboard" slot="homepage-top" />
        <div className="mt-10">
          <BlogRenderer blocks={post.content_blocks} />
        </div>
        <AdBlock type="rectangle" slot="blog-sidebar" />

        {/* Threaded Comments & Nested Discussion Section */}
        <CommentsSection postSlug={post.slug} initialComments={comments} />
      </article>
      <Footer />
    </main>
  );
}
