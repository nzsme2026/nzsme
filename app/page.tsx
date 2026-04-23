import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="bg-white">

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Where NZ Business Leaders Connect
            </h1>

            <p className="text-gray-600 mb-6">
              NZSME is a private membership network built for serious business owners across New Zealand. Connect, collaborate, and grow with verified members.
            </p>

            <div className="flex gap-4">
              <a
                href="/apply"
                className="bg-[#0b1b34] text-white px-6 py-3 rounded-md"
              >
                Apply for Membership
              </a>

              <a
                href="/directory"
                className="border border-gray-300 px-6 py-3 rounded-md"
              >
                View Members
              </a>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              $60 / year • NZBN Verified • Members Only
            </div>
          </div>

          <div>
            <img
              src="/hero-meeting.jpg"
              alt="NZSME Network"
              className="rounded-xl shadow-lg"
            />
          </div>

        </section>

        {/* WHAT NZSME IS */}
        <section className="bg-[#0b1b34] text-white py-20 text-center">
          <div className="max-w-4xl mx-auto px-6">

            <h2 className="text-3xl font-semibold mb-6">
              A Stronger SME Network for New Zealand
            </h2>

            <p className="text-gray-300 mb-10">
              NZSME is building a trusted ecosystem where business owners connect directly, share opportunities, and grow together without noise or посредники.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-sm">

              <div className="bg-[#12284a] p-6 rounded-lg">
                ✔ Verified Business Members
              </div>

              <div className="bg-[#12284a] p-6 rounded-lg">
                ✔ Real Networking Opportunities
              </div>

              <div className="bg-[#12284a] p-6 rounded-lg">
                ✔ Access to Events & Insights
              </div>

            </div>

          </div>
        </section>

        {/* SOCIAL PROOF (AUCKLAND ONLY AS CREDIBILITY) */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Proven Start. Growing Nationwide.
            </h2>

            <p className="text-gray-600 mb-6">
              NZSME launched successfully in Auckland with a full house of business owners, policymakers, and industry leaders. This is just the beginning.
            </p>

            <a
              href="/events"
              className="text-blue-600 font-medium underline"
            >
              View Events & Highlights →
            </a>
          </div>

          <div className="bg-gray-100 rounded-xl p-10 text-center">
            <p className="text-lg font-medium">
              Auckland Launch Completed
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Strong turnout • High engagement • Real impact
            </p>
          </div>

        </section>

        {/* FINAL CTA */}
        <section className="bg-gray-100 py-20 text-center">
          <div className="max-w-3xl mx-auto px-6">

            <h2 className="text-3xl font-semibold mb-6">
              Join the NZSME Network
            </h2>

            <p className="text-gray-600 mb-8">
              Be part of a growing community of business owners across New Zealand.
            </p>

            <a
              href="/apply"
              className="bg-[#0b1b34] text-white px-8 py-3 rounded-md"
            >
              Apply Now
            </a>

          </div>
        </section>

      </main>
    </>
  );
}