import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const linkClasses = ({ isActive }) =>
  `block px-4 py-2 rounded-lg text-sm ${
    isActive
      ? "bg-red-600 text-white shadow"
      : "text-gray-300 hover:bg-white/5 hover:text-white"
  }`;

export default function AdminLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex lg:flex-row flex-col relative">

      {/* 🌟 MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-black/95 border-b border-white/10 z-50 p-4 flex items-center justify-between">
        <div className="font-bold text-lg tracking-wide">
          <span className="text-white">BEAST</span>{" "}
          <span className="text-red-500">ADMIN</span>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* 🌟 SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64
          bg-gradient-to-b from-black to-gray-950 border-r border-white/10
          flex flex-col transform transition-transform duration-300 z-50
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-md bg-white/10 hover:bg-white/20"
          >
            ✕
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="px-6 py-5 border-b border-white/10 hidden lg:block">
          <div className="text-lg font-extrabold tracking-wide">
            <span className="text-white">BEAST</span>{" "}
            <span className="text-red-500">ADMIN</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          <NavLink to="/admin/dashboard" className={linkClasses} onClick={() => setMobileOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/members" className={linkClasses} onClick={() => setMobileOpen(false)}>
            Members
          </NavLink>
          <NavLink to="/admin/attendance" className={linkClasses} onClick={() => setMobileOpen(false)}>
            Attendance
          </NavLink>
          <NavLink to="/admin/attendance-calendar" className={linkClasses} onClick={() => setMobileOpen(false)}>
            Attendance Calendar
          </NavLink>
          <NavLink to="/admin/plans" className={linkClasses} onClick={() => setMobileOpen(false)}>
            Plans
          </NavLink>
          <NavLink to="/admin/enquiries" className={linkClasses} onClick={() => setMobileOpen(false)}>
            Enquiries
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              handleLogout();
              setMobileOpen(false);
            }}
            className="w-full py-2 rounded-lg border border-red-600 text-red-400 hover:bg-red-600 hover:text-white text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* 🌟 BACKDROP (mobile) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 🌟 MAIN CONTENT */}
      <main className="flex-1 bg-gradient-to-b from-black via-black to-gray-950 p-6 pt-20 lg:pt-6 lg:ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}