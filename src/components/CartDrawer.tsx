import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartDrawerSkeleton from "./skeletons/CartDrawerSkeleton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CartDrawer = ({ isOpen, onClose }: Props) => {
  const { cart, updateQty, removeFromCart } = useCart();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // 🔒 LOCK BODY SCROLL
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 🔥 LOADING
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // 🔥 TOTAL
  const total = cart.reduce(
    (acc: number, item: any) =>
      acc + (item.offerPrice || item.price) * item.qty,
    0,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🔥 BACKDROP */}
          <motion.div
            className="
              fixed inset-0
              bg-black/60
              backdrop-blur-sm
              z-[999]
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 🔥 DRAWER */}
          <motion.div
            className="
              fixed top-0 right-0 h-full
              w-[90%] sm:w-[400px]

              bg-[#0f172a]
              border-l border-[#1e293b]

              z-[1000]

              flex flex-col
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
          >
            {/* 🔥 FULL DRAWER SKELETON */}
            {isLoading ? (
              <CartDrawerSkeleton />
            ) : (
              <>
                {/* HEADER */}
                <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
                  <h2 className="text-white font-semibold text-lg">
                    Your Cart
                  </h2>

                  <button onClick={onClose}>
                    <X className="text-gray-400 hover:text-orange-400 transition" />
                  </button>
                </div>

                {/* ITEMS */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 cart-scroll">
                  {cart.length === 0 ? (
                    <p className="text-gray-400 text-center mt-10">
                      Your cart is empty
                    </p>
                  ) : (
                    cart.map((item: any) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="
                          flex gap-3
                          bg-[#020617]
                          p-3 rounded-xl
                          border border-[#1e293b]
                          hover:border-orange-500/30
                          transition
                        "
                      >
                        {/* IMAGE */}
                        <div
                          className="
                            w-16 h-16
                            bg-[#0f172a]
                            rounded-lg
                            flex items-center justify-center
                            border border-[#1e293b]
                          "
                        >
                          <img
                            src={item.images[0]}
                            className="h-12 object-contain"
                          />
                        </div>

                        {/* DETAILS */}
                        <div className="flex-1 flex flex-col justify-between">
                          {/* TITLE */}
                          <p className="text-sm text-white font-medium line-clamp-1">
                            {item.name}
                          </p>

                          {/* PRICE */}
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-orange-400 text-sm font-semibold">
                              ₹{item.offerPrice || item.price}
                            </span>

                            <span className="text-xs text-gray-400">
                              ₹{(item.offerPrice || item.price) * item.qty}
                            </span>
                          </div>

                          {/* QTY */}
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className="
                                flex items-center gap-2
                                bg-[#0f172a]
                                border border-[#1e293b]
                                rounded-md
                                px-2 py-1
                              "
                            >
                              <button
                                onClick={() =>
                                  item.qty === 1
                                    ? removeFromCart(item.id)
                                    : updateQty(item.id, item.qty - 1)
                                }
                                className="hover:text-orange-400 transition"
                              >
                                <Minus size={14} />
                              </button>

                              <span className="text-sm text-white min-w-[16px] text-center">
                                {item.qty}
                              </span>

                              <button
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                className="hover:text-orange-400 transition"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* REMOVE */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="
                                ml-auto
                                text-gray-400
                                hover:text-red-400
                                transition
                              "
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* FOOTER */}
                <div className="p-4 border-t border-[#1e293b]">
                  {/* TOTAL */}
                  <div className="flex justify-between text-white mb-3">
                    <span>Total</span>

                    <span className="text-orange-400 font-semibold text-lg">
                      ₹{total}
                    </span>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-col gap-2">
                    <button
                      className="
                        w-full
                        border border-[#1e293b]
                        text-gray-300
                        py-2 rounded-lg
                        hover:bg-[#020617]
                        transition
                      "
                      onClick={() => {
                        onClose();
                        navigate("/cart");
                      }}
                    >
                      View Cart
                    </button>

                    <button
                      className="
                        w-full py-2 rounded-lg
                        text-white font-medium
                        bg-gradient-to-r
                        from-orange-500
                        to-orange-600
                        hover:from-orange-400
                        hover:to-orange-500
                        shadow-[0_0_15px_rgba(255,115,0,0.5)]
                        transition
                      "
                      onClick={() => {
                        onClose();
                        navigate("/checkout");
                      }}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
