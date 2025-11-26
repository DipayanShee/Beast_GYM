import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/enquiries", form);

      alert("Message submitted successfully!");

      setForm({ name: "", phone: "", message: "" }); // clear form
    } catch (error) {
      console.error("Enquiry submit error:", error);
      alert("Failed to submit enquiry");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-28 px-4 pb-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold">
          Contact Us
        </h1>
        <p className="mt-3 text-center text-gray-300 text-sm md:text-base">
          Have questions? Want to start your membership? Reach out to us.
        </p>

        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="bg-gray-900 p-6 rounded-2xl border border-white/10">
              <h2 className="text-xl font-semibold mb-3">Gym Address</h2>
              <p className="text-gray-300 text-sm">
                Beast Gym
                <br />
                XYZ Road, Your Area
                <br />
                Your City, PIN - 000000
              </p>
              <p className="mt-3 text-gray-300 text-sm">
                Phone: +91 98765 43210
                <br />
                Email: info@beastgym.com
              </p>
            </div>

            <div className="bg-gray-900 p-2 rounded-2xl border border-white/10">
              <iframe
                title="Beast Gym Location"
                className="w-full h-52 rounded-xl"
                src="https://www.google.com/maps/embed?pb="
              ></iframe>
            </div>
          </div>

          {/* RIGHT — CONTACT FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded-2xl border border-white/10 space-y-4"
          >
            <h2 className="text-xl font-semibold mb-1">Send us a message</h2>

            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 rounded-lg bg-black border border-white/20 text-sm focus:outline-none focus:border-red-500"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-2 rounded-lg bg-black border border-white/20 text-sm focus:outline-none focus:border-red-500"
                placeholder="Your phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-2 rounded-lg bg-black border border-white/20 text-sm focus:outline-none focus:border-red-500"
                placeholder="Tell us what you need..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-red-600 hover:bg-red-700 text-sm md:text-base font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}