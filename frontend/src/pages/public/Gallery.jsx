import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const images = [
  { src: "/images/beast-logo.jpg", caption: "Beast Gym Wall Logo" },
  { src: "/images/gym-1.jpg", caption: "Strength Training Area" },
  { src: "/images/gym-2.jpg", caption: "Cardio Zone" },
  { src: "/images/gym-3.jpg", caption: "Free Weights Section" },
];

export default function Gallery() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-28 px-4 pb-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold">
          Gym Gallery
        </h1>
        <p className="mt-3 text-center text-gray-300 text-sm md:text-base">
          A glimpse of the vibe inside Beast Gym.
        </p>

        <div className="max-w-6xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img) => (
            <div
              key={img.src}
              className="relative group overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-32 sm:h-40 md:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs md:text-sm text-center px-2 transition-opacity">
                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}