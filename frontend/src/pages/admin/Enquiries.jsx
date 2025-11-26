import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEnquiries = async () => {
    try {
      const res = await api.get("/enquiries");
      setEnquiries(res.data);
    } catch (err) {
      console.error("Error loading enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Enquiries</h1>

      <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-black/40">
            <tr>
              <th className="px-4 py-2 w-1/6 text-left">Name</th>
              <th className="px-4 py-2 w-1/6 text-left">Email</th>
              <th className="px-4 py-2 w-1/6 text-left">Phone</th>
              <th className="px-4 py-2 w-2/6 text-left">Message</th>
              <th className="px-4 py-2 w-1/6 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {enquiries.map((q) => (
              <tr
                key={q._id}
                className="border-t border-white/10 hover:bg-black/40"
              >
                <td className="px-4 py-2 truncate">{q.name}</td>
                <td className="px-4 py-2 truncate">{q.email || "-"}</td>
                <td className="px-4 py-2 truncate">{q.phone}</td>
                <td className="px-4 py-2 break-words">{q.message}</td>
                <td className="px-4 py-2">
                  {new Date(q.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}