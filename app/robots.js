export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cvpair.com';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
