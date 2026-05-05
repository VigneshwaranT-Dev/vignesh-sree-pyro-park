/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShoppingCart, Tag, Eye, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOutletContext } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";

type Props = {
  item: any;
  onQuickView: (item: any) => void;
  onCartClick: (item: any) => void;
  onClickCard: (item: any) => void;
};

const ProductCard = ({
  item,
  onQuickView,
  onCartClick,
  onClickCard,
}: Props) => {
  const { addToCart, updateQty, getItemQty, removeFromCart } = useCart();
  const { openCart } = useOutletContext<{ openCart: () => void }>();

  const { toggleWishlist, isWishlisted } = useWishlist();
  const liked = isWishlisted(item.id);

  const qty = getItemQty(item.id);

  return (
    <>
      <motion.div
        className="relative cursor-pointer bg-[#0f172a] rounded-2xl p-3 border border-[#1e293b]
        hover:border-orange-500/40 transition z-0 hover:bg-[#111827]"
        onClick={onClickCard}
      >
        {/* IMAGE BOX */}
        <div className="relative bg-[#020617] rounded-xl p-3">
          {/* 🔥 OFFER */}
          {item.offer && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-orange-600 text-white text-[10px] px-2 py-1 rounded-full">
              <Tag size={10} />
              {item.offer}
            </div>
          )}

          <div className="absolute top-2 right-2 flex gap-2 z-10">
            {/* ❤️ WISHLIST */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.08 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(item);
                window.dispatchEvent(
                  new CustomEvent("toast", {
                    detail: {
                      message: liked
                        ? "Removed from wishlist"
                        : "Added to wishlist",
                      type: liked ? "error" : "success",
                    },
                  }),
                );
              }}
              className="
                h-[32px] w-[32px]
                flex items-center justify-center
                rounded-full
                bg-white/10 backdrop-blur-sm
                text-gray-200
                hover:bg-white/20
                transition
              "
            >
              <motion.div
                animate={liked ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <Heart
                  size={14}
                  className={liked ? "fill-orange-500 text-orange-500" : ""}
                />
              </motion.div>
            </motion.button>

            {/* 👁 QUICK VIEW */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(item);
              }}
              className="
                h-[32px] w-[32px]
                flex items-center justify-center
                rounded-full
                bg-white/10 backdrop-blur-sm
                text-gray-200
                hover:bg-white/20
                transition
              "
            >
              <Eye size={14} />
            </button>
          </div>

          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-[140px] object-contain rounded-lg"
          />
        </div>

        {/* TITLE */}
        <p className="text-sm text-gray-200 mt-2 leading-tight line-clamp-2">
          {item.name}
        </p>

        {/* PRICE */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg text-orange-400">
              ₹{item.offerPrice || item.price}
            </span>

            {item.offerPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{item.price}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-gray-300">{item.rating || 4.2}</span>
            <span className="bg-orange-500 text-white text-[10px] px-1 rounded">
              ★
            </span>
          </div>
        </div>

        {/* CART SECTION */}
        <div className="mt-3">
          {qty === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item, 1);
              }}
              className="w-full h-[42px] bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {/* QTY */}
              <div
                className="flex items-center justify-between bg-[#020617] h-[42px] rounded-lg px-3 w-full border border-[#1e293b]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (qty === 1) {
                      removeFromCart(item.id);
                    } else {
                      updateQty(item.id, qty - 1);
                    }
                  }}
                >
                  <Minus size={16} />
                </button>

                <span className="text-white font-semibold">{qty}</span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQty(item.id, qty + 1);
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* CART BTN */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openCart();
                }}
                className="
                  bg-orange-500 hover:bg-orange-600
                  h-[41px] min-w-[42px] aspect-square
                  flex items-center justify-center
                  rounded-lg
                  transition
                "
              >
                <ShoppingCart size={18} />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ProductCard;
