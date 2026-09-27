import { getPublishedPosts } from '@/lib/blog';
import { blogPosts as staticPosts } from '@/lib/blogData';

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cvpair.com';
  const dbPosts = await getPublishedPosts();
  const posts = dbPosts.length > 0 ? dbPosts : staticPosts;

  const staticPages = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/resume", priority: 1.0, changeFrequency: "daily" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/sitemap-page", priority: 0.5, changeFrequency: "monthly" },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
