export default function JoinCTA() {
  return (
    <section
      className="relative w-full h-[60vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/beast-logo.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 flex flex-col h-full justify-center items-center text-center px-4">
        <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-wide">
          BECOME THE BEAST
        </h2>
        <p className="text-gray-300 mt-3 md:text-lg">
          Change your body. Change your life. Start today.
        </p>

        <a
          href="/contact"
          className="mt-8 px-10 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-lg font-semibold"
        >
          Join Now
        </a>
      </div>
    </section>
  );
}