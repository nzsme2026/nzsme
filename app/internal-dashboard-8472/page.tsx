"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = "Zaq1@wsx";

  const handleLogin = async () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      fetchMembers();
    } else {
      alert("Wrong password");
    }
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin-members");
      const data = await res.json();
      setMembers(data.members || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
      {/* ✅ SAME HEADER AS HOMEPAGE */}
      <Navbar />

      {!authenticated ? (
        <div className="flex h-[80vh] items-center justify-center">
          <div className="p-6 border rounded-lg shadow-md bg-white">
            <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
            <input
              type="password"
              placeholder="Enter password"
              className="border p-2 w-full mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="bg-black text-white px-4 py-2 w-full"
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Members</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">First Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">{m.first_name}</td>
                      <td className="p-3">{m.email}</td>
                      <td className="p-3">{m.phone || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}