// src/pages/admin/AttendanceCalendar.jsx
import { useEffect, useMemo, useState } from "react";
import api from "../../utils/api";

function formatPretty(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AttendanceCalendar() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [historyDates, setHistoryDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [records, setRecords] = useState([]);

  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(false);

  const todayStr = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  );

  const historyDatesSet = useMemo(() => new Set(historyDates), [historyDates]);

  // Load all dates that have attendance
  const loadHistoryDates = async () => {
    try {
      setLoadingDates(true);
      const res = await api.get("/attendance/history/dates");
      const dates = res.data || [];
      dates.sort();
      setHistoryDates(dates);

      if (dates.length > 0) {
        if (dates.includes(todayStr)) setSelectedDate(todayStr);
        else setSelectedDate(dates[dates.length - 1]);
      }
    } catch (err) {
      console.error("Error loading attendance dates:", err);
    } finally {
      setLoadingDates(false);
    }
  };

  // Load records for selected date
  const loadRecordsForDate = async (dateStr) => {
    if (!dateStr) return;
    try {
      setLoadingRecords(true);
      const res = await api.get(`/attendance/history/date/${dateStr}`);
      setRecords(res.data || []);
    } catch (err) {
      console.error("Error loading attendance:", err);
      setRecords([]);
    } finally {
      setLoadingRecords(false);
    }
  };

  useEffect(() => {
    loadHistoryDates();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadRecordsForDate(selectedDate);
      const [y, m] = selectedDate.split("-");
      setCurrentMonth(new Date(Number(y), Number(m) - 1, 1));
    }
  }, [selectedDate]);

  // Calendar helpers
  const year = currentMonth.getFullYear();
  const monthIndex = currentMonth.getMonth();

  const monthLabel = currentMonth.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay();

  const calendarCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [firstDayOfWeek, daysInMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    if (historyDatesSet.has(todayStr)) setSelectedDate(todayStr);
  };

  const handleDayClick = (dayNum) => {
    if (!dayNum) return;
    const m = String(monthIndex + 1).padStart(2, "0");
    const d = String(dayNum).padStart(2, "0");
    setSelectedDate(`${year}-${m}-${d}`);
  };

  const summary = useMemo(() => {
    let present = 0,
      absent = 0;
    records.forEach((r) => {
      if (r.status === "present") present++;
      if (r.status === "absent") absent++;
    });
    return { present, absent, total: records.length };
  }, [records]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Attendance Calendar</h1>
          <p className="text-sm text-gray-400">View attendance history.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 rounded-lg border border-white/20 text-sm hover:bg-white/10"
          >
            ←
          </button>

          <div className="px-4 py-1 rounded-lg bg-red-600/30 text-sm font-semibold border border-red-500/40">
            {monthLabel}
          </div>

          <button
            onClick={handleNextMonth}
            className="px-3 py-1 rounded-lg border border-white/20 text-sm hover:bg-white/10"
          >
            →
          </button>

          <button
            onClick={handleToday}
            className="px-4 py-1 rounded-lg border border-red-500 text-red-400 text-xs hover:bg-red-600 hover:text-white"
          >
            Today
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* CALENDAR */}
        <div className="flex-1 bg-gray-900/40 rounded-2xl border border-white/10 p-4 shadow-xl">
          <div className="grid grid-cols-7 text-xs text-center text-gray-400 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {loadingDates ? (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
              Loading calendar...
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2 text-sm">
              {calendarCells.map((day, i) => {
                if (!day) return <div key={i} className="h-10 md:h-12"></div>;

                const m = String(monthIndex + 1).padStart(2, "0");
                const d = String(day).padStart(2, "0");
                const dateStr = `${year}-${m}-${d}`;

                const isToday = dateStr === todayStr;
                const hasData = historyDatesSet.has(dateStr);
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={i}
                    onClick={() => handleDayClick(day)}
                    className={`
                      h-10 md:h-14 rounded-xl flex flex-col items-center justify-center
                      border transition text-sm
                      ${hasData ? "border-red-500/60 bg-red-800/20" : "border-white/10"}
                      ${isToday ? "ring-2 ring-red-400/70" : ""}
                      ${isSelected ? "bg-red-600 text-white ring-2 ring-red-400" : ""}
                    `}
                  >
                    <span className="font-semibold">{day}</span>
                    {hasData && (
                      <span className="text-[10px] text-red-300">
                        ●
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* DETAILS PANEL */}
        <div className="w-full lg:w-72 bg-gray-900/60 rounded-2xl border border-white/10 p-4">
          <h2 className="text-lg font-semibold mb-1">Day Details</h2>
          <p className="text-xs text-gray-400 mb-3">
            {selectedDate
              ? `Summary for ${formatPretty(selectedDate)}`
              : "Select a date."}
          </p>

          {selectedDate && (
            <div className="mb-4 flex gap-2">
              <div className="flex-1 bg-black/50 border border-green-500/40 rounded-xl p-3">
                <p className="text-[11px] text-gray-400">Present</p>
                <p className="text-xl font-bold text-green-400">{summary.present}</p>
              </div>
              <div className="flex-1 bg-black/50 border border-red-500/40 rounded-xl p-3">
                <p className="text-[11px] text-gray-400">Absent</p>
                <p className="text-xl font-bold text-red-400">{summary.absent}</p>
              </div>
              <div className="flex-1 bg-black/50 border border-white/20 rounded-xl p-3">
                <p className="text-[11px] text-gray-400">Total</p>
                <p className="text-xl font-bold text-white">{summary.total}</p>
              </div>
            </div>
          )}

          <div className="max-h-72 overflow-y-auto space-y-2">
            {loadingRecords ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : records.length === 0 ? (
              <p className="text-gray-500 text-sm">No records.</p>
            ) : (
              records.map((r) => (
                <div
                  key={r._id}
                  className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm"
                >
                  <div>
                    <p className="font-medium">{r.member?.fullName || "---"}</p>
                    <p className="text-[11px] text-gray-400">{r.member?.phone}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] uppercase font-semibold ${
                      r.status === "present"
                        ? "bg-green-600/20 text-green-400 border border-green-600/40"
                        : "bg-red-600/20 text-red-400 border border-red-600/40"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}