import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";

type Props = {
  onCartClick: () => void;
};

const Navbar = ({ onCartClick }: Props) => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const navigate = useNavigate();

  const cartCount = cart.reduce((acc: number, item: any) => acc + item.qty, 0);

  const wishlistCount = wishlist.length;

  return (
    <div className="sticky top-0 z-50">
      {/* 🔥 PREMIUM BACKDROP */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/90 to-[#020617]/95 backdrop-blur-xl border-b border-white/10" />

      <div className="relative flex items-center justify-between px-6 py-3 gap-4">
        {/* 🔥 LEFT - LOGO */}
        <div
          className="flex items-center gap-3 min-w-[220px] cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img
            src="/assets/logo/app-logo.png"
            alt="logo"
            className="h-12 object-contain transition group-hover:scale-105"
          />

          <div>
            <h1 className="leading-tight">
              <span
                className="
                  block text-white text-[16px] md:text-lg font-bold tracking-wide
                  group-hover:text-orange-400 transition
                "
              >
                Vignesh Sree
              </span>

              <span
                className="
                  block text-xs font-bold tracking-[0.4em]
                  bg-gradient-to-r from-orange-400 via-orange-500 to-red-500
                  bg-clip-text text-transparent
                "
              >
                PYRO PARK
              </span>
            </h1>
          </div>
        </div>

        {/* 🔥 CENTER SEARCH */}
        <NavbarSearch />

        {/* 🔥 RIGHT ACTIONS */}
        <div className="flex items-center gap-5 min-w-[180px] justify-end">
          {/* ❤️ WISHLIST */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/wishlist")}
            className={`
              relative cursor-pointer p-2 rounded-lg
              transition
              ${
                wishlistCount > 0
                  ? "text-orange-400 bg-orange-500/10 shadow-[0_0_10px_rgba(255,115,0,0.4)]"
                  : "text-gray-300 hover:text-orange-400"
              }
            `}
          >
            <Heart size={20} />

            {/* 🔥 BADGE */}
            {wishlistCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.4 }}
                className="
                  absolute -top-2 -right-2
                  bg-orange-500 text-white
                  text-[10px] font-bold
                  h-5 min-w-[20px] px-1
                  flex items-center justify-center
                  rounded-full
                  shadow-[0_0_10px_rgba(255,115,0,0.8)]
                "
              >
                {wishlistCount}
              </motion.span>
            )}
          </motion.div>

          {/* 🛒 CART */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCartClick}
            className={`
              relative cursor-pointer p-2 rounded-lg
              transition
              ${
                cartCount > 0
                  ? "text-orange-400 bg-orange-500/10 shadow-[0_0_10px_rgba(255,115,0,0.4)]"
                  : "text-gray-300 hover:text-orange-400"
              }
            `}
          >
            <ShoppingCart size={20} />

            {/* 🔥 BADGE */}
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.4 }}
                className="
                  absolute -top-2 -right-2
                  bg-orange-500 text-white
                  text-[10px] font-bold
                  h-5 min-w-[20px] px-1
                  flex items-center justify-center
                  rounded-full
                  shadow-[0_0_10px_rgba(255,115,0,0.8)]
                "
              >
                {cartCount}
              </motion.span>
            )}
          </motion.div>

          {/* 🔥 LOGIN BUTTON */}
          <button
            className="
              relative px-5 py-1.5 rounded-lg text-sm font-medium
              bg-gradient-to-r from-orange-500 to-orange-600
              hover:from-orange-400 hover:to-orange-500
              text-white
              shadow-[0_0_15px_rgba(255,115,0,0.5)]
              transition
            "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
