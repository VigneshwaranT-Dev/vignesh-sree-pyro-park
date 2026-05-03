import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { products } from "../data/products";
import { motion, AnimatePresence } from "framer-motion";

const NavbarSearch = () => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();
  const location = useLocation();

  const debouncedQuery = useDebounce(query, 300);

  const filtered = products
    .filter((p) =>
      p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
    .slice(0, 6);

  // 🔥 Reset on route change
  useEffect(() => {
    setQuery("");
    setActiveIndex(-1);
  }, [location.pathname]);

  // 🔥 Scroll active item
  useEffect(() => {
    const el = document.getElementById(`search-item-${activeIndex}`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // 🔥 Smooth navigation helper
  const handleNavigate = (url: string) => {
    setQuery("");
    setActiveIndex(-1);

    setTimeout(() => {
      navigate(url);
    }, 150); // allow animation to finish
  };

  return (
    <div className="flex-1 max-w-2xl relative">

      {/* INPUT */}
      <div
        className="
          flex items-center bg-[#1a2235] px-3 py-2 rounded-lg w-full
          border border-[#1e293b]
          transition-all duration-300
          focus-within:border-orange-400
          focus-within:shadow-[0_0_15px_rgba(255,115,0,0.4)]
          focus-within:bg-[#1f2937]
        "
      >
        <Search size={16} className="text-gray-400" />

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          placeholder="Search crackers..."
          className="bg-transparent outline-none ml-2 text-sm w-full text-white caret-orange-500"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((prev) =>
                prev < filtered.length - 1 ? prev + 1 : prev
              );
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : -1
              );
            }

            if (e.key === "Enter") {
              if (activeIndex >= 0) {
                const selected = filtered[activeIndex];
                handleNavigate(`/product/${selected.id}`);
              } else {
                handleNavigate(`/products?q=${query}`);
              }
            }

            if (e.key === "Escape") {
              setQuery("");
              setActiveIndex(-1);
            }
          }}
          onBlur={() => setTimeout(() => setQuery(""), 150)}
        />
      </div>

      {/* 🔥 ANIMATED DROPDOWN */}
      <AnimatePresence>
        {debouncedQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
              absolute top-full mt-2 w-full
              bg-[#020617]
              border border-white/10
              rounded-xl
              shadow-xl
              max-h-[300px] overflow-y-auto
              z-50
            "
          >
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <div
                  id={`search-item-${index}`}
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() =>
                    handleNavigate(`/product/${item.id}`)
                  }
                  className={`
                    flex items-center gap-3 px-4 py-2 cursor-pointer
                    transition
                    ${
                      activeIndex === index
                        ? "bg-orange-500/20"
                        : "hover:bg-white/5"
                    }
                  `}
                >
                  <img
                    src={item.images[0]}
                    className="w-10 h-10 object-contain"
                  />

                  <div className="flex flex-col">
                    <span className="text-sm text-white">
                      {item.name}
                    </span>
                    <span className="text-xs text-orange-400">
                      ₹{item.offerPrice || item.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-400">
                No results found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default NavbarSearch;