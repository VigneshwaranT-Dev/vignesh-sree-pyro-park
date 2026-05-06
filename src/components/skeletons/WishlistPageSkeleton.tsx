import SkeletonBlock from "./SkeletonBlock";
import WishlistCardSkeleton from "./WishlistCardSkeleton";

const WishlistPageSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* 🔥 HEADER */}
      <div className="flex items-center gap-3 mb-10">
        {/* ICON */}
        <SkeletonBlock className="w-14 h-14 rounded-xl" />

        {/* TEXT */}
        <div className="space-y-3">
          <SkeletonBlock className="h-6 w-44 rounded-xl" />
          <SkeletonBlock className="h-4 w-20 rounded-lg" />
        </div>
      </div>

      {/* 🔥 GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <WishlistCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPageSkeleton;
