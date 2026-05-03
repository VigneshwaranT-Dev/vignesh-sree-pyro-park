import { motion } from "framer-motion";
import { ShoppingCart, Heart, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";



type Props = {
  onCartClick: () => void;
};

const Navbar = ({ onCartClick }: Props) => {

  const { cart } = useCart();
  
  const cartCount = cart.reduce(
    (acc: number, item: any) => acc + item.qty,
    0
  );
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10">

      <div className="flex items-center justify-between px-6 py-3 gap-4">

        {/* 🔥 LEFT - LOGO + BRAND */}
        <div className="flex items-center gap-3 min-w-[220px] cursor-pointer" 
              onClick={() => {
                navigate("/"); 
              }}>

          <img
            src="/assets/logo/app-logo.png"
            alt="Sree Vignesh Pyro Park"
            className="h-12 object-contain"
          />

          <div className="inline-block">

          <h1 className="leading-tight">

            {/* 🔥 TOP LINE */}
            <span
              className="
                block text-white text-[16px] md:text-lg font-bold tracking-wide
                drop-shadow-[0_0_6px_rgba(255,115,0,0.6)]
              "
            >
              Vignesh Sree
            </span>

            {/* 🔥 BOTTOM LINE STRETCHED */}
            <span
              className="
                block w-full text-center
                text-xs font-bold
                tracking-[0.4em]   /* 🔥 key: increase spacing */
                bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
                bg-clip-text text-transparent
                drop-shadow-[0_0_10px_rgba(255,115,0,0.8)]
              "
            >
              PYRO PARK
            </span>

          </h1>

        </div>

        </div>

        {/* 🔥 CENTER - SEARCH */}
        {/* <div className="flex-1 max-w-2xl">
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
              type="text"
              placeholder="Search crackers..."
              className="bg-transparent outline-none ml-2 text-sm w-full text-white caret-orange-500"
            />
          </div>
        </div> */}

        <NavbarSearch />

        {/* 🔥 RIGHT - ACTIONS */}
        <div className="flex items-center gap-4 min-w-[180px] justify-end">

          <motion.div whileHover={{ scale: 1.2 }}>
            <Heart className="cursor-pointer text-gray-300 hover:text-orange-400" />
          </motion.div>

          <motion.div whileHover={{ scale: 1.2 }} className="relative">
            <ShoppingCart
              className="cursor-pointer text-gray-300 hover:text-orange-400"
              onClick={onCartClick}
            />

            {/* 🔥 CART COUNT BADGE */}
            {cartCount > 0 && (
              <span
                className="
                  absolute -top-2 -right-2
                  bg-orange-500 text-white
                  text-[10px] font-semibold
                  h-5 min-w-[20px] px-1
                  flex items-center justify-center
                  rounded-full
                  shadow-md
                "
              >
                {cartCount}
              </span>
            )}

          </motion.div>

          <button className="bg-orange-500 px-4 py-1.5 rounded-lg text-sm hover:bg-orange-600 transition">
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Navbar;