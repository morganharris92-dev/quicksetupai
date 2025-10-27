// components/SiteFooter.tsx
import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-6">
          <Link href="/terms" className="hover:text-midnight">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-midnight">Privacy Policy</Link>
          <Link href="/faq" className="hover:text-midnight">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/quicksetupai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="QuickSetupAI on Instagram"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:border-violet hover:text-violet transition"
            title="Instagram"
          >
            {/* Minimal Instagram glyph */}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11.001A5.5 5.5 0 0 1 12 7.5zm0 2a3.5 3.5 0 1 0 .001 7.001A3.5 3.5 0 0 0 12 9.5zM18 6.8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
          </a>
        </div>

        <p className="text-center md:text-right">© {year} QuickSetupAI — All Rights Reserved</p>
      </div>
    </footer>
  );
}