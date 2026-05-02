import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingCart, Tag, Eye } from "lucide-react";

const ProductCard = ({ item }: { item: any }) => {
  const [qty, setQty] = useState(0);

  return (
    <motion.div
      className="relative cursor-pointer bg-[#0f172a] rounded-2xl p-3 border border-[#1e293b]
      hover:border-orange-500/40 hover:shadow-orange-500/10 transition
      z-0 hover:z-50"
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
        >
          <Eye size={14} />
        </button>

        <img
          src={item.image}
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
            onClick={() => setQty(1)}
            className="w-full cursor-pointer bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition"
          >
            Add
          </button>
        ) : (
          /* QTY + CART */
          <div className="flex items-center gap-3">

            {/* QUANTITY */}
            <div className="flex items-center justify-between bg-[#020617] rounded-lg px-3 py-2 w-full border border-[#1e293b]">
              <button onClick={() => setQty(Math.max(0, qty - 1))}>
                <Minus size={16} className="text-gray-300" />
              </button>

              <span className="text-base font-semibold text-white">
                {qty}
              </span>

              <button onClick={() => setQty(qty + 1)}>
                <Plus size={16} className="text-gray-300" />
              </button>
            </div>

            {/* CART BUTTON */}
            <button className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition">
              <ShoppingCart size={18} />
            </button>

          </div>
        )}

      </div>
    </motion.div>
  );
};

export default ProductCard;