import SkeletonBlock from "./SkeletonBlock";
import RelatedProductsSkeleton from "./RelatedProductsSkeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="px-4 md:px-12 py-10 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 🔥 LEFT */}
        <div>
          {/* MAIN IMAGE */}
          <div
            className="
              relative overflow-hidden

              rounded-2xl
              p-8

              bg-gradient-to-b
              from-[#0f172a]
              to-[#0b1220]

              border border-white/[0.06]

              shadow-[0_0_0_1px_rgba(255,255,255,0.02)]

              backdrop-blur-xl
            "
          >
            {/* SHIMMER */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div
                className="
                  absolute top-0 left-[-45%]
                  h-full w-[70%]

                  animate-premium-shimmer

                  bg-gradient-to-r
                  from-transparent
                  via-white/[0.08]
                  to-transparent

                  blur-2xl
                  skew-x-[-20deg]
                "
              />
            </div>

            <div className="relative z-10">
              <div
                className="
                  h-[300px]
                  rounded-2xl

                  bg-[#111827]/80
                  border border-white/[0.03]
                "
              />
            </div>
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock key={i} className="w-16 h-16 rounded-xl" />
            ))}
          </div>
        </div>

        {/* 🔥 RIGHT */}
        <div className="space-y-6">
          {/* TITLE */}
          <SkeletonBlock className="h-10 w-[70%] rounded-xl" />

          {/* RATING */}
          <div className="flex gap-3">
            <SkeletonBlock className="h-5 w-20 rounded-lg" />
            <SkeletonBlock className="h-5 w-28 rounded-lg" />
          </div>

          {/* PRICE */}
          <div className="flex gap-4">
            <SkeletonBlock className="h-10 w-32 rounded-xl" />
            <SkeletonBlock className="h-8 w-20 rounded-lg" />
          </div>

          {/* FEATURES */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <SkeletonBlock className="w-5 h-5 rounded-full" />

                <SkeletonBlock className="h-4 flex-1 rounded-lg" />
              </div>
            ))}
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-3">
            <SkeletonBlock className="h-4 w-full rounded-lg" />
            <SkeletonBlock className="h-4 w-[90%] rounded-lg" />
            <SkeletonBlock className="h-4 w-[75%] rounded-lg" />
          </div>

          {/* ACTIONS */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex gap-4">
              {/* QTY */}
              <SkeletonBlock className="h-[48px] w-[160px] rounded-xl" />

              {/* CART */}
              <SkeletonBlock className="h-[48px] w-[48px] rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* RELATED */}
      <RelatedProductsSkeleton />
    </div>
  );
};

export default ProductDetailsSkeleton;
