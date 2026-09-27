import "./globals.css";
import { GoogleAdSense } from "@/components/ads/GoogleAdSense";
import { Providers } from "@/components/auth/Providers";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  metadataBase: new URL("https://cvpair.com"), // replace with your actual domain
  title: "CVPair — Build Your Professional CV in Minutes",
  description:
    "Create, edit & download job-winning CVs easily. Choose from professional templates with live preview, ATS optimization, and one-click PDF export.",
  keywords:
    "CV builder, resume builder, professional CV, ATS resume, CV templates, online CV maker",
  openGraph: {
    title: "CVPair — Build Your Professional CV in Minutes",
    description: "Create, edit & download job-winning CVs easily.",
    siteName: "CVPair",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVPair — Build Your Professional CV in Minutes",
    description: "Create, edit & download job-winning CVs easily.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
        <GoogleAdSense />
        <GoogleAnalytics gaId={gaId} />
      </body>
    </html>
  );
}
