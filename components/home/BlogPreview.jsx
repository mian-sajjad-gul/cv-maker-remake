import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";
export async function BlogPreview() {
  let blogPosts = [];
  try {
    blogPosts = await getPublishedPosts();
  } catch {
    return null;
  }
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">
              Blog
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Resume advice that actually helps.
            </h2>
          </div>
          <Link
            href="/blog"
            className="font-bold text-slate-950 underline underline-offset-4"
          >
            View all posts
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.slice(0, 8).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="h-36 bg-cover bg-center"
                style={{ backgroundImage: `url(${post.cover_image})` }}
              />

              <div className="p-4">
                <h3 className="line-clamp-2 text-base font-black leading-tight text-slate-950 group-hover:underline">
                  {post.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">
                  {post.excerpt}
                </p>

                <p className="mt-3 text-[11px] font-semibold text-slate-500">
                  {post.category} · {post.reading_time} min read
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
