import { motion } from "framer-motion";

export default function Trainers() {
  const trainers = [
    { name: "Swarajit Haldar", img: "/images/trainer1.jpg" },
  ];

  return (
    <section className="bg-black py-20 text-white px-6">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-wide">
        MEET OUR <span className="text-red-600">TRAINERS</span>
      </h2>

      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {trainers.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-xl overflow-hidden border border-white/10"
          >
            <img src={t.img} className="w-full h-60 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="text-gray-400 text-sm">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}