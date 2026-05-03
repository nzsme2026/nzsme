"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function SponsorshipPage() {
  const [amount, setAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || amount < 250) return;

    setLoading(true);

    try {
      const res = await fetch("/api/sponsorship-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Payment failed");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  const tiers = [
    { amount: 250, label: "Starter Support" },
    { amount: 500, label: "Growth Support" },
    { amount: 1000, label: "Strategic Support" },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="max-w-5xl mx-auto">

          {/* HERO */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-semibold text-slate-900 mb-4">
              Sponsorship & Strategic Support
            </h1>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              NZSME is building a trusted, nationwide network of business leaders.
              Sponsorship is an opportunity to support this movement while gaining meaningful visibility.
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-10 mb-14">

            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">
                What You Gain
              </h2>

              <ul className="space-y-3 text-slate-700">
                <li>• Presence across NZSME platforms</li>
                <li>• Recognition in communications</li>
                <li>• Visibility at events and workshops</li>
                <li>• Media exposure via Webfit News</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">
                What Your Support Enables
              </h2>

              <ul className="space-y-3 text-slate-700">
                <li>• Business networking and workshops</li>
                <li>• SME growth initiatives</li>
                <li>• Expansion of a verified directory</li>
              </ul>
            </div>

          </div>

          {/* CONTRIBUTION */}
          <div className="bg-white border rounded-2xl p-8 shadow-sm">

            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Make a Contribution
            </h3>

            <p className="text-sm text-slate-600 mb-6">
              Select a support level or enter your own contribution.
            </p>

            {/* PRESET OPTIONS */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {tiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => setAmount(tier.amount)}
                  className={`border rounded-xl p-4 text-center transition ${
                    amount === tier.amount
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <p className="text-sm font-semibold">{tier.label}</p>
                  <p className="text-xs text-slate-500">Suggested level</p>
                </button>
              ))}
            </div>

            {/* SHOW SELECTED AMOUNT */}
            {amount && amount >= 250 && (
              <div className="mb-4 text-center">
                <p className="text-lg font-semibold text-emerald-700">
                  Selected Contribution: ${amount}
                </p>
              </div>
            )}

            {/* CUSTOM INPUT */}
            <input
              type="number"
              placeholder="Enter your contribution amount"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border rounded-md px-4 py-3 mb-2"
            />

            {amount !== null && amount < 250 && (
              <p className="text-red-600 text-sm mb-4">
                Minimum contribution is $250
              </p>
            )}

            {/* CTA */}
            <button
              disabled={!amount || amount < 250 || loading}
              onClick={handlePayment}
              className={`w-full py-3 rounded-md font-semibold transition ${
                !amount || amount < 250 || loading
                  ? "bg-gray-300 text-gray-500"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {loading ? "Redirecting..." : "Proceed to Payment"}
            </button>

            {/* TRUST */}
            <p className="text-xs text-slate-500 mt-4 text-center">
              Secure payment powered by Stripe.
            </p>

          </div>

          {/* THANK YOU */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-600">
              Thank you for supporting the growth of NZSME.
            </p>
          </div>

          {/* FOOTNOTE */}
          <p className="text-sm text-slate-500 mt-6 text-center">
            All sponsorship engagements are managed under NZSME governance principles ensuring transparency and fairness.
          </p>

        </div>
      </main>
    </>
  );
}