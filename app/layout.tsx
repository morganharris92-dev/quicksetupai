import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://quicksetupai.com"),
  title: "AI Setup Service for Small Businesses | QuickSetupAI",
  description:
    "QuickSetupAI builds custom GPTs and AI automations for small businesses—fast, affordable, and maintained long-term. Book a free AI setup call.",
  openGraph: {
    title: "QuickSetupAI — Custom AI systems for small businesses",
    description:
      "Done-for-you GPT setup, workflow automation, and ongoing maintenance.",
    url: "https://quicksetupai.com",
    siteName: "QuickSetupAI",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickSetupAI",
    description: "AI setup service for small businesses.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
