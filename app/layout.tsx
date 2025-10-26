import "./globals.css";
import Header from "../components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickSetupAI",
  description: "Personalized GPT setup and automation services for entrepreneurs.",
  icons: {
    icon: "/favicon.ico", // 👈 place your favicon in /public
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Header /> {/* 👈 this adds your navbar with logo */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
