export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between gap-3">
        <p>© {new Date().getFullYear()} Beast Gym. All rights reserved.</p>
        <p className="text-xs md:text-sm">
          Open: 6:00 AM – 10:00 PM · Call: +91 91237 46370
        </p>
      </div>
      <br />
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-5 justify-center">
        <p>Devolpoed By: Dipayan Shee</p>
        <p>Call: +91 8777740468</p>
      </div>
    </footer>
  );
}