import { motion } from "framer-motion";
import { Dumbbell, BadgeCheck, Flame } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Dumbbell size={40} />,
      title: "Top-Class Equipment",
      desc: "Train with high-grade machines and weights for maximum performance.",
    },
    {
      icon: <BadgeCheck size={40} />,
      title: "Certified Trainers",
      desc: "Expert training from professionals who push you to your limit.",
    },
    {
      icon: <Flame size={40} />,
      title: "Hardcore Environment",
      desc: "A beast-mode environment to keep you motivated every single day.",
    },
  ];

  return (
    <section className="bg-black py-20 text-white px-6">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-wide">
        WHY CHOOSE <span className="text-red-600">BEAST GYM</span>
      </h2>

      <p className="text-center text-gray-400 mt-3 text-sm md:text-base">
        Experience a fitness environment designed for real transformation.
      </p>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-gray-900 rounded-xl p-8 border border-white/10 hover:border-red-600 transition"
          >
            <div className="text-red-500 mb-5">{f.icon}</div>
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="text-gray-400 text-sm mt-3">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}