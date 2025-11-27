// src/pages/public/Plans.jsx
import { useEffect, useState } from "react";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
    <Navbar />
    <div className="px-4 sm:px-10 py-20 text-white bg-black min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Membership Plans
      </h1>
      <p className="text-center text-gray-400 mb-12">
        Choose a plan that matches your grind. You can always upgrade later.
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Loading plans...</p>
      ) : plans.length === 0 ? (
        <p className="text-center text-gray-500">No plans available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center border border-white/10"
            >
              <h2 className="text-xl font-semibold mb-3">{plan.name}</h2>
              <p className="text-red-400 text-2xl font-bold mb-3">
                ₹{plan.price}{" "}
                <span className="text-sm text-gray-400">
                  / {plan.durationMonths} months
                </span>
              </p>

              <ul className="text-left text-sm text-gray-300 mb-6 space-y-2">
                <li>✔ Gym floor access</li>
                <li>✔ Trainer support</li>
              </ul>

              <button className="bg-red-600 w-full py-3 rounded-xl hover:bg-red-700">
                Join this Plan
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer />
    </>
    
  );
}