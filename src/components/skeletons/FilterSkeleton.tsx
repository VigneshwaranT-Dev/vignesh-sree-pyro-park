const FilterSkeleton = () => {
  return (
    <div
      className="
        relative overflow-hidden

        rounded-2xl
        p-5

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
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div
          className="
            absolute top-0 left-[-45%]
            h-full w-[90%]

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
        {/* 🔥 TITLE */}
        <div
          className="
            h-5 w-24 mb-8

            rounded-lg

            bg-[#111827]/80
            border border-white/[0.03]
          "
        />

        {/* 🔥 PRICE */}
        <div className="mb-8">
          <div
            className="
              h-4 w-16 mb-4

              rounded-lg

              bg-[#111827]/80
              border border-white/[0.03]
            "
          />

          <div className="flex justify-between mb-4">
            <div
              className="
                h-4 w-12 rounded-lg

                bg-[#111827]/80
                border border-white/[0.03]
              "
            />

            <div
              className="
                h-4 w-12 rounded-lg

                bg-[#111827]/80
                border border-white/[0.03]
              "
            />
          </div>

          {/* 🔥 RANGE BAR */}
          <div
            className="
              h-[4px] rounded-full

              bg-[#111827]/80
              border border-white/[0.03]
            "
          />
        </div>

        {/* 🔥 CHECKBOX GROUPS */}
        {[1, 2, 3].map((section) => (
          <div key={section} className="mb-8">
            {/* SECTION TITLE */}
            <div
              className="
                h-4 w-20 mb-4

                rounded-lg

                bg-[#111827]/80
                border border-white/[0.03]
              "
            />

            {/* ITEMS */}
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  {/* CHECKBOX */}
                  <div
                    className="
                      w-4 h-4 rounded

                      bg-[#111827]/80
                      border border-white/[0.03]
                    "
                  />

                  {/* LABEL */}
                  <div
                    className="
                      h-4 w-28 rounded-lg

                      bg-[#111827]/80
                      border border-white/[0.03]
                    "
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSkeleton;
