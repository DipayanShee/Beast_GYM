import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Plans from "./pages/public/Plans";
import Contact from "./pages/public/Contact";
import Gallery from "./pages/public/Gallery";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Members";
import Attendance from "./pages/admin/Attendance";
import PlansAdmin from "./pages/admin/PlansAdmin";
import Enquiries from "./pages/admin/Enquiries";

// ⭐ NEW
import AttendanceCalendar from "./pages/admin/AttendanceCalendar";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin protected area */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="attendance" element={<Attendance />} />

          {/* ⭐ NEW ATTENDANCE CALENDAR ROUTE */}
          <Route path="attendance-calendar" element={<AttendanceCalendar />} />

          <Route path="plans" element={<PlansAdmin />} />
          <Route path="enquiries" element={<Enquiries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;