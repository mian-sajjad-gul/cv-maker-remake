import { getPublishedPosts } from '@/lib/blog';
import { blogPosts as staticPosts } from '@/lib/blogData';

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cvpair.com';
  const dbPosts = await getPublishedPosts();
  const posts = dbPosts.length > 0 ? dbPosts : staticPosts;

  const staticPages = [
    "/",
    "/resume",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/cookie-policy",
    "/sitemap-page",
  ];

  return [
    ...staticPages.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
