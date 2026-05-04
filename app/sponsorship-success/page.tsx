"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SponsorshipSuccessPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-xl w-full bg-white border rounded-2xl p-10 text-center shadow-sm">

          <h1 className="text-3xl font-semibold text-emerald-600 mb-4">
            Payment Successful
          </h1>

          <p className="text-slate-700 mb-6">
            Thank you for your support.
          </p>

          <p className="text-slate-600 text-sm mb-8">
            Your sponsorship contribution has been successfully received.
            We truly appreciate your support in building a stronger SME ecosystem across New Zealand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700"
            >
              Go to Home
            </Link>

            <Link
              href="/events"
              className="border border-slate-300 px-6 py-3 rounded-md font-semibold hover:bg-slate-100"
            >
              View Events
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}