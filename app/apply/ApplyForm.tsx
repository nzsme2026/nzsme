"use client";

import Image from "next/image";
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

  const generateConfirmationId = () => {
    const prefix = formData.firstName.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    return `NZSME-${prefix}-${timestamp}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPaid) {
      alert("Please complete payment first.");
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.phone) {
      alert("First Name, Last Name and Mobile Number are required.");
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
        console.error("Submit API error:", result);
        alert("Something went wrong while submitting. Please try again.");
        return;
      }

      const id = generateConfirmationId();
      setConfirmationId(id);
      setSubmitted(true);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (kept inside Apply page to avoid layout issues) */}
      <header className="relative z-10 w-full border-b border-slate-200/70 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/NZSME.jpeg"
              alt="NZSME Logo"
              width={140}
              height={40}
              priority
            />
          </Link>

          {/* Nav */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
            <Link className="hover:text-white transition" href="/">
              Home
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-slate-200 hover:text-white transition md:inline-flex"
            >
              Login
            </Link>

            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto py-12 px-6">
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

            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-sm border space-y-8"
            >
              {/* PERSONAL DETAILS */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    placeholder="First Name *"
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                  />
                  <input
                    name="lastName"
                    placeholder="Last Name *"
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                  />
                  <input
                    name="phone"
                    placeholder="Mobile Number *"
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                  />
                </div>
              </div>

              {/* BUSINESS DETAILS */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Business Details</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Please fill these details fully so we can add you to our
                  directory.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="registeredBusinessName"
                    placeholder="Registered Business Name"
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                  />
                  <input
                    name="nzbn"
                    placeholder="NZBN Number"
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                  />
                  <input
                    name="tradingName"
                    placeholder="Trading As Name"
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                  />
                  <input
                    name="website"
                    placeholder="Website URL"
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                  />
                  <input
                    name="businessEmail"
                    placeholder="Business Email"
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                  />
                  <input
                    name="businessPhone"
                    placeholder="Business Phone"
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full"
                  />
                </div>

                <textarea
                  name="address"
                  placeholder="Business Address"
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full mt-4"
                />

                <textarea
                  name="description"
                  placeholder="Business Description"
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full mt-4"
                />

                <select
                  name="category"
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full mt-4"
                >
                  <option value="">Select Business Category</option>
                  <option>Retail</option>
                  <option>IT</option>
                  <option>Beauty Industry</option>
                  <option>Educational Coaches</option>
                  <option>Construction</option>
                  <option>Government</option>
                  <option>Legal Professionals</option>
                  <option>Real Estate</option>
                  <option>Hospitality</option>
                  <option>Health Practitioners</option>
                  <option>Import Export Wholesale</option>
                  <option>Digital Marketing</option>
                  <option>Car Dealers</option>
                  <option>Finance</option>
                  <option>Other</option>
                </select>

                <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm">
                  <p className="font-semibold mb-1">Business Logo Submission</p>
                  <p>
                    Please email your logo to{" "}
                    <strong>nzsme2026@gmail.com</strong>
                  </p>
                  <p>
                    Or WhatsApp to <strong>+64 27 333 3300</strong>
                  </p>
                </div>
              </div>

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
              <p className="text-sm text-gray-600">Confirmation ID</p>
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