import Image from "next/image";
import Navbar from "@/components/Navbar";
import BottomStatusBar from "@/components/BottomStatusBar";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#f5f7fb]">

      {/* Background Skyline */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg-auckland.png')",
          filter: "grayscale(80%)"
        }}
      />

      {/* Soft Overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-white/70" />

      <Navbar />

      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left */}
          <div className="max-w-xl">
            <div className="text-xs font-semibold tracking-wide text-slate-500">
              Private Membership Network
            </div>

            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-slate-900">
              Where NZ <br />
              Business <br />
              Leaders Connect
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Join New Zealand&apos;s premier private network for SME owners.
              Access verified business connections, exclusive events, and growth opportunities.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="/apply"
                className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
              >
                Apply for Membership
                <span className="ml-2">→</span>
              </a>

              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                Member Login
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 flex items-center gap-10">
              <div>
                <div className="text-xl font-semibold text-slate-900">$60</div>
                <div className="text-xs text-slate-500">Per Year</div>
              </div>

              <div>
                <div className="text-xl font-semibold text-slate-900">100%</div>
                <div className="text-xs text-slate-500">NZ Owned</div>
              </div>

              <div>
                <div className="text-xl font-semibold text-slate-900">NZBN</div>
                <div className="text-xs text-slate-500">Verified</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="mx-auto w-full max-w-xl rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/60 overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/hero-meeting.jpg"
                  alt="NZSME meeting"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Facebook Community Section */}
      <section className="relative bg-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">
            Join the NZSME Community
          </h2>

          <p className="mt-4 text-slate-300 max-w-2xl mx-auto leading-7">
            Stay updated with member highlights, business events, and networking opportunities.
            Follow our official Facebook page and be part of the growing NZSME network.
          </p>

          <div className="mt-8">
            <a
              href="https://www.facebook.com/profile.php?id=61586404397699"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200 transition"
            >
              Follow NZSME on Facebook
            </a>
          </div>
        </div>
      </section>

      <BottomStatusBar />
    </main>
  );
}