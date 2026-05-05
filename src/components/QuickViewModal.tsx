import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Star, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useOutletContext } from "react-router-dom";

type Props = {
  item: any;
  isOpen: boolean;
  onClose: () => void;
};

const QuickViewModal = ({ item, isOpen, onClose }: Props) => {
  const [activeImg, setActiveImg] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { cart, addToCart, updateQty } = useCart();

  const isOutOfStock = item?.inStock === false;

  const cartItem = cart.find((c: any) => c.id === item?.id);
  const qty = cartItem?.qty || 0;

  useEffect(() => {
    if (!isOpen) return;
    const scrollBar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBar}px`;

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  // ⌨️ ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // basic focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last?.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first?.focus();
          e.preventDefault();
        }
      }
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // focus first element when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const btn = dialogRef.current?.querySelector<HTMLElement>("button");
        btn?.focus();
      }, 0);
    }
  }, [isOpen]);

  if (!item) return null;

  const images: string[] =
    item.images && item.images.length ? item.images : [item.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🔥 Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 🔥 Modal wrapper */}
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 🔥 Modal box */}
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-5xl bg-[#0f172a] rounded-2xl border border-[#1e293b]
              shadow-[0_30px_100px_rgba(0,0,0,0.8)] p-6"
              initial={{ scale: 0.96, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 30 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="
                    absolute top-4 right-4
                    bg-[#020617] border border-[#1e293b]
                    p-2 rounded-full
                    hover:bg-orange-500/20 hover:border-orange-500/40
                    transition
                "
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="relative bg-[#020617] rounded-xl p-4 overflow-hidden group">
                    {item.offer && (
                      <div
                        className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600
                        text-white
                        shadow-[0_0_15px_rgba(255,115,0,0.5)]
                        transition text-xs px-2 py-1 rounded-full z-10"
                      >
                        {item.offer}
                      </div>
                    )}

                    {/* zoom-on-hover */}
                    <img
                      src={images[activeImg]}
                      alt={item.name}
                      className="h-[260px] w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      draggable={false}
                    />
                  </div>

                  {/* thumbnails */}
                  {images.length > 1 && (
                    <div className="flex gap-3 mt-4 justify-center">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className={`border rounded-lg p-1 ${
                            i === activeImg
                              ? "border-orange-500"
                              : "border-[#1e293b]"
                          }`}
                        >
                          <img src={img} className="h-12 w-12 object-contain" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 📄 RIGHT */}
                <div>
                  <p className="text-xs text-gray-400">
                    Premium Crackers Collection
                  </p>

                  <h2 className="text-2xl font-semibold text-white mt-1">
                    {item.name}
                  </h2>

                  {/* rating */}
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <Star
                      size={14}
                      className="text-orange-400 fill-orange-400"
                    />
                    <span className="text-gray-300">
                      {item.rating || 4.5} Rating
                    </span>
                    <span className="text-gray-500 text-xs">
                      ({item.reviews || 15} reviews)
                    </span>
                  </div>

                  {/* price */}
                  <div className="flex items-center gap-3 mt-5">
                    <span className="text-3xl font-bold text-orange-400">
                      ₹{item.offerPrice || item.price}
                    </span>
                    {item.offerPrice && (
                      <span className="text-gray-500 line-through">
                        ₹{item.price}
                      </span>
                    )}
                  </div>

                  <hr className="my-5 border-[#1e293b]" />

                  {/* qty + add */}
                  <div className="pt-4 border-t border-white/10">
                    {isOutOfStock ? (
                      <button className="bg-gray-700 w-full h-[42px] px-8 rounded-lg">
                        Out of Stock
                      </button>
                    ) : qty === 0 ? (
                      <button
                        onClick={() => {
                          addToCart(item);
                        }}
                        className="
                          bg-gradient-to-r from-orange-500 to-orange-600
                          hover:from-orange-400 hover:to-orange-500
                          text-white
                          shadow-[0_0_15px_rgba(255,115,0,0.5)]
                          transition
                          h-[42px] px-10 rounded-lg
                          flex items-center justify-center
                        "
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center gap-4">
                        {/* 🔥 QTY BOX */}
                        <div
                          className="
                            flex items-center
                            h-[42px]
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

                          <span className="px-5 text-sm font-medium">
                            {qty}
                          </span>

                          <button
                            onClick={() => updateQty(item.id, qty + 1)}
                            className="px-4 h-full hover:bg-orange-500/20"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* description */}
                  <div className="mt-5 text-sm text-gray-400 leading-relaxed">
                    <p>Category: Crackers</p>
                    <p className="mt-2">
                      Premium quality festive crackers with vibrant lighting
                      effects. Perfect for celebrations.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
