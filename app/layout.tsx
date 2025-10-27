import "./globals.css";
import Header from "../components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickSetupAI",
  description: "Personalized GPT setup and automation services for entrepreneurs.",
  icons: {
    icon: "/favicon512.ico", // ✅ one high-res icon for all devices
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
        {/* Force browsers to reload the high-res favicon */}
        <link rel="icon" href="/favicon512.ico?v=2" sizes="512x512" type="image/x-icon" />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}