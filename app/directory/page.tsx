"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import DirectoryCard from "@/components/DirectoryCard";

type DirectoryMember = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
  registered_business_name?: string | null;
  nzbn?: string | null;
  trading_name?: string | null;
  website?: string | null;
  business_email?: string | null;
  business_phone?: string | null;
  address?: string | null;
  description?: string | null;
  category?: string | null;
};

const CATEGORY_OPTIONS = [
  "All",
  "Retail",
  "IT",
  "Finance",
  "Construction",
  "Hospitality",
  "Other",
];

function mapCategory(raw?: string | null) {
  const value = (raw || "").toLowerCase().trim();

  if (!value) return "Other";
  if (value.includes("ai") || value.includes("tech") || value.includes("it")) return "IT";
  if (value.includes("finance") || value.includes("accounting") || value.includes("tax")) return "Finance";
  if (value.includes("retail")) return "Retail";
  if (value.includes("construction")) return "Construction";
  if (value.includes("hospitality")) return "Hospitality";

  return "Other";
}

export default function DirectoryPage() {
  const [members, setMembers] = useState<DirectoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        // 🔥 cache first (instant load)
        const cached = localStorage.getItem("directory_members");
        if (cached) {
          setMembers(JSON.parse(cached));
          setLoading(false);
        }

        // 🔥 fetch fresh in background
        const res = await fetch("/api/directory-members");
        const data = await res.json();

        if (data.members) {
          setMembers(data.members);
          localStorage.setItem("directory_members", JSON.stringify(data.members));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectory();
  }, []);

  const filteredMembers = useMemo(() => {
    const searchValue = search.toLowerCase();

    return members.filter((member) => {
      const category = mapCategory(member.category);

      const matchesCategory =
        selectedCategory === "All" || category === selectedCategory;

      const text = [
        member.first_name,
        member.last_name,
        member.email,
        member.business_email,
        member.registered_business_name,
        member.trading_name,
        member.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !searchValue || text.includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [members, search, selectedCategory]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* HEADER */}
        <section className="bg-white border-b">
          <div className="mx-auto max-w-[1300px] px-6 py-10 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">
                Business Directory
              </h1>
              <p className="text-slate-600">
                Explore verified NZSME member businesses
              </p>
            </div>

            <div className="text-sm text-slate-500">
              {filteredMembers.length} businesses
            </div>
          </div>
        </section>

        {/* FILTER */}
        <section className="mx-auto max-w-[1300px] px-6 py-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search businesses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-xl border px-4 py-3"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-60 rounded-xl border px-4 py-3"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </section>

        {/* GRID */}
        <section className="mx-auto max-w-[1300px] px-6 pb-20">

          {/* 🔥 No blank screen anymore */}
          {loading && members.length === 0 ? (
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {[1,2,3].map((i) => (
                <div key={i} className="h-[220px] rounded-2xl bg-white animate-pulse border" />
              ))}
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              No businesses found
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {filteredMembers.map((m) => (
                <DirectoryCard key={m.id} member={m} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}