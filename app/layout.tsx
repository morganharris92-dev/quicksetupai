import "./globals.css";
import Header from "../components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickSetupAI",
  description: "Personalized GPT setup and automation services for entrepreneurs.",
  icons: {
    icon: "/favicon2.ico", // ✅ updated to new favicon file in /public
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
        {/* Forces the browser and Cloudflare to grab the new favicon */}
        <link rel="icon" href="/favicon2.ico?v=1" sizes="any" />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <Header /> {/* 👈 this adds your navbar with logo */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}