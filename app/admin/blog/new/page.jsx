import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { AdminNav } from "@/components/admin/AdminNav";
import { createBlogPost } from "../../actions";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Create New Blog Post | CVPair Admin",
  description: "Compose, configure SEO metadata, and publish a new resume guide or career article.",
};

export default async function NewBlogPostPage() {
  await requireAdmin();

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
        </div>

        <div className="pb-6 border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Create Blog Post
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Write content blocks, auto-generate slug, and define ATS & SEO focus keywords.
          </p>
        </div>

        <div className="mt-6">
          <BlogPostForm action={createBlogPost} />
        </div>
      </main>
    </div>
  );
}
