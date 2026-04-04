"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/community", label: "Community" },
  { href: "/directory", label: "Directory" },
  { href: "/events", label: "Events" },
  { href: "/apply", label: "Apply" },
  { href: "/login", label: "Login" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#07153a] text-white relative z-50">
      
      {/* TOP BAR */}
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        
        <Link href="/">
          <img
            src="/NZSME.jpeg"
            alt="NZSME"
            className="h-14"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm ${
                item.label === "Events"
                  ? "text-yellow-400"
                  : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            href="/apply"
            className="bg-white text-[#07153a] px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Apply Now
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 border border-white/30 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ✅ FIXED MOBILE MENU (OVERLAY, NOT INLINE) */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#07153a] shadow-lg md:hidden">
          <div className="flex flex-col px-5 py-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 border-b border-white/10 text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}