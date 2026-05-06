import { motion } from "framer-motion";
import SkeletonBlock from "./SkeletonBlock";
import CartItemSkeleton from "./CartItemSkeleton";

const CartDrawerSkeleton = () => {
  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]" />

      {/* DRAWER */}
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
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
          <SkeletonBlock className="h-6 w-28 rounded-xl" />

          <SkeletonBlock className="w-8 h-8 rounded-lg" />
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-[#1e293b]">
          {/* TOTAL */}
          <div className="flex justify-between mb-2">
            <SkeletonBlock className="h-5 w-16 rounded-lg" />

            <SkeletonBlock className="h-6 w-24 rounded-xl" />
          </div>

          {/* BUTTONS */}
          <div className="space-y-3">
            <SkeletonBlock className="h-[42px] rounded-lg" />

            <SkeletonBlock className="h-[42px] rounded-lg" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CartDrawerSkeleton;
