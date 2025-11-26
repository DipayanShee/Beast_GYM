// src/pages/admin/Dashboard.jsx
import { useEffect, useState, useMemo } from "react";
import api from "../../utils/api";

export default function Dashboard() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [todayPresent, setTodayPresent] = useState(0);
  const [loadingMain, setLoadingMain] = useState(true);

  // ---- Fees summary state ----
  const now = useMemo(() => new Date(), []);
  const [period, setPeriod] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1, // 1-12
  });

  const [feeSummary, setFeeSummary] = useState({
    paid: 0,
    due: 0,
    overdue: 0,
  });
  const [loadingFees, setLoadingFees] = useState(true);

  // Label like "Nov 2025"
  const monthLabel = useMemo(() => {
    return new Date(period.year, period.month - 1, 1).toLocaleDateString(
      "en-IN",
      { month: "short", year: "numeric" }
    );
  }, [period]);

  // ---------- Load main stats (members + today attendance) ----------
  useEffect(() => {
    const load = async () => {
      try {
        const membersRes = await api.get("/members");
        setTotalMembers(membersRes.data.length);

        const today = new Date().toISOString().slice(0, 10);

        const attRes = await api.get(`/attendance?date=${today}`);
        const presentCount = attRes.data.filter(
          (m) => m.status === "present"
        ).length;
        setTodayPresent(presentCount);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoadingMain(false);
      }
    };

    load();
  }, []);

  // ---------- Load fee summary for selected month ----------
  const loadFeeSummary = async () => {
    try {
      setLoadingFees(true);
      const res = await api.get("/members/fees/summary", {
        params: {
          year: period.year,
          month: period.month,
        },
      });

      const counts = res.data?.counts || {};
      setFeeSummary({
        paid: counts.paid || 0,
        due: counts.due || 0,
        overdue: counts.overdue || 0,
      });
    } catch (err) {
      console.error("Fee summary error:", err);
    } finally {
      setLoadingFees(false);
    }
  };

  useEffect(() => {
    loadFeeSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period.year, period.month]);

  const changeMonth = (delta) => {
    setPeriod((prev) => {
      let y = prev.year;
      let m = prev.month + delta; // 1-12

      if (m < 1) {
        m = 12;
        y -= 1;
      }
      if (m > 12) {
        m = 1;
        y += 1;
      }

      return { year: y, month: m };
    });
  };

  if (loadingMain) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-2xl p-6 border border-white/10">
          <h2 className="text-gray-400 text-sm">Total Members</h2>
          <p className="text-3xl font-bold mt-2">{totalMembers}</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-white/10">
          <h2 className="text-gray-400 text-sm">Present Today</h2>
          <p className="text-3xl font-bold mt-2">{todayPresent}</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-white/10">
          <h2 className="text-gray-400 text-sm">Active Plans</h2>
          <p className="text-3xl font-bold mt-2">—</p>
          <p className="text-xs text-gray-500 mt-1">
            Can be wired to /plans later.
          </p>
        </div>
      </div>

      {/* FEES SUMMARY SECTION */}
      <div className="mt-4 bg-gray-900 rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Fees Summary</h2>
            <p className="text-xs text-gray-400">
              Month-wise view of who has paid, who is due, and who is overdue.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => changeMonth(-1)}
              className="px-3 py-1 rounded-lg border border-white/20 hover:bg-white/10"
            >
              ←
            </button>
            <span className="px-4 py-1 rounded-lg bg-black/60 border border-white/10 font-medium">
              {monthLabel}
            </span>
            <button
              onClick={() => changeMonth(1)}
              className="px-3 py-1 rounded-lg border border-white/20 hover:bg-white/10"
            >
              →
            </button>
          </div>
        </div>

        {loadingFees ? (
          <p className="text-gray-400 text-sm">Loading fee summary...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl p-4 bg-black/70 border border-green-500/40">
              <p className="text-xs text-gray-400">Paid this month</p>
              <p className="text-3xl font-bold text-green-400 mt-1">
                {feeSummary.paid}
              </p>
            </div>

            <div className="rounded-2xl p-4 bg-black/70 border border-yellow-500/40">
              <p className="text-xs text-gray-400">Due this month</p>
              <p className="text-3xl font-bold text-yellow-300 mt-1">
                {feeSummary.due}
              </p>
            </div>

            <div className="rounded-2xl p-4 bg-black/70 border border-red-500/40">
              <p className="text-xs text-gray-400">Overdue</p>
              <p className="text-3xl font-bold text-red-400 mt-1">
                {feeSummary.overdue}
              </p>
            </div>
          </div>
        )}

        <p className="text-[11px] text-gray-500">
          Detailed member-wise fee status is visible on the{" "}
          <span className="font-semibold text-gray-300">Members</span> page.
        </p>
      </div>
    </div>
  );
}