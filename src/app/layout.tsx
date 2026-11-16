import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashishlalwani.com"),
  title: "Ashish Lalwani · Dubai Real Estate",
  description:
    "Ashish Lalwani, Dubai real estate advisor at Vibgyor Real Estate. Residential, commercial and investment property. Always the right investment.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Ashish Lalwani · Dubai Real Estate",
    description: "Residential, commercial and investment property in Dubai. Always the right investment.",
    type: "website",
    url: "https://ashishlalwani.com",
  },
  alternates: {
    canonical: "https://ashishlalwani.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Ashish Lalwani",
  "jobTitle": "General Manager & Real Estate Consultant",
  "worksFor": {
    "@type": "Organization",
    "name": "Vibgyor Real Estate LLC",
  },
  "url": "https://ashishlalwani.com",
  "image": "https://ashishlalwani.com/assets/ashish.webp",
  "telephone": "+971545821600",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "AE",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" content="" />
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0B0B0C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
