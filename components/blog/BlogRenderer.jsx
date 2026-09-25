import Link from 'next/link';

export function BlogRenderer({ blocks = [] }) {
  return (
    <div className="prose prose-slate max-w-none">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const Tag = block.level === 3 ? 'h3' : 'h2';
          const id = (block.text || '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
          return <Tag id={id} key={index} className="scroll-mt-24">{block.text}</Tag>;
        }
        if (block.type === 'paragraph') return <p key={index}>{block.text}</p>;
        if (block.type === 'list') {
          return (
            <ul key={index}>
              {(block.items || []).filter(Boolean).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          );
        }
        if (block.type === 'image') {
          if (!block.url) return null;
          return <img key={index} src={block.url} alt={block.alt || ''} className="rounded-2xl" />;
        }
        if (block.type === 'callout') {
          return <div key={index} className="not-prose rounded-2xl border-l-4 border-slate-900 bg-slate-50 p-5 text-sm font-medium text-slate-700">{block.text}</div>;
        }
        if (block.type === 'faq') {
          return (
            <section key={index} className="not-prose rounded-2xl border border-slate-200 p-5">
              <h3 className="font-black text-slate-900">{block.question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{block.answer}</p>
            </section>
          );
        }
        if (block.type === 'cta') {
          return (
            <div key={index} className="not-prose my-8 rounded-3xl bg-slate-900 p-8 text-white">
              <p className="text-2xl font-black">{block.text}</p>
              <Link href={block.href || '/resume'} className="mt-4 inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-900">
                {block.buttonText || 'Get Started'}
              </Link>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export function TableOfContents({ blocks = [] }) {
  const headings = blocks.filter((block) => block.type === 'heading' && block.text);
  if (!headings.length) return null;
  return (
    <nav className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">Table of contents</p>
      <ol className="mt-3 space-y-2 text-sm text-slate-700">
        {headings.map((heading, index) => {
          const id = heading.text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
          return <li key={index}><a href={`#${id}`} className="hover:text-slate-950">{heading.text}</a></li>;
        })}
      </ol>
    </nav>
  );
}

export function JsonLd({ post }) {
  const faqBlocks = (post.content_blocks || []).filter((block) => block.type === 'faq');
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo_description || post.excerpt,
    image: post.cover_image ? [post.cover_image] : undefined,
    author: { '@type': 'Person', name: post.author_name },
    datePublished: post.published_at,
    dateModified: post.updated_at,
  };
  const faqSchema = faqBlocks.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqBlocks.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </>
  );
}
