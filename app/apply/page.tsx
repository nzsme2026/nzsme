"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const isPaid = searchParams.get("paid") === "true";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    businessName: "",
    nzbn: "",
    tradingName: "",
    website: "",
    businessEmail: "",
    businessPhone: "",
    address: "",
    description: "",
    category: "",
    logo: null as File | null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePayment = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });
    const data = await res.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!isPaid) {
      alert("Please complete payment first.");
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.phone) {
      alert("First name, Last name and Mobile number are required.");
      return;
    }

    alert("Application submitted successfully.");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="bg-[#1f2937] text-white px-8 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold bg-black px-3 py-1 text-sm">
          NZSME
        </Link>

        <div className="space-x-6 hidden md:flex">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          
        </div>

        <div className="space-x-4">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </nav>

      {/* FORM SECTION */}
      <div className="max-w-4xl mx-auto py-12 px-6">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">
            NZSME - Membership Request
          </h1>

          
        </div>

        {!isPaid && (
          <div className="mb-10 p-6 bg-white border rounded-lg text-center shadow-sm">
            <h2 className="text-lg font-semibold mb-2">
              Membership Fee - $60 NZD / Year
            </h2>
            <button
              onClick={handlePayment}
              className="bg-black text-white px-6 py-2 rounded hover:opacity-90"
            >
              Pay & Continue
            </button>
          </div>
        )}

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* PERSONAL DETAILS */}
            <div>
              <h2 className="text-xl font-semibold mb-6">
                Personal Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <input
                  type="text"
                  name="firstName"
                  placeholder="First name *"
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name *"
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number *"
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email (optional)"
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>
            </div>

            {/* BUSINESS DETAILS */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Business Details
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Please fill these details fully so we can add to our online platforms.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <input name="businessName" placeholder="Registered Business Name" onChange={handleChange} className="border rounded-lg p-3 w-full" />
                <input name="nzbn" placeholder="NZBN Number" onChange={handleChange} className="border rounded-lg p-3 w-full" />
                <input name="tradingName" placeholder="Trading As Name" onChange={handleChange} className="border rounded-lg p-3 w-full" />
                <input name="website" placeholder="Website URL" onChange={handleChange} className="border rounded-lg p-3 w-full" />
                <input name="businessEmail" placeholder="Business Email" onChange={handleChange} className="border rounded-lg p-3 w-full" />
                <input name="businessPhone" placeholder="Business Phone Number" onChange={handleChange} className="border rounded-lg p-3 w-full" />

                <textarea name="address" placeholder="Business Address" onChange={handleChange} className="border rounded-lg p-3 w-full col-span-1 md:col-span-2" />
                <textarea name="description" placeholder="Business Description" onChange={handleChange} className="border rounded-lg p-3 w-full col-span-1 md:col-span-2" />

                <select
                  name="category"
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                >
                  <option value="">Business Category</option>
                  <option value="Health Practitioners">Health Practitioners</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Educational Coaches">Educational Coaches</option>
                  <option value="Retail">Retail</option>
                  <option value="Construction">Construction</option>
                  <option value="Legal Professionals">Legal Professionals</option>
                  <option value="Government">Government</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Import Export Wholesale">Import Export Wholesale</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Beauty Industry">Beauty Industry</option>
                  <option value="Car Dealers">Car Dealers</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="file"
                  name="logo"
                  disabled={!isPaid}
                  onChange={handleChange}
                  className="border rounded-lg p-3 w-full"
                />
              </div>
            </div>

            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={!isPaid}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg disabled:bg-gray-400 hover:opacity-90"
              >
                Submit Application
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}