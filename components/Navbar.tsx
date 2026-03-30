"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 w-full border-b border-slate-200/70 bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/NZSME.jpeg"
            alt="NZSME Logo"
            width={140}
            height={40}
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
          <a className="hover:text-white" href="/">Home</a>
          <a className="hover:text-white" href="/community">Community</a>
          <a className="text-yellow-400 font-semibold" href="/events">Events</a>
          <a className="hover:text-white" href="/apply">Apply</a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="hidden md:inline-flex text-sm text-slate-200 hover:text-white"
          >
            Login
          </a>

          <a
            href="/apply"
            className="bg-white text-slate-900 px-4 py-2 rounded-md text-sm font-semibold"
          >
            Apply Now
          </a>

          {/* Mobile Menu Button */}
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
          <a href="/" className="block">Home</a>
          <a href="/community" className="block">Community</a>
          <a href="/events" className="block text-yellow-400 font-semibold">Events</a>
          <a href="/apply" className="block">Apply</a>
          <a href="/login" className="block">Login</a>
        </div>
      )}
    </header>
  );
}