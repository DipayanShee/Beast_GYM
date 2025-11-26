import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white pt-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold">About Beast Gym</h1>

          <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed">
            Beast Gym is built for those who want to push their limits.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold mb-2">Modern Equipment</h2>
            <p className="text-gray-400">Top quality machines for strength & conditioning.</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold mb-2">Expert Trainers</h2>
            <p className="text-gray-400">Certified fitness coaches ready to guide you.</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold mb-2">Beast Environment</h2>
            <p className="text-gray-400">A hardcore vibe to boost your motivation.</p>
          </div>
        </div>
      </div>
      
      <Footer />

    </>
  );
}