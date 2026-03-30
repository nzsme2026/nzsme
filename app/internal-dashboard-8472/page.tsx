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
      alert("Failed to load members");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />

      {!authenticated ? (
        <div className="flex h-[80vh] items-center justify-center">
          <div className="p-6 border rounded-lg shadow-md bg-white w-[320px]">
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
        <div className="p-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            Membership Applications (Live)
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-auto">
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Business</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Payment</th>
                    <th className="p-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">
                        {m.first_name} {m.last_name}
                      </td>
                      <td className="p-3">{m.email}</td>
                      <td className="p-3">{m.phone || "-"}</td>
                      <td className="p-3">
                        {m.registered_business_name || "-"}
                      </td>
                      <td className="p-3">{m.category || "-"}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                          {m.payment_status || "paid"}
                        </span>
                      </td>
                      <td className="p-3">
                        {m.created_at
                          ? new Date(m.created_at).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}

                  {members.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-gray-500">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}