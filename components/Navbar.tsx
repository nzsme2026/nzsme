"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
  { href: "/directory", label: "Directory" },
  { href: "/events", label: "Events" },

  // Important Flow Links
  { href: "/events/register", label: "Register" },
  { href: "/sponsorship", label: "Sponsorship" },

  { href: "/apply", label: "Apply" },
  { href: "/login", label: "Login" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#07153a] text-white shadow-md">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-5 h-24 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/NZSME.jpeg"
            alt="NZSME"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition duration-200 ${
                  isActive
                    ? "text-yellow-400"
                    : "text-white hover:text-yellow-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Apply Button */}
          <Link
            href="/apply"
            className="hidden md:inline-flex bg-white text-[#07153a] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-100 transition"
          >
            Apply Now
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 border border-white/30 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#07153a] border-t border-white/10 shadow-lg">
          <div className="flex flex-col px-5 py-4">

            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 border-b border-white/10 transition ${
                    isActive
                      ? "text-yellow-400"
                      : "text-white hover:text-yellow-400"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Apply Button */}
            <Link
              href="/apply"
              onClick={() => setMenuOpen(false)}
              className="mt-4 bg-white text-[#07153a] px-4 py-3 rounded-xl text-center text-sm font-semibold"
            >
              Apply Now
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}