"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 w-full border-b border-slate-200/70 bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <a href="/" className="flex items-center">
          <Image
            src="/logo-square.png"
            alt="NZSME Logo"
            width={90}
            height={90}
            className="object-contain"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/community" className="hover:text-white">Community</a>
          <a href="/directory" className="hover:text-white">Directory</a> {/* ✅ NEW */}
          <a href="/events" className="text-yellow-400 font-semibold">Events</a>
          <a href="/apply" className="hover:text-white">Apply</a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <a href="/login" className="hidden md:inline-flex text-sm text-slate-200 hover:text-white">
            Login
          </a>

          <a
            href="/apply"
            className="bg-white text-slate-900 px-4 py-2 rounded-md text-sm font-semibold"
          >
            Apply Now
          </a>

          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-slate-900 px-6 pb-4 space-y-3 text-slate-200">
          <a href="/">Home</a>
          <a href="/community">Community</a>
          <a href="/directory">Directory</a> {/* ✅ NEW */}
          <a href="/events" className="text-yellow-400 font-semibold">Events</a>
          <a href="/apply">Apply</a>
          <a href="/login">Login</a>
        </div>
      )}
    </header>
  );
}