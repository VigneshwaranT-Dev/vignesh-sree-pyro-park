import { motion } from "framer-motion";

type Props = {
  title: string;
  bg: string;
  image: string;
  isSeeAll?: boolean;
};

const CategoryCard = ({ title, bg, image, isSeeAll }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: isSeeAll ? 1.03 : 1.05, y: -4 }}
      className={`relative rounded-2xl h-[120px] w-full
      ${bg} cursor-pointer flex items-center justify-center
      ${isSeeAll ? "bg-[#1a1a2e] border border-orange-500/40" : ""}`}
    >

      {isSeeAll ? (
        <div className="flex flex-col items-center justify-center">
          <div className="text-lg text-orange-400">→</div>
          <span className="text-xs text-orange-400 font-medium mt-1">
            See All
          </span>
        </div>
      ) : (
        <>
          <h2 className="text-white text-base font-semibold absolute left-4 top-4">
            {title}
          </h2>

          <img
            src={image}
            alt={title}
            className="absolute right-4 bottom-4 h-16 opacity-80"
          />
        </>
      )}
    </motion.div>
  );
};

export default CategoryCard;