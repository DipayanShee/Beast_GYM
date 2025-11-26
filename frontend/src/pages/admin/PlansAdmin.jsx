import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function PlansAdmin() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: ""
  });

  const loadPlans = async () => {
    try {
      const res = await api.get("/plans");
      setPlans(res.data);
    } catch (err) {
      console.error("Error loading plans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/plans", form);
      setForm({ name: "", duration: "", price: "" });
      loadPlans();
    } catch (err) {
      console.error("Error adding plan:", err);
      alert("Error adding plan");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Membership Plans</h1>

      {/* ADD PLAN */}
      <div className="bg-gray-900 p-5 rounded-xl border border-white/10">
        <h2 className="text-lg font-semibold mb-3">Create New Plan</h2>

        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            className="px-3 py-2 rounded-lg bg-black border border-white/20"
            placeholder="Plan Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="number"
            className="px-3 py-2 rounded-lg bg-black border border-white/20"
            placeholder="Duration (months)"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            required
          />

          <input
            type="number"
            className="px-3 py-2 rounded-lg bg-black border border-white/20"
            placeholder="Price (₹)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-white">
            Save Plan
          </button>
        </form>
      </div>

      {/* PLAN TABLE */}
      <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-black/40">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-3">
                  Loading...
                </td>
              </tr>
            ) : plans.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-3">
                  No plans found.
                </td>
              </tr>
            ) : (
              plans.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-white/10 hover:bg-black/40"
                >
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.duration} months</td>
                  <td className="px-4 py-2">₹{p.price}</td>
                  <td className="px-4 py-2">
                    <button className="bg-red-600 px-3 py-1 rounded-lg text-xs">
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