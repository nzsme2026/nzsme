import Navbar from "@/components/Navbar";
import BottomStatusBar from "@/components/BottomStatusBar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb]">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* 🔹 ABOUT NZSME */}
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold text-slate-900">
            About NZSME
          </h1>

          <p className="mt-6 text-slate-600 leading-7">
            The NZSME Nationwide Initiative is a dedicated advocacy group committed to empowering and supporting businesses across New Zealand. Our mission is to create an inclusive ecosystem that fosters growth, innovation, and sustainability for enterprises of all sizes and sectors.
          </p>

          <p className="mt-4 text-slate-600 leading-7">
            We provide targeted support and representation for youth startups, women entrepreneurs, SMEs, and emerging businesses by enabling access to networks, mentorship, and growth opportunities.
          </p>

          <p className="mt-4 text-slate-600 leading-7">
            Our objective is to advocate for business-friendly policies, facilitate collaboration across industries, and create pathways for innovation, funding, and long-term success.
          </p>
        </div>

        {/* 🔹 LEADERSHIP */}
        <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">

          {/* Image */}
          <div>
            <img
              src="/grp.jpeg"
              alt="Shailesh Bagwe"
              className="rounded-xl shadow-lg"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Shailesh Bagwe
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Founder & Community Leader
            </p>

            <p className="mt-4 text-slate-600 leading-7">
              Shailesh Bagwe is the driving force behind the NZSME Nationwide Initiative, focused on empowering businesses across New Zealand through connection, collaboration, and opportunity.
            </p>

            <p className="mt-4 text-slate-600 leading-7">
              With experience across ventures including NZ World News, Seagold Solutions, Aotūroa Academy, CommUNITEy Forum, and Rising Star, he brings together business, media, and community ecosystems to create real impact.
            </p>

            <p className="mt-4 text-slate-600 leading-7">
              His vision is to enable, empower, and expand businesses by building a stronger, more connected SME community across New Zealand.
            </p>

            <a
              href="https://www.linkedin.com/in/shaileshbagwe/"
              target="_blank"
              className="inline-block mt-6 bg-slate-900 text-white px-5 py-3 rounded-md text-sm font-semibold"
            >
              View LinkedIn Profile
            </a>
          </div>

        </div>

        {/* 🔥 ASSOCIATED VENTURES */}
        <div className="mt-20 text-center">

          <h3 className="text-2xl font-semibold text-slate-900">
            Associated Ventures & Initiatives
          </h3>

          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            A network of initiatives led by Shailesh Bagwe across media, business, and community platforms in New Zealand.
          </p>

          <div className="mt-8 flex justify-center">
            <img
              src="/Shailesh Companies.jpg"
              alt="Shailesh Ventures"
              className="max-w-full md:max-w-4xl rounded-xl shadow-md"
            />
          </div>

        </div>

        {/* 🔥 STRATEGIC MEDIA PARTNER */}
        <div className="mt-20 text-center">

          <h3 className="text-xl font-semibold text-slate-900">
            Strategic Media Partner
          </h3>

          <p className="mt-3 text-slate-500">
            NZSME is proudly supported by Webfit News as its strategic media partner, helping amplify community voices and business stories across New Zealand.
          </p>

          <div className="mt-6 flex justify-center">
            <img
              src="/webfitnews-logo.png"
              alt="Webfit News"
              className="h-12"
            />
          </div>

        </div>

      </section>

      <BottomStatusBar />
    </main>
  );
}