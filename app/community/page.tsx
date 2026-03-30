"use client";

import Navbar from "@/components/Navbar";

export default function CommunityPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#0b1b34] text-white">
        
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              NZSME Community & Insights
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Real conversations, real experiences, and real insights from New Zealand’s SME ecosystem. 
              Watch, learn, and see how business leaders are navigating growth, challenges, and opportunities.
            </p>

            <div className="flex gap-4">
              <a href="/apply" className="bg-white text-[#0b1b34] px-6 py-3 rounded-md font-medium">
                Join NZSME
              </a>
            </div>
          </div>

          <div>
            <img
              src="/community.jpg"
              alt="NZSME Community"
              className="rounded-xl shadow-lg"
            />
          </div>
        </section>

        {/* VIDEOS */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold mb-10">From the NZSME Community</h2>

          <div className="grid md:grid-cols-2 gap-8">
            
            <iframe
              className="w-full h-[250px] rounded-lg"
              src="https://www.youtube.com/embed/XVlPrPk1VZw"
              title="NZSME Video 1"
              allowFullScreen
            ></iframe>

            <iframe
              className="w-full h-[250px] rounded-lg"
              src="https://www.youtube.com/embed/KTpaAjm18yE"
              title="NZSME Video 2"
              allowFullScreen
            ></iframe>

            <iframe
              className="w-full h-[250px] rounded-lg"
              src="https://www.youtube.com/embed/Q0QOJPlr3O8"
              title="NZSME Video 3"
              allowFullScreen
            ></iframe>

            <iframe
              className="w-full h-[250px] rounded-lg"
              src="https://www.youtube.com/embed/pEyTOQx-clU"
              title="NZSME Video 4"
              allowFullScreen
            ></iframe>

          </div>
        </section>

        {/* WHY JOIN */}
        <section className="bg-white text-[#0b1b34] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-10 text-center">
              Why Join NZSME
            </h2>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Meaningful Connections</h3>
                <p>
                  Build relationships with business owners and leaders who understand the realities of running a business in New Zealand.
                </p>
              </div>

              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Practical Insights</h3>
                <p>
                  Access discussions, updates, and perspectives that are grounded in real business experience, not theory.
                </p>
              </div>

              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Stronger Business Confidence</h3>
                <p>
                  Gain clarity and confidence through shared knowledge, expert input, and peer learning.
                </p>
              </div>

              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Opportunities Through Network</h3>
                <p>
                  Partnerships, collaborations, and new opportunities naturally emerge from strong connections.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* LAUNCH VALUE */}
        <section className="bg-[#0b1b34] py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold mb-6">
              What Makes NZSME Different
            </h2>

            <p className="text-gray-300 max-w-3xl mx-auto mb-10">
              NZSME is not another networking group. It is a focused platform designed to bring the right people, 
              the right conversations, and the right opportunities together.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">

              <div className="bg-[#13294b] p-6 rounded-lg">
                <p className="font-semibold mb-2">Real Conversations</p>
                <p className="text-gray-300 text-sm">
                  Honest discussions around real business challenges and growth strategies.
                </p>
              </div>

              <div className="bg-[#13294b] p-6 rounded-lg">
                <p className="font-semibold mb-2">Policy & Market Insights</p>
                <p className="text-gray-300 text-sm">
                  Exposure to discussions around trade, policy direction, and global opportunities.
                </p>
              </div>

              <div className="bg-[#13294b] p-6 rounded-lg">
                <p className="font-semibold mb-2">Community-Driven Growth</p>
                <p className="text-gray-300 text-sm">
                  A growing network where members actively support and uplift each other.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white text-[#0b1b34] py-20 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Join the NZSME Community
          </h2>
          <p className="mb-6">
            Be part of a trusted network where business leaders connect, learn, and grow together.
          </p>

          <a
            href="/apply"
            className="bg-[#0b1b34] text-white px-8 py-3 rounded-md font-medium"
          >
            Apply for Membership
          </a>
        </section>

        {/* FOOTER NOTE */}
        <section className="text-center text-gray-400 text-sm py-6 bg-[#0b1b34]">
          Strategic Media Partner: <span className="text-white font-medium">webfitnews.co.nz</span>
        </section>

      </main>
    </>
  );
}