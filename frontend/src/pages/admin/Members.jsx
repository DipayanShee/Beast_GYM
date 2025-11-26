// src/pages/admin/Members.jsx
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const loadMembers = async () => {
    try {
      const res = await api.get("/members", {
        params: search ? { search } : {},
      });
      setMembers(res.data);
    } catch (err) {
      console.error("Error loading members", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  // Add Member
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/members", form);
      setForm({ fullName: "", phone: "", email: "" });
      setLoading(true);
      loadMembers();
    } catch (err) {
      console.error("Error adding member", err);
      alert("Error adding member");
    }
  };

  // Search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    loadMembers();
  };

  // Delete Member
  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      await api.delete(`/members/${id}`);
      loadMembers();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting member");
    }
  };

  // Mark Paid / Pending
  const markPaid = async (id) => {
    try {
      await api.put(`/members/${id}/mark-paid`);
      loadMembers();
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  const markPending = async (id) => {
    try {
      await api.put(`/members/${id}/mark-pending`);
      loadMembers();
    } catch (err) {
      console.error("Pending error:", err);
    }
  };

  // Badge Styling
  const getBadgeClass = (status) => {
    if (status === "paid")
      return "bg-green-600/20 text-green-400 border border-green-500/40";
    if (status === "overdue")
      return "bg-red-600/20 text-red-400 border border-red-500/40";
    return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40";
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Members</h1>
        <p className="text-sm text-gray-400">Manage all registered members</p>
      </div>

      {/* SEARCH SECTION */}
      <div className="bg-gray-900/40 border border-white/10 rounded-2xl p-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-3 md:items-end"
        >
          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1">
              Search by name or phone
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. Rahul, 9876..."
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-sm focus:border-red-500 outline-none"
            />
          </div>

          <button className="px-5 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 shadow-lg shadow-red-500/30">
            Search
          </button>
        </form>
      </div>

      {/* ADD MEMBER SECTION */}
      <div className="bg-gray-900/40 border border-white/10 rounded-2xl p-5 shadow-xl">
        <h2 className="text-lg font-semibold mb-3">Add New Member</h2>

        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <div>
            <label className="block text-xs text-gray-400 mb-1">Full Name</label>
            <input
              value={form.fullName}
              onChange={(e) =>
                setForm((f) => ({ ...f, fullName: e.target.value }))
              }
              required
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-sm focus:border-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Phone</label>
            <input
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              required
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-sm focus:border-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Email</label>
            <input
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-sm focus:border-red-500 outline-none"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button className="mt-2 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold shadow-lg shadow-red-500/30">
              Save Member
            </button>
          </div>
        </form>
      </div>

      {/* MEMBERS TABLE */}
      <div className="bg-gray-900/40 border border-white/10 rounded-2xl overflow-x-auto shadow-xl">
        <table className="w-full text-sm">
          <thead className="bg-black/40 text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Fee Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-3 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-3 text-gray-400">
                  No members found.
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr
                  key={m._id}
                  className="border-t border-white/10 hover:bg-black/20"
                >
                  <td className="px-4 py-2">{m.fullName}</td>
                  <td className="px-4 py-2">{m.phone}</td>
                  <td className="px-4 py-2">{m.email || "-"}</td>

                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${getBadgeClass(
                        m.feeStatus
                      )}`}
                    >
                      {m.feeStatus}
                    </span>
                  </td>

                  <td className="px-4 py-2 flex gap-2">
                    {m.feeStatus !== "paid" && (
                      <button
                        onClick={() => markPaid(m._id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-white text-xs"
                      >
                        Mark Paid
                      </button>
                    )}

                    {m.feeStatus !== "pending" && (
                      <button
                        onClick={() => markPending(m._id)}
                        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white text-xs"
                      >
                        Pending
                      </button>
                    )}

                    <button
                      onClick={() => deleteMember(m._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}