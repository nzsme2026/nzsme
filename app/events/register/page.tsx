"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function EventRegistrationPage() {
  const [type, setType] = useState<"member" | "non-member" | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(""); // 🔥 NEW

  const [membershipId, setMembershipId] = useState("");
  const [isValidMemberId, setIsValidMemberId] = useState(false);

  const [loading, setLoading] = useState(false);

  const pricing = {
    member: 5,
    "non-member": 20,
  };

  const selectedAmount = type ? pricing[type] : 0;

  // 🔒 STRICT VALIDATION
  const validateMembershipId = (value: string) => {
    const v = value.trim().toUpperCase();

    if (!v.startsWith("NZSME-") && !v.startsWith("NGSME-")) return false;

    const parts = v.split("-");
    if (parts.length !== 4) return false;

    if (parts[1].length !== 8) return false;
    if (parts[3].length !== 4) return false;

    return true;
  };

  const handleMembershipChange = (value: string) => {
    setMembershipId(value);
    setIsValidMemberId(validateMembershipId(value));
  };

  const handlePayment = async () => {
    if (!type) return;

    if (!name.trim() || !email.trim() || !city.trim()) {
      alert("Please enter name, email and city");
      return;
    }

    if (type === "member" && !isValidMemberId) {
      alert("Invalid membership ID");
      return;
    }

    setLoading(true);

    try {
      const cleanCity =
        city.trim().charAt(0).toUpperCase() +
        city.trim().slice(1).toLowerCase();

      const res = await fetch("/api/event-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          city: cleanCity, // 🔥 SEND TO API
          membershipId: type === "member" ? membershipId : null,
          type,
          amount: selectedAmount,
          eventName: "NZSME Workshop",
        }),
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

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-6 py-16">
        <div className="max-w-3xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold text-slate-900 mb-3">
              Workshop & Seminar Registration
            </h1>

            <p className="text-slate-600">
              Register for NZSME workshops, networking sessions, and business events.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-8 shadow-sm">

            {/* NAME + EMAIL */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md px-4 py-2"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md px-4 py-2"
              />
            </div>

            {/* CITY 🔥 NEW */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="City (e.g. Hamilton)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border rounded-md px-4 py-2"
              />
            </div>

            {/* OPTIONS */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">

              <button
                onClick={() => setType("member")}
                className={`border rounded-xl p-5 text-center transition ${
                  type === "member"
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <p className="font-semibold">Member Access</p>
                <p className="text-sm text-slate-500">$10 entry</p>
              </button>

              <button
                onClick={() => {
                  setType("non-member");
                  setMembershipId("");
                  setIsValidMemberId(false);
                }}
                className={`border rounded-xl p-5 text-center transition ${
                  type === "non-member"
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <p className="font-semibold">Non-Member Access</p>
                <p className="text-sm text-slate-500">$20 entry</p>
              </button>

            </div>

            {/* MEMBER ID */}
            {type === "member" && (
              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Membership ID
                </label>

                <input
                  type="text"
                  value={membershipId}
                  onChange={(e) => handleMembershipChange(e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                />

                {!isValidMemberId && membershipId.length > 0 && (
                  <p className="text-red-600 text-xs mt-2">
                    Invalid membership ID
                  </p>
                )}
              </div>
            )}

            {/* SELECTED */}
            {type && (
              <div className="mb-4 text-center">
                <p className="text-lg font-semibold text-emerald-700">
                  Selected: {type === "member" ? "Member" : "Non-Member"} (${selectedAmount})
                </p>
              </div>
            )}

            {/* CTA */}
            <button
              disabled={
                !type ||
                loading ||
                !name.trim() ||
                !email.trim() ||
                !city.trim() ||
                (type === "member" && !isValidMemberId)
              }
              onClick={handlePayment}
              className={`w-full py-3 rounded-md font-semibold ${
                !type ||
                loading ||
                !name.trim() ||
                !email.trim() ||
                !city.trim() ||
                (type === "member" && !isValidMemberId)
                  ? "bg-gray-300 text-gray-500"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {loading ? "Redirecting..." : "Proceed to Payment"}
            </button>

            <p className="text-xs text-slate-500 mt-4 text-center">
              Secure payment powered by Stripe.
            </p>

          </div>

        </div>
      </main>
    </>
  );
}