"use client";

import Link from "next/link";
import { useState } from "react";

export default function ApplyForm({ isPaid }: { isPaid: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  const generateConfirmationId = () => {
    const prefix = formData.firstName.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    return `NZSME-${prefix}-${timestamp}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPaid) {
      alert("Please complete payment first.");
      return;
    }

    const id = generateConfirmationId();
    setConfirmationId(id);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#1f2937] text-white px-8 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold bg-black px-3 py-1 text-sm">
          NZSME
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-6">
        {!submitted ? (
          <>
            {!isPaid && (
              <div className="mb-10 p-6 bg-white border rounded-lg text-center shadow-sm">
                <h2 className="text-lg font-semibold mb-2">
                  Membership Fee - $60 NZD / Year
                </h2>
                <button
                  onClick={handlePayment}
                  className="bg-black text-white px-6 py-2 rounded"
                >
                  Pay & Continue
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border space-y-6">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />

              <button
                type="submit"
                disabled={!isPaid}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg disabled:bg-gray-400"
              >
                Submit Application
              </button>
            </form>
          </>
        ) : (
          <div className="bg-white p-10 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Membership Application Submitted
            </h2>

            <p className="mb-4">
              Thank you <strong>{formData.firstName}</strong>
            </p>

            <div className="bg-gray-100 p-4 rounded-lg inline-block">
              <p className="text-sm text-gray-600">
                Confirmation ID
              </p>
              <p className="text-xl font-bold text-slate-900">
                {confirmationId}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}