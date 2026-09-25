import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { getPostForAdmin } from "@/lib/blog";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { AdminNav } from "@/components/admin/AdminNav";
import { updateBlogPost } from "../../../actions";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Edit Blog Post | CVPair Admin",
  description: "Edit article content blocks, update slug, modify SEO metadata and publication status.",
};

export default async function EditBlogPostPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const post = await getPostForAdmin(id);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav activeTab="blog" />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Blog Posts</span>
          </Link>

          {post.status === "published" && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
            >
              <span>View live article</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>

        <div className="pb-6 border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Edit: {post.title}
          </h1>
          <p className="mt-1 text-sm text-slate-600 font-mono">
            Slug: /{post.slug}
          </p>
        </div>

        <div className="mt-6">
          <BlogPostForm
            post={post}
            action={updateBlogPost.bind(null, post.id)}
          />
        </div>
      </main>
    </div>
  );
}
