import ProductCardSkeleton from "./ProductCardSkeleton";
import SkeletonBlock from "./SkeletonBlock";

const ProductSectionSkeleton = () => {
  return (
    <div className="mt-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <SkeletonBlock className="h-7 w-52" />

        <SkeletonBlock className="h-5 w-20" />
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default ProductSectionSkeleton;
