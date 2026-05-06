import ProductCardSkeleton from "./ProductCardSkeleton";
import SkeletonBlock from "./SkeletonBlock";

const RelatedProductsSkeleton = () => {
  return (
    <div className="mt-12">
      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* LEFT ORANGE BAR */}
          <SkeletonBlock className="w-1 h-5 rounded-full" />

          {/* TITLE */}
          <SkeletonBlock className="h-6 w-44 rounded-xl" />
        </div>
      </div>

      {/* 🔥 PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProductsSkeleton;
