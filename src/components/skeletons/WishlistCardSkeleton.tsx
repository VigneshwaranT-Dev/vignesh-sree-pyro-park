const WishlistCardSkeleton = () => {
  return (
    <div
      className="
        relative overflow-hidden

        rounded-2xl
        p-4

        bg-gradient-to-b
        from-[#0f172a]
        to-[#0b1220]

        border border-white/[0.06]

        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]

        backdrop-blur-xl
      "
    >
      {/* 🔥 SOFT TOP LIGHT */}
      <div
        className="
          absolute inset-0 rounded-2xl

          bg-gradient-to-b
          from-white/[0.015]
          via-transparent
          to-transparent

          pointer-events-none
        "
      />

      {/* 🔥 SHIMMER */}
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

      {/* CONTENT */}
      <div className="relative z-10">
        {/* IMAGE */}
        <div
          className="
            relative
            border border-white/[0.03]

            rounded-xl
            p-4
            mb-4
            h-[170px]
          "
        >
          {/* REMOVE BTN */}
          <div
            className="
              absolute top-2 right-2

              w-8 h-8 rounded-full

              bg-[#111827]/80
              border border-white/[0.03]
            "
          />
        </div>

        {/* TITLE */}
        <div
          className="
            h-4 w-[80%]
            rounded-lg mb-3

            bg-[#111827]/80
            border border-white/[0.03]
          "
        />

        {/* PRICE */}
        <div className="flex gap-2 mb-5">
          <div
            className="
              h-4 w-16 rounded-lg

              bg-[#111827]/80
              border border-white/[0.03]
            "
          />

          <div
            className="
              h-4 w-10 rounded-lg

              bg-[#111827]/80
              border border-white/[0.03]
            "
          />
        </div>

        {/* BUTTON */}
        <div
          className="
            h-[42px]
            rounded-xl

            bg-[#111827]/80
            border border-white/[0.03]
          "
        />
      </div>
    </div>
  );
};

export default WishlistCardSkeleton;
