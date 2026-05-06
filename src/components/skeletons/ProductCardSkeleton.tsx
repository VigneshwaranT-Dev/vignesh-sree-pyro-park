import SkeletonBlock from "./SkeletonBlock";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-3">
      {/* IMAGE */}
      <SkeletonBlock className="h-[180px] rounded-xl mb-4" />

      {/* TITLE */}
      <SkeletonBlock className="h-5 w-[70%] mb-3" />

      {/* PRICE */}
      <div className="flex gap-2 mb-4">
        <SkeletonBlock className="h-5 w-20" />
        <SkeletonBlock className="h-4 w-12" />
      </div>

      {/* BUTTON */}
      <SkeletonBlock className="h-[42px] rounded-xl" />
    </div>
  );
};

export default ProductCardSkeleton;
