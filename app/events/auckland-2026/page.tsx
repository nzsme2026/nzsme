import Navbar from "@/components/Navbar";

export default function AucklandEventPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white">

        {/* HERO */}
        <section className="bg-[#0b1b34] text-white py-16 text-center">
          <h1 className="text-4xl font-semibold mb-2">
            Auckland Launch Event 2026
          </h1>
          <p className="text-gray-300">
            13 April 2026 • JetPark Hotel Auckland Airport
          </p>
        </section>

        {/* SUMMARY */}
        <section className="max-w-5xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-600">
            A full house event bringing together SME owners, policymakers, and business leaders to officially launch NZSME in New Zealand.
          </p>
        </section>

        {/* POSTER */}
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <img
            src="/auckland-poster.jpg"
            alt="NZSME Auckland Launch"
            className="rounded-xl shadow-lg mx-auto"
          />
        </section>

        {/* VIDEO COMING SOON */}
        <section className="max-w-4xl mx-auto px-6 pb-12 text-center">
          <div className="bg-gray-100 rounded-xl py-16">
            <h3 className="text-xl font-semibold mb-2">
              Event Highlight Video
            </h3>
            <p className="text-gray-500 text-sm">
              Coming soon
            </p>
          </div>
        </section>

        {/* MEDIA & COVERAGE */}
        <section className="max-w-4xl mx-auto px-6 pb-12 text-center">
          <h2 className="text-2xl font-semibold mb-6">
            Media & Coverage
          </h2>

          <div className="space-y-4">

            <a
              href="https://webfitnews.com/nzsme-launch-auckland-2026-sme-network-new-zealand/"
              target="_blank"
              className="block text-blue-600 underline"
            >
              Read Full Coverage on Webfit News →
            </a>

            <a
              href="https://www.facebook.com/share/p/1Kyn5hLesP/?mibextid=wwXIfr"
              target="_blank"
              className="block text-blue-600 underline"
            >
              View Event Highlights (Facebook) →
            </a>

            <a
              href="https://www.facebook.com/share/p/1VrygMdqfb/?mibextid=wwXIfr"
              target="_blank"
              className="block text-blue-600 underline"
            >
              Post Event Update →
            </a>

          </div>
        </section>

        {/* PHOTO GALLERY */}
        <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
          <img src="/auckland1.jpg" alt="Event Photo 1" className="rounded-lg" />
          <img src="/auckland2.jpg" alt="Event Photo 2" className="rounded-lg" />
          <img src="/auckland3.jpg" alt="Event Photo 3" className="rounded-lg" />
        </section>

        {/* CTA */}
        <section className="text-center pb-20">
          <h2 className="text-2xl mb-4">
            Next Event: Hamilton
          </h2>

          <a
            href="/apply"
            className="bg-[#0b1b34] text-white px-6 py-3 rounded-md"
          >
            Register Now
          </a>
        </section>

      </main>
    </>
  );
}