import SkeletonBlock from "./SkeletonBlock";

const BannerSkeleton = () => {
  return (
    <SkeletonBlock
      className="
        h-[260px]
        sm:h-[340px]
        md:h-[420px]
        lg:h-[480px]
        rounded-2xl
      "
    />
  );
};

export default BannerSkeleton;
