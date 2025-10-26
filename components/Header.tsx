// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          {/* Works for /public/logo.svg OR /public/logo.png */}
          <Image
            src="/logo.png"      // change to "/logo.png" if that’s your file
            alt="QuickSetupAI"
            width={32}
            height={32}
            priority
            onError={(e) => {
              // graceful fallback if the image can’t load for any reason
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = "none";
            }}
          />
          <span className="text-lg font-semibold">QuickSetupAI</span>
        </Link>

        {/* right side nav (optional) */}
        <nav className="flex items-center gap-4">
          <Link href="#services" className="text-sm hover:underline">Services</Link>
          <Link href="#pricing" className="text-sm hover:underline">Pricing</Link>
          <Link href="#contact" className="text-sm hover:underline">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
