import { motion } from "framer-motion";
import { ShoppingCart, Heart, Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10">

      {/* 🔶 TOP NAV */}
      <div className="flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <h1 className="text-orange-400 font-bold text-xl">
          Vignesh Sree Pyro Park
        </h1>

        {/* SEARCH */}
        <div className="hidden md:flex items-center w-[50%]">
          <div className="flex items-center bg-[#1a2235] px-3 py-2 rounded-lg w-full">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search crackers..."
              className="bg-transparent outline-none ml-2 text-sm w-full text-white"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">

          <motion.div whileHover={{ scale: 1.2 }}>
            <Heart className="cursor-pointer text-gray-300 hover:text-orange-400" />
          </motion.div>

          <motion.div whileHover={{ scale: 1.2 }}>
            <ShoppingCart className="cursor-pointer text-gray-300 hover:text-orange-400" />
          </motion.div>

          <button className="bg-orange-500 px-4 py-1.5 rounded-lg text-sm hover:bg-orange-600 transition">
            Login
          </button>
        </div>
      </div>

      {/* 🔶 SECOND NAV */}
      {/* <div className="hidden md:flex gap-6 px-6 pb-3 text-sm text-gray-300">
        {[
          "Home",
          "Best Sellers",
          "New Arrivals",
          "Offers",
          "Brands",
          "Contact",
        ].map((item) => (
          <span
            key={item}
            className="cursor-pointer hover:text-orange-400 transition"
          >
            {item}
          </span>
        ))}
      </div> */}
    </div>
  );
};

export default Navbar;