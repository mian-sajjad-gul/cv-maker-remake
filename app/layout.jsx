import "./globals.css";
import { GoogleAdSense } from "@/components/ads/GoogleAdSense";
import { Providers } from "@/components/auth/Providers";
import Script from "next/script";
export const metadata = {
  title: "CVPair — Build Your Professional CV in Minutes",
  description: "Create, edit & download job-winning CVs easily. Choose from professional templates with live preview, ATS optimization, and one-click PDF export.",
  keywords: "CV builder, resume builder, professional CV, ATS resume, CV templates, online CV maker",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <GoogleAdSense />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-H748BLF4YL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-H748BLF4YL');
        `}
      </Script>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
