// components/SiteFooter.tsx
import Link from "next/link";

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  // simple, crisp IG glyph (no extra deps)
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7z" />
      <path d="M12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5m0-2a6.5 6.5 0 1 0 6.5 6.5A6.5 6.5 0 0 0 12 5.5z" />
      <circle cx="17.5" cy="6.5" r="1.25" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="py-10 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} QuickSetupAI — All Rights Reserved</p>

        <div className="flex items-center gap-5">
          <Link href="/terms" className="hover:text-slate-900">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link>
          <Link href="/faq" className="hover:text-slate-900">FAQ</Link>

          <a
            href="https://instagram.com/quicksetupai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-violet"
            aria-label="QuickSetupAI on Instagram"
            title="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}