"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.svg" // Your logo in /public
          alt="QuickSetupAI Logo"
          width={40}
          height={40}
          priority
        />
        <span className="text-xl font-bold text-gray-800">QuickSetupAI</span>
      </Link>

      <nav className="flex items-center gap-6">
        <Link href="#features" className="text-gray-700 hover:text-indigo-600">
          Features
        </Link>
        <Link href="#pricing" className="text-gray-700 hover:text-indigo-600">
          Pricing
        </Link>
        <Link href="#contact" className="text-gray-700 hover:text-indigo-600">
          Contact
        </Link>
        <a
          href="https://calendly.com/yourlink" // update later when you get Calendly
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Book a Call
        </a>
      </nav>
    </header>
  );
}
