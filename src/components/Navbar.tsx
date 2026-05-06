import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";
import { useAuth } from "../context/AuthContext";

type Props = {
  onCartClick: () => void;
  openAuth: () => void;
};

const Navbar = ({ onCartClick, openAuth }: Props) => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const cartCount = cart.reduce((acc: number, item: any) => acc + item.qty, 0);

  const wishlistCount = wishlist.length;

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10">
      <div className="relative flex items-center justify-between px-6 py-3 gap-4">
        {/* 🔥 LEFT - LOGO */}
        <div
          className="flex items-center gap-3 min-w-[220px] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
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

              {/* 🔥 BOTTOM LINE */}
              <span
                className="
                  block w-full text-center
                  text-xs font-bold
                  tracking-[0.4em]
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

        {/* 🔥 SEARCH */}
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

            {/* BADGE */}
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

            {/* BADGE */}
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

          {/* 🔥 AUTH */}
          {user ? (
            <div className="relative group">
              {/* PROFILE BUTTON */}
              <button
                className="
                  flex items-center gap-3

                  h-[44px]
                  px-3 pr-4

                  rounded-xl

                  border border-orange-500/20
                  bg-orange-500/10

                  hover:bg-orange-500/15
                  hover:border-orange-500/30

                  transition-all duration-300
                "
              >
                {/* AVATAR */}
                <div
                  className="
                    h-8 w-8 rounded-full

                    bg-gradient-to-br
                    from-orange-400
                    to-orange-600

                    flex items-center justify-center

                    text-white
                    text-sm
                    font-semibold

                    shadow-[0_0_10px_rgba(255,115,0,0.35)]
                  "
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* NAME */}
                <span
                  className="
                    max-w-75
                    truncate
                    text-sm
                    font-medium
                    text-orange-100
                  "
                >
                  {user.name}
                </span>

                {/* ARROW */}
                <svg
                  className="
                    w-4 h-4
                    text-orange-300
                    transition-transform duration-300
                    group-hover:rotate-180
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* 🔥 DROPDOWN */}
              <div
                className="
                  absolute right-0 top-[110%]

                  w-[220px]

                  rounded-2xl
                  border border-white/10

                  bg-[#0f172a]/95
                  backdrop-blur-2xl

                  p-2

                  opacity-0 invisible
                  translate-y-2

                  group-hover:opacity-100
                  group-hover:visible
                  group-hover:translate-y-0

                  transition-all duration-300

                  shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                "
              >
                {/* USER INFO */}
                <div
                  className="
                    px-3 py-3
                    border-b border-white/5
                  "
                >
                  <p className="text-sm font-semibold text-white">
                    {user.name}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">{user.mobile}</p>
                </div>

                {/* MENU */}
                <div className="mt-2 space-y-1">
                  <button
                    className="
                      w-full
                      flex items-center
                      px-3 py-2.5
                      rounded-xl
                      text-sm text-gray-300
                      hover:bg-white/5
                      hover:text-white
                      transition
                    "
                    onClick={() => navigate("/profile")}
                  >
                    My Profile
                  </button>

                  <button
                    onClick={logout}
                    className="
                      w-full
                      flex items-center
                      px-3 py-2.5
                      rounded-xl
                      text-sm text-red-400
                      hover:bg-red-500/10
                      transition
                    "
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={openAuth}
              className="
                relative
                px-5 py-2
                rounded-lg
                text-sm font-medium
                bg-gradient-to-r from-orange-500 to-orange-600
                hover:from-orange-400 hover:to-orange-500
                text-white
                shadow-[0_0_15px_rgba(255,115,0,0.5)]
                transition
              "
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
