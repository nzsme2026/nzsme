import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-slate-900">

        {/* HERO */}
        <section className="bg-gradient-to-br from-[#07153a] via-[#0b1b34] to-[#12284a] text-white">
          <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-yellow-400 font-semibold text-sm uppercase tracking-wide mb-4">
                New Zealand SME Private Membership Network
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Where NZ Business Leaders Connect, Collaborate and Grow
              </h1>

              <p className="text-slate-200 text-lg leading-8 mb-8">
                NZSME is a private membership network built for serious SME owners,
                entrepreneurs, and professionals across New Zealand. We bring
                business owners together through events, workshops, networking,
                visibility, and practical community support.
              </p>

                            <div className="flex flex-wrap gap-4">
                <a
                  href="/apply"
                  className="bg-white text-[#07153a] px-7 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
                >
                  Apply for Membership
                </a>

                <a
                  href="/events"
                  className="border border-white/40 text-white px-7 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
                >
                  View Events
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <a
                  href="https://www.instagram.com/nzsme2026?igsh=MTBwMzB1emo1a2VvZA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-yellow-400 transition"
                >
                  Follow us on Instagram
                </a>

                <a
                  href="https://www.facebook.com/share/1C4paUARyy/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-yellow-400 transition"
                >
                  Follow us on Facebook
                </a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center max-w-xl">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">$60</p>
                  <p className="text-xs text-slate-300">Annual Membership</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">NZ</p>
                  <p className="text-xs text-slate-300">Nationwide Network</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-bold">SME</p>
                  <p className="text-xs text-slate-300">Business Focused</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-400/20 rounded-3xl blur-2xl" />

              <img
                src="/hero-meeting.jpg"
                alt="NZSME Business Network"
                className="relative rounded-3xl shadow-2xl w-full object-cover"
              />
            </div>

          </div>
        </section>

        {/* ACTIVE EVENT */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-slate-50 border rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-10 items-center">

            <div>
              <p className="text-yellow-600 font-semibold text-sm uppercase tracking-wide mb-3">
                Upcoming Event
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                NZSME Hamilton Launch
              </h2>

              <p className="text-slate-600 leading-8 mb-6">
                After a successful Auckland launch, NZSME is now expanding its
                nationwide initiative to Hamilton. Join SME owners, professionals,
                sponsors, and community leaders for an evening of networking,
                business connection, and practical growth conversations.
              </p>

              <div className="space-y-2 text-slate-700 mb-6">
                <p><strong>Date:</strong> 25 May 2026</p>
                <p><strong>Location:</strong> Hamilton</p>
                <p><strong>Focus:</strong> SME networking, business growth, workshops and collaboration</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/events"
                  className="bg-[#07153a] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0b2361] transition"
                >
                  View Event Details
                </a>

                <a
  href="/apply"
  className="border border-slate-300 px-6 py-3 rounded-xl font-semibold hover:bg-white transition"
>
  Register Now
</a>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="/HamiltoPoster1905.jpeg"
                alt="NZSME Hamilton Launch Poster"
                className="rounded-2xl shadow-xl max-h-[520px] object-contain bg-white"
              />
            </div>

          </div>
        </section>

        {/* WHAT NZSME OFFERS */}
        <section className="bg-[#07153a] text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">

            <p className="text-yellow-400 font-semibold text-sm uppercase tracking-wide mb-3">
              Why NZSME
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              A Stronger SME Network for New Zealand
            </h2>

            <p className="text-slate-300 max-w-3xl mx-auto leading-8 mb-12">
              NZSME is building a trusted ecosystem where business owners can
              connect directly, share opportunities, attend meaningful workshops,
              and grow together with clarity and confidence.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">

              <div className="bg-white/10 p-7 rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-3">
                  Verified Business Community
                </h3>
                <p className="text-slate-300 leading-7">
                  A structured network for SME owners and professionals who want
                  meaningful business connections, not random noise.
                </p>
              </div>

              <div className="bg-white/10 p-7 rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-3">
                  Events and Workshops
                </h3>
                <p className="text-slate-300 leading-7">
                  Regular networking events, practical workshops, business
                  sessions, and chapter-based activities across New Zealand.
                </p>
              </div>

              <div className="bg-white/10 p-7 rounded-2xl border border-white/10">
                <h3 className="text-xl font-semibold mb-3">
                  Visibility and Collaboration
                </h3>
                <p className="text-slate-300 leading-7">
                  Opportunities for members to connect, collaborate, promote
                  responsibly, and build relationships in a trusted business
                  environment.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* CREDIBILITY */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div>
              <p className="text-yellow-600 font-semibold text-sm uppercase tracking-wide mb-3">
                Proven Start
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                Auckland Launch Completed. Hamilton Next.
              </h2>

              <p className="text-slate-600 leading-8 mb-6">
                NZSME launched successfully in Auckland on 13 April 2026 with a
                strong turnout of SME owners, community leaders, policymakers,
                and industry professionals. The response showed clear demand for
                a serious, structured SME network in New Zealand.
              </p>

              <a
                href="/events"
                className="text-blue-700 font-semibold underline"
              >
                View Auckland highlights and event videos
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-[#07153a]">13 Apr</p>
                <p className="text-sm text-slate-500 mt-2">Auckland Launch</p>
              </div>

              <div className="bg-slate-50 border rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-[#07153a]">25 May</p>
                <p className="text-sm text-slate-500 mt-2">Hamilton Launch</p>
              </div>

              <div className="bg-slate-50 border rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-[#07153a]">NZ</p>
                <p className="text-sm text-slate-500 mt-2">Nationwide Vision</p>
              </div>

              <div className="bg-slate-50 border rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-[#07153a]">SME</p>
                <p className="text-sm text-slate-500 mt-2">Community First</p>
              </div>
            </div>

          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-slate-100 py-20 text-center">
          <div className="max-w-3xl mx-auto px-6">

            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Join the NZSME Network
            </h2>

            <p className="text-slate-600 leading-8 mb-8">
              Be part of a growing business community focused on trust,
              collaboration, visibility, workshops, advocacy, and practical SME
              growth across New Zealand.
            </p>

                       <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/apply"
                className="bg-[#07153a] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0b2361] transition"
              >
                Apply Now
              </a>

              <a
                href="https://www.instagram.com/nzsme2026?igsh=MTBwMzB1emo1a2VvZA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-300 px-8 py-3 rounded-xl font-semibold hover:bg-white transition"
              >
                Instagram
              </a>

              <a
                href="https://www.facebook.com/share/1C4paUARyy/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-300 px-8 py-3 rounded-xl font-semibold hover:bg-white transition"
              >
                Facebook
              </a>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}