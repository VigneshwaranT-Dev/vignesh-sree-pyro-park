import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d",
  "https://images.unsplash.com/photo-1473187983305-f615310e7daa",
  "https://images.unsplash.com/photo-1513151233558-d860c5398176",
];

const BannerCarousel = () => {
  const [index, setIndex] = useState(0);

  // 🔄 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // 4 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 relative rounded-xl overflow-hidden">

      {/* IMAGE */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={banners[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-[250px] md:h-[350px] object-cover"
        />
      </AnimatePresence>

      {/* OVERLAY CONTENT */}
      {/* <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-6">
        <h1 className="text-2xl md:text-4xl font-bold">
          Diwali Mega Sale 🎆
        </h1>
        <p className="text-gray-300 text-sm mt-1">
          Up to 60% OFF on all crackers
        </p>
        <button className="mt-3 bg-orange-500 px-4 py-2 rounded-lg w-fit hover:scale-105 transition">
          Shop Now →
        </button>
      </div> */}

      {/* DOT INDICATORS */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-orange-500" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default BannerCarousel;