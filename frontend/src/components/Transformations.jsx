import { motion } from "framer-motion";

export default function Transformations() {
  const images = [
    "/images/trans1.jpg",
    "/images/trans2.jpg",
    "/images/trans3.jpg",
  ];

  return (
    <section className="bg-black py-20 text-white px-6">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-wide">
        REAL <span className="text-red-600">TRANSFORMATIONS</span>
      </h2>
      <p className="text-center text-gray-400 text-sm md:text-base mt-2">
        Our members who unleashed the beast within.
      </p>

      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            className="rounded-xl object-cover h-72 w-full border border-white/10 hover:scale-[1.02] transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    </section>
  );
}