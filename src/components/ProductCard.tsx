import { motion } from "framer-motion";
import { Plus, Minus, ShoppingCart, Tag, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOutletContext } from "react-router-dom";

type Props = {
  item: any;
  onQuickView: (item: any) => void;
  onCartClick: (item: any) => void;
  onClickCard: (item: any) => void;
  
};

const ProductCard = ({ item, onQuickView, onCartClick, onClickCard }: Props) => {
  const { addToCart, updateQty, getItemQty, removeFromCart } = useCart();

  const { openCart } = useOutletContext<{ openCart: () => void }>();

  const qty = getItemQty(item.id);

  return (
    <>
      <motion.div
        className="relative cursor-pointer bg-[#0f172a] rounded-2xl p-3 border border-[#1e293b]
        hover:border-orange-500/40 transition
        z-0 hover:bg-[#111827] hover:border-orange-500/40"
        onClick={onClickCard}
      >
        {/* IMAGE BOX */}
        <div className="relative bg-[#020617] rounded-xl p-3">

          {/* 🔥 OFFER BADGE */}
          {item.offer && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">
              <Tag size={10} />
              {item.offer}
            </div>
          )}

          {/* 🔥 QUICK VIEW ICON */}
          <button
            title="Quick View"
            className="absolute top-2 right-2 cursor-pointer bg-white/10 backdrop-blur-sm 
            text-gray-200 p-2 rounded-full hover:bg-white/20 transition"
            onClick={() => onQuickView(item)}
          >
            <Eye size={14} />
          </button>

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

        {/* PRICE + RATING */}
        <div className="flex items-center justify-between mt-2">

          <div className="flex items-center gap-2">
            {/* OFFER PRICE */}
            <span className="font-semibold text-lg text-orange-400">
              ₹{item.offerPrice || item.price}
            </span>

            {/* ORIGINAL PRICE */}
            {item.offerPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{item.price}
              </span>
            )}
          </div>

          {/* RATING */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-gray-300">{item.rating || 4.2}</span>
            <span className="bg-orange-500 text-white text-[10px] px-1 rounded">
              ★
            </span>
          </div>
        </div>

        {/* 🔥 ADD / QTY SECTION */}
        <div className="mt-3">
          {qty === 0 ? (
            /* ADD BUTTON */
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
            /* QTY CONTROLS */
            <div className="flex items-center gap-3">

              {/* QTY BOX */}
              <div className="flex items-center justify-between bg-[#020617] h-[42px] rounded-lg px-3 w-full border border-[#1e293b]" 
              onClick={(e) => {
                  e.stopPropagation();
                }}>

                <button
                  onClick={(e) => {
                    if (qty === 1) {
                      e.stopPropagation();
                      removeFromCart(item.id);
                    } else {
                      e.stopPropagation();
                      updateQty(item.id, qty - 1);
                    }
                  }}
                >
                  <Minus size={16} />
                </button>

                <span className="text-white font-semibold">{qty}</span>

                <button onClick={(e) => {
                  e.stopPropagation();
                  updateQty(item.id, qty + 1)
                }}>
                  <Plus size={16} />
                </button>
              </div>

              {/* CART BUTTON */}
              <button className="bg-orange-500 h-[42px] px-3 rounded-lg" 
              onClick={(e) => {
                  e.stopPropagation();
                  openCart();
                }}>
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