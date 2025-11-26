// src/pages/admin/Attendance.jsx
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function Attendance() {
  const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAttendance = async () => {
    try {
      const res = await api.get(`/attendance?date=${date}`);
      setMembers(res.data);
    } catch (err) {
      console.error("Error loading attendance", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadAttendance();
  }, [date]);

  const updateStatus = async (memberId, status) => {
    try {
      await api.post("/attendance/mark", {
        memberId,
        date,
        status,
      });
      loadAttendance();
    } catch (err) {
      console.error("Error updating status", err);
      alert("Error updating status");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Attendance</h1>

      {/* Date Picker */}
      <div className="bg-gray-900 p-4 rounded-xl border border-white/10 w-fit">
        <label className="text-sm text-gray-300 mr-3">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 rounded-lg bg-black text-white border border-white/20 focus:border-red-500"
        />
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-black/40">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-3 text-gray-400" colSpan={4}>
                  Loading...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-gray-400" colSpan={4}>
                  No members found for this date.
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr
                  key={m.memberId}
                  className="border-t border-white/10 hover:bg-black/40 transition"
                >
                  <td className="px-4 py-2">{m.fullName}</td>
                  <td className="px-4 py-2">{m.phone}</td>
                  <td className="px-4 py-2">
                    {m.status === "present" ? (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                        Present
                      </span>
                    ) : m.status === "absent" ? (
                      <span className="bg-red-600 text:white px-3 py-1 rounded-full text-xs">
                        Absent
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="px-3 py-1 bg-green-600 rounded-lg text-xs hover:bg-green-700"
                      onClick={() => updateStatus(m.memberId, "present")}
                    >
                      Present
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 rounded-lg text-xs hover:bg-red-700"
                      onClick={() => updateStatus(m.memberId, "absent")}
                    >
                      Absent
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