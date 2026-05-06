import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import WishlistPageSkeleton from "../components/skeletons/WishlistPageSkeleton";

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart, updateQty, removeFromCart, getItemQty } = useCart();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const { openCart } = useOutletContext<{ openCart: () => void }>();
  // ✅ FIXED
  const handleAdd = (item: any) => {
    const qty = getItemQty(item.id);

    if (qty > 0) {
      window.dispatchEvent(
        new CustomEvent("toast", {
          detail: { message: "Already in cart", type: "error" },
        }),
      );
      return;
    }

    addToCart(item);

    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: { message: "Moved to cart", type: "success" },
      }),
    );
  };

  // ✅ FIXED
  const handleRemove = (item: any) => {
    toggleWishlist(item);

    window.dispatchEvent(
      new CustomEvent("toast", {
        detail: { message: "Removed from wishlist", type: "error" },
      }),
    );
  };

  if (isLoading) {
    return <WishlistPageSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <Heart className="text-orange-400" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-white">Your Wishlist</h1>
          <p className="text-gray-400 text-sm">
            {wishlist.length} item{wishlist.length !== 1 && "s"}
          </p>
        </div>
      </div>

      {/* EMPTY */}
      {wishlist.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="text-6xl mb-4">💔</div>

          <h2 className="text-xl text-white mb-2">Your wishlist is empty</h2>

          <p className="text-gray-400 mb-6">
            Save your favorite crackers for later
          </p>

          <button
            onClick={() => navigate("/products")}
            className="
              bg-gradient-to-r from-orange-500 to-orange-600
              hover:from-orange-400 hover:to-orange-500
              text-white
              shadow-[0_0_15px_rgba(255,115,0,0.5)]
              transition
              font-medium
              px-6 py-3 rounded-lg
            "
          >
            Explore Products
          </button>
        </motion.div>
      )}

      {/* GRID */}
      {wishlist.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {wishlist.map((item: any) => {
            const qty = getItemQty(item.id);
            const inCart = qty > 0;

            return (
              <motion.div key={item.id} transition={{ duration: 0.2 }}>
                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="
                    group cursor-pointer
                    bg-[#0b1220]
                    border border-[#1e293b]
                    rounded-2xl
                    p-4
                    transition-all duration-300
                    hover:border-orange-500/40
                    hover:shadow-[0_0_25px_rgba(255,115,0,0.15)]
                  "
                >
                  {/* IMAGE */}
                  <div className="relative bg-[#020617] rounded-xl p-4 mb-3">
                    <img
                      src={item.images[0]}
                      className="w-full h-[140px] object-contain transition"
                    />

                    {/* REMOVE */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item);
                      }}
                      className="
                        absolute top-2 right-2
                        w-8 h-8
                        flex items-center justify-center
                        rounded-full
                        bg-white/10 backdrop-blur
                        hover:bg-red-500/20
                        transition
                      "
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-sm text-white mb-1 line-clamp-1">
                    {item.name}
                  </h3>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-orange-400 font-semibold text-sm">
                      ₹{item.offerPrice || item.price}
                    </span>

                    {item.offerPrice && (
                      <span className="text-gray-500 line-through text-xs">
                        ₹{item.price}
                      </span>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">
                    {inCart ? (
                      <>
                        {/* ✅ QTY CONTROL */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="
                            flex items-center justify-between
                            bg-[#020617]
                            border border-[#1e293b]
                            rounded-lg
                            h-[42px]
                            px-3
                            flex-1
                            "
                        >
                          <button
                            onClick={() => {
                              if (qty === 1) {
                                removeFromCart(item.id);
                              } else {
                                updateQty(item.id, qty - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>

                          <span className="text-white text-sm">{qty}</span>

                          <button onClick={() => updateQty(item.id, qty + 1)}>
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* ✅ CART BUTTON (VISIBLE WITH QTY) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openCart();
                          }}
                          className="
                            h-[42px] min-w-[42px] aspect-square
                            flex items-center justify-center
                            rounded-lg
                            bg-gradient-to-r from-orange-500 to-orange-600
                            hover:from-orange-400 hover:to-orange-500
                            text-white
                            shadow-[0_0_15px_rgba(255,115,0,0.5)]
                            transition
                            "
                        >
                          <ShoppingCart size={16} />
                        </button>
                      </>
                    ) : (
                      /* ✅ INITIAL STATE: ONLY ADD BUTTON */
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdd(item);
                        }}
                        className="
                            w-full h-[42px]
                            bg-gradient-to-r from-orange-500 to-orange-600
                            hover:from-orange-400 hover:to-orange-500
                            text-white
                            shadow-[0_0_15px_rgba(255,115,0,0.5)]
                            transition text-sm font-medium
                            rounded-lg
                        "
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
