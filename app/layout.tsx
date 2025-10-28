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
        url: "/og-preview.png",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics Tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-T4LNV0TFLQ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T4LNV0TFLQ');
            `,
          }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}