const CartItemSkeleton = () => {
  return (
    <div
      className="
        relative overflow-hidden

        flex gap-3

        p-3 rounded-xl

        bg-gradient-to-b
        from-[#020617]
        to-[#0b1220]

        border border-white/[0.06]

        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
      "
    >
      {/* SHIMMER */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
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

      {/* IMAGE */}
      <div
        className="
          relative z-10

          w-16 h-16
          rounded-lg

          bg-[#111827]/80
          border border-white/[0.03]

          shrink-0
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex-1">
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
        <div className="flex justify-between mb-3">
          <div
            className="
              h-4 w-16 rounded-lg

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

        {/* QTY */}
        <div
          className="
            h-8 w-28 rounded-lg

            bg-[#111827]/80
            border border-white/[0.03]
          "
        />
      </div>
    </div>
  );
};

export default CartItemSkeleton;
