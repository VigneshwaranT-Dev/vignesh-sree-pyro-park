type Props = {
  className?: string;
};

const SkeletonBlock = ({ className = "" }: Props) => {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-lg
        bg-[#0f172a]
        border border-white/5
        ${className}
      `}
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
  );
};

export default SkeletonBlock;
