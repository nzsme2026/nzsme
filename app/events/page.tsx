"use client";

import Navbar from "@/components/Navbar";

export default function EventsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#0b1b34] text-white">

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            NZSME Upcoming Events
          </h1>
          <p className="text-gray-300">
            Join exclusive business events designed to connect, inform, and grow New Zealand’s SME community.
          </p>
        </section>

        {/* EVENT CARD */}
        <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT - DETAILS */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              NZSME Launch Event 2026
            </h2>

            <p className="text-gray-300 mb-6">
              A focused business event bringing together SME owners, industry leaders, and decision makers for meaningful conversations and real opportunities.
            </p>

            <div className="space-y-3 mb-6">
              <p><strong>Date:</strong> 13 April 2026</p>
              <p><strong>Time:</strong> 6:00 PM – 9:00 PM</p>
              <p><strong>Venue:</strong> JetPark Hotel Auckland Airport</p>
              <p className="text-gray-400 text-sm">
                63 Westney Road, Māngere, Auckland 2022
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <p>✔ No additional charges to attend the event</p>
              <p>✔ Priority access to a limited group</p>
              <p>✔ Opportunity to connect with NZ business leaders</p>
              <p>✔ Practical, real-world insights</p>
              <p>✔ Lucky draw entry with gift hampers</p>
            </div>

            <div className="space-y-3 mb-8">
              <p><strong>Email:</strong> nzsme2026@gmail.com</p>
              <p><strong>WhatsApp:</strong> 027 333 3300</p>
            </div>

            <a
              href="/apply"
              className="inline-block bg-white text-[#0b1b34] px-8 py-3 rounded-md font-semibold"
            >
              Register / Apply Now
            </a>
          </div>

          {/* RIGHT - POSTER */}
          <div>
            <img
              src="/event-main.jpg"
              alt="NZSME Event"
              className="rounded-xl shadow-lg"
            />
          </div>
        </section>

        {/* SECOND POSTER */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <img
            src="/event-details.jpg"
            alt="Event Details"
            className="rounded-xl shadow-lg mx-auto"
          />
        </section>

        {/* QR SECTION */}
        <section className="text-center pb-20">
          <h3 className="text-xl mb-4">Scan to Register</h3>
          <img
            src="/event-qr.png"
            alt="QR Code"
            className="mx-auto w-40"
          />
        </section>

      </main>
    </>
  );
}