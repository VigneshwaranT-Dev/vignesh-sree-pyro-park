import BannerSkeleton from "./BannerSkeleton";
import CategorySkeleton from "./CategorySkeleton";
import ProductSectionSkeleton from "./ProductSectionSkeleton";
import MapSkeleton from "./MapSkeleton";

const HomePageSkeleton = () => {
  return (
    <div className="mt-4 px-4">
      {/* CATEGORY */}
      <div className="mb-6">
        <CategorySkeleton />
      </div>

      {/* BANNER */}
      <BannerSkeleton />

      {/* PRODUCT SECTIONS */}
      <ProductSectionSkeleton />
      <ProductSectionSkeleton />
      <ProductSectionSkeleton />

      {/* MAP */}
      <MapSkeleton />
    </div>
  );
};

export default HomePageSkeleton;
