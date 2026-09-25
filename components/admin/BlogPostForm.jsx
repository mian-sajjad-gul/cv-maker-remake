"use client";

import { useMemo, useState } from "react";

const emptyBlocks = [
  { type: "heading", level: 2, text: "Main SEO section heading" },
  {
    type: "paragraph",
    text: "Write a short, helpful paragraph with your focus keyword naturally included.",
  },
  {
    type: "list",
    style: "bulleted",
    items: ["Add a practical tip", "Add a second practical tip"],
  },
  {
    type: "faq",
    question: "Common reader question?",
    answer: "Clear answer that can appear in FAQ schema.",
  },
  {
    type: "cta",
    text: "Ready to build your resume?",
    buttonText: "Build My Resume",
    href: "/resume",
  },
];

function Field({
  label,
  name,
  defaultValue = "",
  textarea = false,
  placeholder = "",
  required = false,
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          className="min-h-24 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-slate-400"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-slate-400"
        />
      )}
    </label>
  );
}

function BlockEditor({ blocks, setBlocks }) {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const importJsonBlocks = () => {
    try {
      const parsed = JSON.parse(jsonInput);

      if (!Array.isArray(parsed)) {
        setJsonError("JSON must be an array of blocks.");
        return;
      }

      setBlocks(parsed);
      setJsonInput("");
      setJsonError("");
    } catch {
      setJsonError("Invalid JSON. Please check your formatting.");
    }
  };
  const update = (index, patch) =>
    setBlocks(
      blocks.map((block, i) => (i === index ? { ...block, ...patch } : block)),
    );
  const remove = (index) => setBlocks(blocks.filter((_, i) => i !== index));
  const add = (type) => {
    const defaults = {
      heading: { type: "heading", level: 2, text: "New heading" },
      paragraph: { type: "paragraph", text: "New paragraph" },
      list: { type: "list", style: "bulleted", items: ["First item"] },
      image: { type: "image", url: "", alt: "" },
      callout: { type: "callout", tone: "tip", text: "Helpful callout text" },
      faq: { type: "faq", question: "Question?", answer: "Answer." },
      cta: {
        type: "cta",
        text: "Ready to create a better resume?",
        buttonText: "Build My Resume",
        href: "/resume",
      },
    };
    setBlocks([...blocks, defaults[type]]);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-black text-slate-900">
              Paste JSON Blocks
            </h3>
            <p className="text-xs text-slate-500">
              Paste an array of content blocks and import them into the editor.
            </p>
          </div>

          <button
            type="button"
            onClick={importJsonBlocks}
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700"
          >
            Import JSON
          </button>
        </div>

        <textarea
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            setJsonError("");
          }}
          placeholder='[{"type":"heading","level":2,"text":"Example heading"}]'
          className="min-h-32 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs shadow-sm focus:border-slate-400"
        />

        {jsonError && (
          <p className="mt-2 text-xs font-bold text-red-600">{jsonError}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {["heading", "paragraph", "list", "image", "callout", "faq", "cta"].map(
          (type) => (
            <button
              key={type}
              type="button"
              onClick={() => add(type)}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs font-bold capitalize hover:bg-slate-50"
            >
              + {type}
            </button>
          ),
        )}
      </div>

      {blocks.map((block, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">
              {index + 1}. {block.type}
            </p>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-xs font-bold text-red-600"
            >
              Remove
            </button>
          </div>

          {block.type === "heading" && (
            <div className="grid gap-3 md:grid-cols-[100px_1fr]">
              <input
                type="number"
                min="2"
                max="3"
                value={block.level || 2}
                onChange={(e) =>
                  update(index, { level: Number(e.target.value) })
                }
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                value={block.text || ""}
                onChange={(e) => update(index, { text: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
          )}

          {block.type === "paragraph" && (
            <textarea
              value={block.text || ""}
              onChange={(e) => update(index, { text: e.target.value })}
              className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
          )}

          {block.type === "list" && (
            <textarea
              value={(block.items || []).join("\n")}
              onChange={(e) =>
                update(index, { items: e.target.value.split("\n") })
              }
              className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
          )}

          {block.type === "image" && (
            <div className="grid gap-3 md:grid-cols-2">
              <input
                placeholder="Image URL"
                value={block.url || ""}
                onChange={(e) => update(index, { url: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                placeholder="Alt text"
                value={block.alt || ""}
                onChange={(e) => update(index, { alt: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
          )}

          {block.type === "callout" && (
            <textarea
              value={block.text || ""}
              onChange={(e) => update(index, { text: e.target.value })}
              className="min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
          )}

          {block.type === "faq" && (
            <div className="grid gap-3">
              <input
                placeholder="Question"
                value={block.question || ""}
                onChange={(e) => update(index, { question: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Answer"
                value={block.answer || ""}
                onChange={(e) => update(index, { answer: e.target.value })}
                className="min-h-20 rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
          )}

          {block.type === "cta" && (
            <div className="grid gap-3 md:grid-cols-3">
              <input
                placeholder="CTA text"
                value={block.text || ""}
                onChange={(e) => update(index, { text: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                placeholder="Button text"
                value={block.buttonText || ""}
                onChange={(e) => update(index, { buttonText: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                placeholder="Href"
                value={block.href || ""}
                onChange={(e) => update(index, { href: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function BlogPostForm({ post, action }) {
  const initialBlocks = useMemo(
    () => (post?.content_blocks?.length ? post.content_blocks : emptyBlocks),
    [post],
  );
  const [blocks, setBlocks] = useState(initialBlocks);
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");

  function makeSlug(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  return (
    <form action={action} className="space-y-6">
      <input
        type="hidden"
        name="content_blocks"
        value={JSON.stringify(blocks)}
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-black">Basic Info</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Title
            </span>
            <input
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!post?.slug) setSlug(makeSlug(e.target.value));
              }}
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Slug
            </span>
            <input
              name="slug"
              value={slug}
              onChange={(e) => setSlug(makeSlug(e.target.value))}
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm"
            />
          </label>
          <Field
            label="Excerpt"
            name="excerpt"
            defaultValue={post?.excerpt}
            textarea
          />
          <Field
            label="Category"
            name="category"
            defaultValue={post?.category}
          />
          <Field
            label="Tags, comma separated"
            name="tags"
            defaultValue={(post?.tags || []).join(", ")}
          />
          <Field
            label="Author Name"
            name="author_name"
            defaultValue={post?.author_name || "CVPair Team"}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-black">SEO Settings</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="SEO Title"
            name="seo_title"
            defaultValue={post?.seo_title}
          />
          <Field
            label="Focus Keyword"
            name="focus_keyword"
            defaultValue={post?.focus_keyword}
          />
          <Field
            label="SEO Description"
            name="seo_description"
            defaultValue={post?.seo_description}
            textarea
          />
          <Field
            label="Canonical URL"
            name="canonical_url"
            defaultValue={post?.canonical_url}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-black">Cover Image</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Cover Image URL"
            name="cover_image"
            defaultValue={post?.cover_image}
          />
          <Field
            label="Cover Alt Text"
            name="cover_alt"
            defaultValue={post?.cover_alt}
          />
          <Field
            label="Author Avatar URL"
            name="author_avatar"
            defaultValue={post?.author_avatar}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-black">Content Builder</h2>

        <BlockEditor blocks={blocks} setBlocks={setBlocks} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-black">Publishing</h2>
        <select
          name="status"
          defaultValue={post?.status || "draft"}
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button className="mt-4 rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-slate-700">
          Save Post
        </button>
      </section>
    </form>
  );
}
