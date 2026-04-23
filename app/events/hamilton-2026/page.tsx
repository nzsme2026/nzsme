"use client";

import Navbar from "@/components/Navbar";

export default function HamiltonEventPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white">

        {/* HERO */}
        <section className="bg-[#0b1b34] text-white py-16 text-center">
          <h1 className="text-4xl font-semibold mb-2">
            Hamilton Launch Event 2026
          </h1>
          <p className="text-gray-300">
            25 May 2026 • 6:00 PM – 9:00 PM
          </p>
        </section>

        {/* 🔥 SHAILesh — TOP SECTION */}
        <section className="bg-black text-white py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT SIDE — TEXT */}
            <div className="text-left">
              <h2 className="text-4xl font-bold mb-3">
                Shailesh Bagwe
              </h2>

              <p className="text-yellow-400 font-semibold mb-5 text-lg">
                Founder & Community Leader | CEO | Director
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                Driving force behind the NZSME Nationwide Initiative.
                Empowering businesses through connection, collaboration, and opportunity.
              </p>

              <p className="text-gray-400 text-sm mb-4">
                Bringing together media, business, and community ecosystems.
              </p>

              <p className="text-gray-500 text-sm">
                Vision: Enable, Empower, Expand NZ businesses
              </p>
            </div>

            {/* RIGHT SIDE — IMAGE + LOGOS */}
            <div className="flex flex-col items-center justify-center">

              {/* MAIN IMAGE (NOTE: currently using logo as placeholder) */}
              <img
                src="/sCompany/Shailesh Companies - Copy.jpg"
                alt="Shailesh Bagwe"
                className="rounded-xl shadow-lg max-h-[260px] object-contain mb-6 bg-white p-2"
              />

              {/* ✅ LOGOS — FIXED (NO DUPLICATION) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">

                {/* NZ WORLD NEWS */}
                <img
                  src="/sCompany/Shailesh Companies - Copy - Copy.jpg"
                  className="h-12 object-contain"
                />

                {/* AOTUROA */}
                <img
                  src="/sCompany/Shailesh Companies - Copy (2).jpg"
                  className="h-12 object-contain"
                />

                {/* RISING STAR
                <img
                  src="/sCompany/Shailesh Companies - Copy.jpg"
                  className="h-12 object-contain"
                /> */}

                {/* COMMUNITEY */}
                <img
                  src="/sCompany/Survey Logo.jpg"
                  className="h-12 object-contain"
                />

              </div>

            </div>

          </div>
        </section>

        {/* POSTER */}
        <section className="max-w-6xl mx-auto px-6 pb-20 text-center">
          <h2 className="text-2xl font-semibold mb-8">
            Official Event Poster
          </h2>

          <div className="bg-gray-50 p-6 rounded-2xl shadow-md flex justify-center">
            <img
              src="/hamilton-poster.jpg"
              alt="NZSME Hamilton Event Poster"
              className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl object-contain"
            />
          </div>
        </section>

        {/* SUMMARY */}
        <section className="max-w-4xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-600 text-lg">
            NZSME continues its nationwide journey with the Hamilton event,
            bringing together SME owners, business leaders, and decision-makers
            for meaningful connections, collaboration, and business growth.
          </p>
        </section>

        {/* VENUE */}
        <section className="max-w-4xl mx-auto px-6 pb-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Venue Details
          </h2>

          <p className="text-gray-700 text-lg font-medium">
            JetPark Hotel Hamilton Airport
          </p>

          <p className="text-gray-500">
            201 Airport Road, Hamilton Airport 3282
          </p>

          <p className="text-gray-500">
            Hamilton, New Zealand
          </p>
        </section>

        {/* CTA */}
        <section className="text-center pb-24">
          <h2 className="text-xl font-semibold mb-4">
            Secure Your Spot
          </h2>

          <a
            href="/apply"
            className="bg-[#0b1b34] hover:bg-[#12294f] transition text-white px-8 py-3 rounded-md inline-block"
          >
            Register / Apply for Membership
          </a>
        </section>

      </main>
    </>
  );
}