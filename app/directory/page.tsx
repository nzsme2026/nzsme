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

function extractLocation(address?: string | null) {
  if (!address) return "Other";

  const value = address.toLowerCase();

  if (value.includes("auckland")) return "Auckland";
  if (value.includes("hamilton")) return "Hamilton";
  if (value.includes("wellington")) return "Wellington";
  if (value.includes("christchurch")) return "Christchurch";
  if (value.includes("tauranga")) return "Tauranga";
  if (value.includes("palmerston north")) return "Palmerston North";
  if (value.includes("rotorua")) return "Rotorua";
  if (value.includes("new plymouth")) return "New Plymouth";
  if (value.includes("napier")) return "Napier";
  if (value.includes("hastings")) return "Hastings";
  if (value.includes("whangarei")) return "Whangārei";
  if (value.includes("dunedin")) return "Dunedin";
  if (value.includes("queenstown")) return "Queenstown";
  if (value.includes("invercargill")) return "Invercargill";

  return "Other";
}

export default function DirectoryPage() {
  const [members, setMembers] = useState<DirectoryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        const cached = localStorage.getItem("directory_members");
        if (cached) {
          const parsed = JSON.parse(cached);
          setMembers(parsed);
          setLoading(false);
        }

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

  const locationOptions = useMemo(() => {
    const uniqueLocations = Array.from(
      new Set(members.map((member) => extractLocation(member.address)))
    ).sort((a, b) => a.localeCompare(b));

    return ["All", ...uniqueLocations];
  }, [members]);

  const filteredMembers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return members.filter((member) => {
      const category = mapCategory(member.category);
      const location = extractLocation(member.address);

      const matchesCategory =
        selectedCategory === "All" || category === selectedCategory;

      const matchesLocation =
        selectedLocation === "All" || location === selectedLocation;

      const text = [
        member.first_name,
        member.last_name,
        member.email,
        member.business_email,
        member.registered_business_name,
        member.trading_name,
        member.description,
        member.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !searchValue || text.includes(searchValue);

      return matchesCategory && matchesLocation && matchesSearch;
    });
  }, [members, search, selectedCategory, selectedLocation]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* HEADER */}
        <section className="bg-white border-b">
          <div className="mx-auto max-w-[1300px] px-6 py-10 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
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

        {/* FILTERS */}
        <section className="mx-auto max-w-[1300px] px-6 py-6">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_220px]">
            <input
              type="text"
              placeholder="Search businesses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
            >
              {locationOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* GRID */}
        <section className="mx-auto max-w-[1300px] px-6 pb-20">
          {loading && members.length === 0 ? (
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[220px] rounded-2xl bg-white animate-pulse border border-slate-200"
                />
              ))}
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center text-slate-500">
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