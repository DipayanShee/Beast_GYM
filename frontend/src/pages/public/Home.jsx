import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import WhyChooseUs from "../../components/WhyChooseUs";
import Trainers from "../../components/Trainers";
import Transformations from "../../components/Transformations";
import JoinCTA from "../../components/JoinCTA";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <section
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/beast-logo.jpeg')",
        }}
      >
        {/* Gradient premium overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/95"></div>

        {/* HERO CONTENT */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-5">
          
          {/* Animated Title */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-2xl"
          >
            BEAST GYM
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-5 text-gray-300 text-lg md:text-2xl font-medium"
          >
            HERE ARE MADE THE BEAST
          </motion.p>

          {/* PREMIUM BUTTONS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-5"
          >
            <a
              href="/plans"
              className="px-10 py-3 rounded-full bg-red-600 hover:bg-red-700 text-lg font-semibold text-white shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all"
            >
              View Plans
            </a>

            <a
              href="/contact"
              className="px-10 py-3 rounded-full bg-white text-black hover:bg-gray-200 text-lg font-semibold shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all"
            >
              Join Now
            </a>
          </motion.div>

        </div>
      </section>
      <WhyChooseUs />
      <Trainers />
      <Transformations />
      <JoinCTA />
      <Footer />
    </>
  );
}
