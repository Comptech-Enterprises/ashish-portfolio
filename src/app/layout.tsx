import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
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
  openGraph: {
    title: "Ashish Lalwani · Dubai Real Estate",
    description: "Residential, commercial and investment property in Dubai. Always the right investment.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
