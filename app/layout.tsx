import "./globals.css";
import Header from "../components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickSetupAI | Custom AI Systems for Small Businesses",
  description:
    "We build, automate, and maintain AI systems for small businesses — fast, affordable, and built to grow with you.",
  keywords: [
    "AI setup",
    "GPT automation",
    "small business AI",
    "AI consultant",
    "QuickSetupAI",
    "custom GPTs",
    "AI workflows",
  ],
  authors: [{ name: "QuickSetupAI", url: "https://quicksetupai.com" }],
  metadataBase: new URL("https://quicksetupai.com"),
  openGraph: {
    title: "QuickSetupAI — Your Business, Supercharged by AI",
    description:
      "Done-for-you AI setups, automations, and GPT systems for entrepreneurs and small teams.",
    url: "https://quicksetupai.com",
    siteName: "QuickSetupAI",
    images: [
      {
        url: "/og-preview.png", // 👈 you’ll create this in Step 3
        width: 1200,
        height: 630,
        alt: "QuickSetupAI preview banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickSetupAI — Custom AI Systems for Small Businesses",
    description:
      "Stop wasting time on prompts and plugins. We set up your full AI system — fast, affordable, and long-term maintained.",
    images: ["/og-preview.png"],
    creator: "@QuickSetupAI",
  },
  icons: {
    icon: "/favicon512.ico",
  },
};