import Image from "next/image";

export default function Navbar() {
  return (
    <header className="relative z-10 w-full border-b border-slate-200/70 bg-slate-900">
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

        {/* Nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
          <a className="hover:text-white transition" href="/">
            Home
          </a>
          <a className="hover:text-white transition" href="/apply">
            Apply
          </a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="hidden text-sm font-medium text-slate-200 hover:text-white transition md:inline-flex"
          >
            Login
          </a>

          <a
            href="/apply"
            className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
          >
            Apply Now
          </a>
        </div>
      </div>
    </header>
  );
}