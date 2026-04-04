import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khaana - Save Food, Save Money",
  description:
    "Rescue delicious surplus food from restaurants, bakeries, and supermarkets in Islamabad at great prices.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Khaana - Save Food, Save Money",
    description:
      "Rescue delicious surplus food from restaurants, bakeries, and supermarkets in Islamabad at great prices.",
    siteName: "Khaana",
    images: [
      {
        url: "/og/og-dinner.png",
        width: 2048,
        height: 2048,
        alt: "A couple enjoying a desi dinner with a Khaana Surprise Bag",
      },
      {
        url: "/og/og-unpacking.png",
        width: 2048,
        height: 2048,
        alt: "Unpacking fresh bakery items from a Khaana bag in the kitchen",
      },
      {
        url: "/og/og-unboxing.png",
        width: 1024,
        height: 1024,
        alt: "Father and daughter unboxing a Khaana Surprise Bag together",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khaana - Save Food, Save Money",
    description:
      "Rescue delicious surplus food from restaurants, bakeries, and supermarkets in Islamabad at great prices.",
    images: ["/og/og-dinner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
