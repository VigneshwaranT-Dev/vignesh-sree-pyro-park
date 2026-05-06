import FilterSkeleton from "./FilterSkeleton";
import ProductListSkeleton from "./ProductListSkeleton";
import SkeletonBlock from "./SkeletonBlock";

const ProductsPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* 🔥 LEFT FILTER */}
      <FilterSkeleton />

      {/* 🔥 RIGHT CONTENT */}
      <div className="lg:col-span-3">
        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center mb-5">
          {/* TITLE */}
          <SkeletonBlock className="h-7 w-40 rounded-xl" />

          {/* SORT */}
          <SkeletonBlock className="h-10 w-44 rounded-xl" />
        </div>

        {/* 🔥 PRODUCT LIST */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductListSkeleton key={i} />
          ))}
        </div>

        {/* 🔥 PAGINATION */}
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBlock
              key={i}
              className="
                w-10 h-10
                rounded-xl
              "
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPageSkeleton;
