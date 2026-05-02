import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "../data/heroSlides";

const BannerCarousel = () => {
  const [index, setIndex] = useState(0);

  // 🔄 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 PRELOAD IMAGES
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  return (
    <div className="mt-4 relative rounded-xl overflow-hidden">

      {/* 🔥 FIXED HEIGHT CONTAINER */}
      <div className="w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] relative">

        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={heroSlides[index].image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </AnimatePresence>

      </div>

      {/* DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
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