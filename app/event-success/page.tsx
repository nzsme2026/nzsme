"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function EventSuccessPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-md p-8 text-center">

          <div className="mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-2xl text-emerald-600">✓</span>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-slate-900 mb-3">
            Payment Successful
          </h1>

          <p className="text-slate-600 mb-6">
            Your registration has been successfully confirmed.
            A confirmation email will be sent shortly.
          </p>

          <div className="space-y-3">

            <Link
              href="/events"
              className="block w-full bg-emerald-600 text-white py-3 rounded-md font-semibold hover:bg-emerald-700"
            >
              View Events
            </Link>

            <Link
              href="/"
              className="block w-full border border-slate-300 py-3 rounded-md font-semibold text-slate-700 hover:bg-slate-100"
            >
              Back to Home
            </Link>

          </div>

        </div>
      </main>
    </>
  );
}