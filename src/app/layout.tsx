import type { Metadata } from "next";
import { inter, cinzel } from "./fonts";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Borokini | Timeless Luxury Gold Jewelry",
  description: "Discover Borokini's exquisite collection of handcrafted gold necklaces, rings, and earrings. Ethically sourced luxury jewelry for the modern connoisseur.",
  keywords: ["gold jewelry", "luxury necklaces", "bespoke rings", "fine earrings", "handcrafted jewelry", "ethical gold", "Borokini"],
  authors: [{ name: "Borokini Team" }],
  openGraph: {
    title: "Borokini | Timeless Luxury Jewelry",
    description: "Exquisite handcrafted jewelry for the modern connoisseur.",
    url: "https://borokini.com",
    siteName: "Borokini",
    images: [
      {
        url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2669&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Borokini Luxury Jewelry",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Borokini | Timeless Luxury Jewelry",
    description: "Exquisite handcrafted jewelry for the modern connoisseur.",
    images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2669&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
        <body className="antialiased min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 w-full">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
