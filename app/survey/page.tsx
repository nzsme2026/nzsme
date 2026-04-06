"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import BottomStatusBar from "@/components/BottomStatusBar";

export default function SurveyPage() {
  const [form, setForm] = useState<any>({
    full_name: "",
    email: "",
    company: "",
    role: "",
    industry: "",
    business_stage: "",
    team_size: "",
    goal: "",
    experience_level: "",
    importance: "",
    sessions: [],
    gains: [],
    problem: "",
  });

  const toggleArray = (field: string, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v: string) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.full_name || !form.email) {
      alert("Name and Email required");
      return;
    }

    const res = await fetch("/api/pre-event-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Failed to submit");
      return;
    }

    alert("Submitted successfully");
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-white rounded-lg shadow p-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold text-md">
              PRE-EVENT FEEDBACK FORM [ CommUNITEy Forrum Ltd]
            </h1>
            <img src="/Survey Logo.jpg" className="h-10" />
          </div>

          {/* BASIC INFO */}
          <div className="bg-blue-700 text-white px-4 py-2 rounded mb-4">
            Basic Information
          </div>

          <label className="text-sm font-medium">Full Name *</label>
          <input
            className="w-full border px-3 py-2 rounded mb-3"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />

          <label className="text-sm font-medium">Email *</label>
          <input
            className="w-full border px-3 py-2 rounded mb-3"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label className="text-sm font-medium">Company / Organisation</label>
          <input
            className="w-full border px-3 py-2 rounded mb-3"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />

          <label className="text-sm font-medium">Role</label>
          <select
            className="w-full border px-3 py-2 rounded mb-3"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option>Business Owner</option>
            <option>Manager</option>
            <option>Consultant</option>
          </select>

          <label className="text-sm font-medium">Industry</label>
          <select
            className="w-full border px-3 py-2 rounded mb-3"
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
          >
            <option value="">Select Industry</option>
            <option>Retail</option>
            <option>IT</option>
            <option>Finance</option>
          </select>

          <label className="text-sm font-medium">Business Stage</label>
          <div className="flex gap-4 mb-3 text-sm">
            {["Startup", "Growing", "Established"].map((v) => (
              <label key={v}>
                <input
                  type="radio"
                  name="stage"
                  onChange={() =>
                    setForm({ ...form, business_stage: v })
                  }
                />{" "}
                {v}
              </label>
            ))}
          </div>

          <label className="text-sm font-medium">Team Size</label>
          <div className="flex gap-4 mb-4 text-sm">
            {["Solo", "2-10", "50+"].map((v) => (
              <label key={v}>
                <input
                  type="radio"
                  name="team"
                  onChange={() =>
                    setForm({ ...form, team_size: v })
                  }
                />{" "}
                {v}
              </label>
            ))}
          </div>

          {/* EVENT EXPECTATIONS */}
          <div className="bg-blue-700 text-white px-4 py-2 rounded mb-4">
            Event Expectations
          </div>

          <label className="text-sm font-medium">
            What is your primary goal for attending?
          </label>
          <select
            className="w-full border px-3 py-2 rounded mb-3"
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
          >
            <option value="">Select Goal</option>
            <option>Networking</option>
            <option>Learning</option>
            <option>Business Growth</option>
          </select>

          <label className="text-sm font-medium">
            Your experience level in this domain?
          </label>
          <div className="flex gap-4 mb-3 text-sm">
            {["Beginner", "Intermediate", "Advanced"].map((v) => (
              <label key={v}>
                <input
                  type="radio"
                  name="exp"
                  onChange={() =>
                    setForm({ ...form, experience_level: v })
                  }
                />{" "}
                {v}
              </label>
            ))}
          </div>

          <label className="text-sm font-medium mb-1 block">
            How important is this event for you?
          </label>
          <div className="flex border rounded overflow-hidden mb-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`flex-1 py-2 border-r ${
                  form.importance === String(n)
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
                onClick={() =>
                  setForm({ ...form, importance: String(n) })
                }
              >
                {n}
              </button>
            ))}
          </div>

          <div className="text-xs flex justify-between mb-4 text-gray-500">
            <span>Not Important</span>
            <span>Very Important</span>
          </div>

          <label className="text-sm font-medium">
            Which sessions interest you most?
          </label>
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            {[
              "Government speakers",
              "Industry leaders talks",
              "Panel discussion",
              "Keynote talks",
              "Open networking",
              "Interactive Q&A",
            ].map((v) => (
              <label key={v}>
                <input
                  type="checkbox"
                  onChange={() => toggleArray("sessions", v)}
                />{" "}
                {v}
              </label>
            ))}
          </div>

          {/* FINAL */}
          <div className="bg-blue-700 text-white px-4 py-2 rounded mb-4">
            Final Thoughts
          </div>

          <label className="text-sm font-medium">
            What do you want to gain from this event?
          </label>
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            {[
              "Practical Knowledge",
              "New Contacts",
              "Business Opportunities & Career Growth",
              "Policy Clarity",
              "Inspiration & Personal Growth",
              "Networking & Relationship",
              "Learning & Professional Development",
            ].map((v) => (
              <label key={v}>
                <input
                  type="checkbox"
                  onChange={() => toggleArray("gains", v)}
                />{" "}
                {v}
              </label>
            ))}
          </div>

          <textarea
            placeholder="What is ONE specific problem you want solved?"
            className="w-full border px-3 py-2 rounded mb-4"
            value={form.problem}
            onChange={(e) =>
              setForm({ ...form, problem: e.target.value })
            }
          />

          <button className="w-full bg-blue-700 text-white py-3 rounded font-semibold">
            SUBMIT FORM
          </button>

          <div className="mt-4 text-sm font-medium">
            CommUNITEy Forum Ltd
          </div>

        </div>
      </form>

      <BottomStatusBar />
    </main>
  );
}