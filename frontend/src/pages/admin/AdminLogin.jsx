// src/pages/admin/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@gym.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminInfo", JSON.stringify(res.data.admin));
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-white/10">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        {error && (
          <div className="mb-4 text-sm text-red-400 text-center">{error}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Email</label>
            <input
              className="w-full px-3 py-2 rounded-lg bg-black border border-white/20 text-sm focus:outline-none focus:border-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Password</label>
            <input
              className="w-full px-3 py-2 rounded-lg bg:black bg-black border border-white/20 text-sm focus:outline-none focus:border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}