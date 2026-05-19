"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ApplyForm({ isPaid }: { isPaid: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    registeredBusinessName: "",
    nzbn: "",
    tradingName: "",
    website: "",
    businessEmail: "",
    businessPhone: "",
    address: "",
    description: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isPaid) {
      setErrorMsg("Please complete payment first.");
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.phone) {
      setErrorMsg("First Name, Last Name and Mobile Number are required.");
      return;
    }

    try {
      const res = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.error || "Something went wrong.");
        return;
      }

      setConfirmationId(result.confirmationId);
      setSubmitted(true);

    } catch (error) {
      setErrorMsg("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="relative z-10 w-full border-b border-slate-200/70 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/NZSME.jpeg"
              alt="NZSME Logo"
              width={140}
              height={40}
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-slate-200 hover:text-white md:inline-flex"
            >
              Login
            </Link>

            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto py-12 px-6">
        {!submitted ? (
          <>
            {/* PAYMENT BLOCK */}
            {!isPaid && (
              <div className="mb-10 p-6 bg-white border rounded-lg text-center shadow-sm">
                <h2 className="text-lg font-semibold mb-2">
                  Membership Fee - $60 NZD / Year
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                  Please complete payment to unlock the application form.
                </p>

                <button
                  onClick={handlePayment}
                  className="bg-black text-white px-6 py-2 rounded"
                >
                  Pay & Continue
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
                {errorMsg}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className={`bg-white p-8 rounded-xl shadow-sm border space-y-8 ${
                !isPaid ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {/* PERSONAL */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <input name="firstName" placeholder="First Name *" onChange={handleChange} className="border p-3 rounded" />
                  <input name="lastName" placeholder="Last Name *" onChange={handleChange} className="border p-3 rounded" />
                  <input name="phone" placeholder="Mobile Number *" onChange={handleChange} className="border p-3 rounded" />
                  <input name="email" placeholder="Email" onChange={handleChange} className="border p-3 rounded" />
                </div>
              </div>
              {/* CITY DROPDOWN */}
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">
    City <span className="text-red-500">*</span>
  </label>

  <select
    name="city"
    required
    className="w-full border rounded-md px-3 py-2"
    value={formData.city || ""}
    onChange={handleChange}
  >
    <option value="">Select City</option>
    <option value="Auckland">Auckland</option>
    <option value="Hamilton">Hamilton</option>
    <option value="Christchurch">Christchurch</option>
    <option value="Wellington">Wellington</option>
    <option value="Nelson">Nelson</option>
    <option value="Tauranga">Tauranga</option>
    <option value="Whakatāne">Whakatāne</option>
  </select>
</div>
               
              {/* BUSINESS */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Business Details</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <input name="registeredBusinessName" placeholder="Registered Business Name" onChange={handleChange} className="border p-3 rounded" />
                  <input name="nzbn" placeholder="NZBN Number" onChange={handleChange} className="border p-3 rounded" />
                  <input name="tradingName" placeholder="Trading Name" onChange={handleChange} className="border p-3 rounded" />
                  <input name="website" placeholder="Website URL" onChange={handleChange} className="border p-3 rounded" />
                  <input name="businessEmail" placeholder="Business Email" onChange={handleChange} className="border p-3 rounded" />
                  <input name="businessPhone" placeholder="Business Phone" onChange={handleChange} className="border p-3 rounded" />
                </div>

                <textarea name="address" placeholder="Address" onChange={handleChange} className="border p-3 rounded w-full mt-4" />
                <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-3 rounded w-full mt-4" />

                <select name="category" onChange={handleChange} className="border p-3 rounded w-full mt-4">
                  <option value="">Select Category</option>
                  <option>Retail</option>
                  <option>IT</option>
                  <option>Finance</option>
                  <option>Construction</option>
                  <option>Hospitality</option>
                  <option>Other</option>
                </select>

                <div className="mt-6 p-4 bg-gray-100 rounded text-sm">
                  Email logo to <strong>nzsme2026@gmail.com</strong> or WhatsApp <strong>+64 27 333 3300</strong>
                </div>
              </div>
              {/* MEMBERSHIP AGREEMENT */}
              <div className="border rounded-xl p-5 bg-slate-50">
                <h2 className="text-xl font-semibold mb-4">
                  Membership Agreement
                </h2>

                <label className="flex gap-3 items-start text-sm text-slate-700">
                  <input
                    type="checkbox"
                    required
                    className="mt-1"
                  />

                  <span>
                    I agree to NZSME{" "}
                    <Link
                      href="/terms-and-conditions"
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Terms & Conditions
                    </Link>
                    , confirm that I have read the{" "}
                    <Link
                      href="/membership-guidelines"
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Membership Guidelines
                    </Link>
                    , and understand that WhatsApp/Facebook groups are informal
                    communication channels only and are not official legal or
                    governance communication channels.
                  </span>
                </label>
              </div>
              {/* SUBMIT BUTTON FIXED */}
              <button
                type="submit"
                disabled={!isPaid}
                className={`px-6 py-3 rounded text-white font-semibold ${
                  isPaid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
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
              <p className="text-sm text-gray-600">Confirmation ID</p>
              <p className="text-xl font-bold">{confirmationId}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}