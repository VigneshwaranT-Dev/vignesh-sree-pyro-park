const ProductListSkeleton = () => {
  return (
    <div
      className="
        relative overflow-hidden

        flex gap-4 p-5

        rounded-2xl

        bg-gradient-to-b
        from-[#0f172a]
        to-[#0b1220]

        border border-white/[0.06]

        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]

        backdrop-blur-xl
      "
    >
      {/* 🔥 SOFT TOP HIGHLIGHT */}
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

      {/* 🔥 PREMIUM SHIMMER */}
      <div
        className="
          absolute inset-0 overflow-hidden
          rounded-2xl
        "
      >
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

      {/* 🔥 IMAGE */}
      <div
        className="
          relative z-10

          w-[120px] h-[120px]
          shrink-0

          rounded-xl

          bg-[#111827]/80
          border border-white/[0.03]
        "
      />

      {/* 🔥 RIGHT CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col justify-between">
        {/* TOP */}
        <div>
          {/* TITLE */}
          <div
            className="
              h-5 w-[180px]
              rounded-lg

              bg-[#111827]/80
              border border-white/[0.03]
            "
          />

          {/* RATING */}
          <div className="flex gap-2 mt-3">
            <div
              className="
                h-3 w-14 rounded-lg

                bg-[#111827]/80
                border border-white/[0.03]
              "
            />

            <div
              className="
                h-3 w-20 rounded-lg

                bg-[#111827]/80
                border border-white/[0.03]
              "
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mt-4 space-y-2">
            <div
              className="
                h-3 w-full rounded-lg

                bg-[#111827]/80
                border border-white/[0.03]
              "
            />

            <div
              className="
                h-3 w-[90%] rounded-lg

                bg-[#111827]/80
                border border-white/[0.03]
              "
            />
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex items-center justify-between mt-4">
          {/* PRICE */}
          <div className="space-y-2">
            <div
              className="
                h-5 w-20 rounded-lg

                bg-[#111827]/80
                border border-white/[0.03]
              "
            />

            <div
              className="
                h-3 w-14 rounded-lg

                bg-[#111827]/80
                border border-white/[0.03]
              "
            />
          </div>

          {/* BUTTON */}
          <div
            className="
              h-[38px] w-[130px]

              rounded-xl

              bg-[#111827]/80
              border border-white/[0.03]
            "
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListSkeleton;
