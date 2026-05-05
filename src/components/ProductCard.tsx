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

  const isOutOfStock = item?.inStock === false;

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
            <div
              className="absolute top-2 left-2 flex items-center gap-1 
              bg-gradient-to-r from-orange-500 to-orange-600
              shadow-[0_0_15px_rgba(255,115,0,0.5)]
              transition text-white text-[10px] px-2 py-1 rounded-full"
            >
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
        <div
          className="pt-4 border-t border-white/10"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {isOutOfStock ? (
            <button className="bg-gray-700 w-full h-[42px] px-8 rounded-lg">
              Out of Stock
            </button>
          ) : qty === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
                openCart();
              }}
              className="
                  w-full h-[42px] px-10 rounded-lg
                  flex items-center justify-center
                  bg-gradient-to-r from-orange-500 to-orange-600
                  hover:from-orange-400 hover:to-orange-500
                  text-white
                  shadow-[0_0_15px_rgba(255,115,0,0.5)]
                  transition
                "
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-4">
              {/* 🔥 QTY BOX */}
              <div
                className="
                    flex items-center justify-between
                    w-full h-[42px]
                    bg-orange-500/10
                    border border-orange-500/20
                    rounded-lg
                    overflow-hidden
                  "
              >
                <button
                  onClick={() => updateQty(item.id, qty - 1)}
                  className="px-4 h-full hover:bg-orange-500/20"
                >
                  <Minus size={16} />
                </button>

                <span className="px-5 text-sm font-medium">{qty}</span>

                <button
                  onClick={() => updateQty(item.id, qty + 1)}
                  className="px-4 h-full hover:bg-orange-500/20"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* 🔥 VIEW CART BUTTON */}
              <button
                onClick={openCart}
                className="
                    bg-gradient-to-r from-orange-500 to-orange-600
                    hover:from-orange-400 hover:to-orange-500
                    text-white
                    shadow-[0_0_15px_rgba(255,115,0,0.5)]
                    transition
                    h-[41px] min-w-[42px] aspect-square
                    rounded-lg
                    flex items-center justify-center
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
