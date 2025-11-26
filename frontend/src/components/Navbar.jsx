import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Plans", to: "/plans" },
    { name: "Gallery", to: "/gallery" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-30 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-white text-2xl font-extrabold tracking-wide hover:text-red-500 transition"
        >
          BEAST GYM
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          {links.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="text-gray-200 hover:text-red-500 hover:tracking-wide transition-all"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-black/90 text-white transition-all overflow-hidden ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4 text-lg">
          {links.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}