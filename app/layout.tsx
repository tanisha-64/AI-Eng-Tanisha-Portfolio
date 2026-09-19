import type { Metadata } from "next";

import "./globals.css";

import AITwin from "@/components/ai-twin/AITwin";
import Navigation from "@/components/navigation/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: "%s — Tanisha Gupta",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Tanisha Gupta",
    "AI Engineer",
    "Generative AI",
    "RAG",
    "Computer Vision",
    "LLM",
    "Machine Learning",
    "Software Engineering",
  ],
  authors: [{ name: "Tanisha Gupta" }],
  creator: "Tanisha Gupta",
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.siteUrl,
    siteName: "Tanisha Gupta Portfolio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        {/* Visual atmosphere */}
        <div
          className="grain"
          aria-hidden="true"
        />

        {/* Global interaction */}
        <CustomCursor />

        {/* Global navigation */}
        <Navigation />

        {/* Page content wrapper */}
        <div className="min-h-screen">
          {children}
        </div>

        {/* Global AI Twin */}
        <AITwin />
      </body>
    </html>
  );
}