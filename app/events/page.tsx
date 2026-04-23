"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function AucklandEventPage() {
  const images = Array.from({ length: 25 }, (_, i) => `/Auckland event Pic (${i + 1}).jpeg`);

  // Exact filenames from your updated Auckland-Logo folder
  const memberLogos = [
    "/Auckland-Logo/ABC(1).jpg",
    "/Auckland-Logo/ABC(1).png",
    "/Auckland-Logo/ABC(2).jpeg",
    "/Auckland-Logo/ABC(2).jpg",
    "/Auckland-Logo/ABC(2).png",
    "/Auckland-Logo/ABC(3).jpeg",
    "/Auckland-Logo/ABC(3).jpg",
    "/Auckland-Logo/ABC(3).png",
    "/Auckland-Logo/ABC(4).jpeg",
    "/Auckland-Logo/ABC(4).jpg",
    "/Auckland-Logo/ABC(4).png",
    "/Auckland-Logo/ABC(5).jpeg",
    "/Auckland-Logo/ABC(5).jpg",
    "/Auckland-Logo/ABC(5).png",
    "/Auckland-Logo/ABC(6).jpeg",
    "/Auckland-Logo/ABC(6).jpg",
    "/Auckland-Logo/ABC(6).png",
    "/Auckland-Logo/ABC(7).jpeg",
    "/Auckland-Logo/ABC(7).jpg",
    "/Auckland-Logo/ABC(7).png",
    "/Auckland-Logo/ABC(8).jpeg",
    "/Auckland-Logo/ABC(8).jpg",
    "/Auckland-Logo/ABC(8).png",
    "/Auckland-Logo/ABC(9).jpeg",
    "/Auckland-Logo/ABC(9).jpg",
    "/Auckland-Logo/ABC(10).jpeg",
    "/Auckland-Logo/ABC(10).jpg",
    "/Auckland-Logo/ABC(11).jpeg",
    "/Auckland-Logo/ABC(11).jpg",
    "/Auckland-Logo/ABC(12).jpeg",
    "/Auckland-Logo/ABC(12).jpg",
    "/Auckland-Logo/ABC(13).jpeg",
    "/Auckland-Logo/ABC(14).jpeg",
    "/Auckland-Logo/ABC(15).jpeg",
    "/Auckland-Logo/ABC(16).jpeg",
    "/Auckland-Logo/ABC(17).jpeg",
    "/Auckland-Logo/ABC(18).jpeg",
    "/Auckland-Logo/ABC(19).jpeg",
    "/Auckland-Logo/ABC(20).jpeg",
    "/Auckland-Logo/ABC(21).jpeg",
    "/Auckland-Logo/ABC(22).jpeg",
    "/Auckland-Logo/ABC(23).jpeg",
    "/Auckland-Logo/ABC(24).jpeg",
    "/Auckland-Logo/ABC.jpeg",
  ];

  const [imageIndex, setImageIndex] = useState(0);
  const [logoStartIndex, setLogoStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoStartIndex((prev) => (prev + 1) % memberLogos.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [memberLogos.length]);

  const visibleLogos = Array.from({ length: 4 }, (_, i) => {
    return memberLogos[(logoStartIndex + i) % memberLogos.length];
  });

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* HERO */}
        <section className="bg-[#0b1b34] text-white py-16 text-center">
          <h1 className="text-4xl font-semibold mb-2">Auckland Launch Event 2026</h1>
          <p className="text-gray-300">13 April 2026 • JetPark Hotel Auckland Airport</p>
        </section>

        {/* SUMMARY */}
        <section className="max-w-4xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-600 text-lg">
            A full house event bringing together SME owners, policymakers, and business leaders.
            This marked the official launch of NZSME in New Zealand.
          </p>
        </section>

        {/* VIDEO PLACEHOLDER */}
        <section className="max-w-4xl mx-auto px-6 pb-12 text-center">
          <div className="bg-gray-100 rounded-xl py-20">
            <h3 className="text-xl font-semibold mb-2">Event Highlight Video</h3>
            <p className="text-gray-500 text-sm">Coming soon</p>
          </div>
        </section>

        {/* MEDIA & COVERAGE */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Media & Coverage</h2>

          <div className="space-y-5">
            <a
              href="https://webfitnews.com/nzsme-launch-auckland-2026-sme-network-new-zealand/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 p-4 border bg-green-50 border-green-200 rounded-xl hover:shadow transition"
            >
              <img
                src="/Auckland event Pic (6).jpeg"
                alt="Webfit News coverage"
                className="w-28 h-20 object-cover rounded-md shrink-0"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  NZSME Launch Auckland 2026: Full House Signals Strong SME Momentum
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Read the full Webfit News coverage of the Auckland launch event.
                </p>
                <p className="text-xs text-gray-500 mt-2">webfitnews.com</p>
              </div>
            </a>

            <a
              href="https://www.facebook.com/share/p/1Kyn5hLesP/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 p-4 border rounded-xl hover:shadow transition"
            >
              <img
                src="/Auckland event Pic (10).jpeg"
                alt="Facebook highlights"
                className="w-28 h-20 object-cover rounded-md shrink-0"
              />
              <div>
                <h3 className="font-semibold text-gray-900">Event Highlights (Facebook)</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Key moments and audience engagement from the Auckland launch.
                </p>
                <p className="text-xs text-gray-500 mt-2">facebook.com</p>
              </div>
            </a>

            <a
              href="https://www.facebook.com/share/p/1VrygMdqfb/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 p-4 border rounded-xl hover:shadow transition"
            >
              <img
                src="/Auckland event Pic (15).jpeg"
                alt="Post event update"
                className="w-28 h-20 object-cover rounded-md shrink-0"
              />
              <div>
                <h3 className="font-semibold text-gray-900">Post Event Update</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Follow-up update shared after the successful Auckland event.
                </p>
                <p className="text-xs text-gray-500 mt-2">facebook.com</p>
              </div>
            </a>
          </div>
        </section>

        {/* EVENT HIGHLIGHTS SLIDESHOW */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <h2 className="text-2xl font-semibold mb-6 text-center">Event Highlights</h2>

          <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-black rounded-xl shadow-lg overflow-hidden">
            <img
              src={images[imageIndex]}
              alt="Event highlight"
              className="max-h-full max-w-full object-contain transition-all duration-700"
            />
          </div>

          <div className="flex justify-center mt-4 gap-2 flex-wrap">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === imageIndex ? "bg-[#0b1b34]" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </section>

        {/* OFFICIAL POSTER */}
        <section className="max-w-5xl mx-auto px-6 pb-20 text-center">
          <h2 className="text-2xl font-semibold mb-6">Official Launch Poster</h2>

          <img
            src="/NZSME Auckland Event Poster FINAL POSTER.png"
            alt="Official launch poster"
            className="rounded-xl shadow-lg mx-auto max-h-[700px] object-contain"
          />
        </section>

        {/* MEMBER LOGOS */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-semibold mb-3">Our Valued Members</h2>
            <p className="text-gray-500 mb-8">
              Proudly showcasing businesses that are part of the NZSME network.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {visibleLogos.map((logo, i) => (
                <div
                  key={`${logoStartIndex}-${i}`}
                  className="h-24 bg-white rounded-xl shadow flex items-center justify-center p-4"
                >
                  <img
                    src={logo}
                    alt={`Member logo ${i + 1}`}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pb-20 pt-16">
          <h2 className="text-2xl mb-4">Next Event: Hamilton</h2>
          <p className="mb-6 text-gray-600">
            25 May 2026 • 6 PM – 9 PM • JetPark Hotel Auckland Airport
          </p>
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