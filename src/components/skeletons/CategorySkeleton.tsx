import SkeletonBlock from "./SkeletonBlock";

const CategorySkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBlock key={i} className="h-[130px] rounded-2xl" />
      ))}
    </div>
  );
};

export default CategorySkeleton;
