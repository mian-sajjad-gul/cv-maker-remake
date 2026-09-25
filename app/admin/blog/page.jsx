import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { getAllPostsForAdmin } from "@/lib/blog";
import { AdminNav } from "@/components/admin/AdminNav";
import { deleteBlogPost, toggleBlogPostStatus } from "../actions";
import {
  FileText,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  CheckCircle,
  FileQuestion,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Blog Posts Management | CVPair Admin",
  description: "Create, edit, publish, and optimize SEO blog posts.",
};

export default async function AdminBlogPage({ searchParams }) {
  await requireAdmin();

  const params = await searchParams;
  const currentTab = params?.tab || "all";
  const searchQuery = params?.search || "";

  const allPosts = await getAllPostsForAdmin();

  const publishedCount = allPosts.filter((p) => p.status === "published").length;
  const draftCount = allPosts.filter((p) => p.status === "draft").length;

  let filtered = allPosts;
  if (currentTab === "published") {
    filtered = filtered.filter((p) => p.status === "published");
  } else if (currentTab === "draft") {
    filtered = filtered.filter((p) => p.status === "draft");
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.slug?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.focus_keyword?.toLowerCase().includes(q)
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav activeTab="blog" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Blog Post Management
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Create, edit, manage slugs, publish status, and configure SEO metadata.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 shadow-sm transition"
            >
              <Plus className="h-4 w-4" />
              <span>Write New Post</span>
            </Link>
          </div>
        </div>

        {/* Tab Filters & Search Bar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Posts", count: allPosts.length },
              { id: "published", label: "Published", count: publishedCount },
              { id: "draft", label: "Drafts", count: draftCount },
            ].map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/admin/blog?tab=${tab.id}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.2 text-[11px] ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Search Form */}
          <form method="GET" action="/admin/blog" className="relative max-w-sm w-full">
            <input type="hidden" name="tab" value={currentTab} />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search title, slug, keyword..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs sm:text-sm shadow-xs focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
            />
          </form>
        </div>

        {/* Table of Blog Posts */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/70 text-xs uppercase tracking-wide text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-4 px-5">Article & Slug</th>
                  <th className="py-4 px-4">Status & Visibility</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Target Keyword & SEO</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-5 max-w-md">
                      <p className="font-bold text-slate-900 hover:text-indigo-600 transition">
                        <Link href={`/admin/blog/edit/${post.id}`}>
                          {post.title}
                        </Link>
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400 font-mono">
                        /{post.slug}
                      </p>
                      {post.excerpt && (
                        <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                          {post.excerpt}
                        </p>
                      )}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                            post.status === "published"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              post.status === "published" ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          ></span>
                          {post.status}
                        </span>

                        {/* Quick Status Toggle */}
                        <form
                          action={toggleBlogPostStatus.bind(
                            null,
                            post.id,
                            post.status
                          )}
                        >
                          <button
                            type="submit"
                            title={
                              post.status === "published"
                                ? "Change to Draft"
                                : "Publish Article"
                            }
                            className="rounded-lg border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition"
                          >
                            {post.status === "published" ? "Unpublish" : "Publish"}
                          </button>
                        </form>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {post.category || "General"}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      {post.focus_keyword ? (
                        <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                          <Sparkles className="h-3 w-3 text-indigo-500 shrink-0" />
                          <span className="truncate max-w-[150px]">{post.focus_keyword}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">None set</span>
                      )}
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {post.reading_time || 5} min read
                      </p>
                    </td>

                    <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">
                      {post.published_at ? (
                        <span>{new Date(post.published_at).toLocaleDateString()}</span>
                      ) : (
                        <span className="italic text-slate-400">Unpublished</span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </Link>

                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            title="View public post"
                            className="inline-flex items-center rounded-xl border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 transition"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        )}

                        <form action={deleteBlogPost.bind(null, post.id)}>
                          <button
                            type="submit"
                            title="Delete article"
                            className="inline-flex items-center rounded-xl p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-700 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      <FileQuestion className="mx-auto h-10 w-10 text-slate-300" />
                      <p className="mt-2 text-sm font-bold text-slate-800">No blog posts found</p>
                      <p className="text-xs text-slate-400">
                        {searchQuery
                          ? `No articles match your search for "${searchQuery}".`
                          : "No posts in this view."}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
