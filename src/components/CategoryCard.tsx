import type { Category } from "../data/categories";

interface Props {
  category: Category;
}

function CategoryCard({ category }: Props) {
  return (
    <div
      className="relative rounded-2xl px-5 py-4 min-h-[130px]
      flex flex-col justify-between cursor-pointer transition

      bg-[#0f172a] border border-[#1e293b]
      hover:bg-[#111827] hover:border-orange-500/40
      hover:shadow-[0_6px_20px_rgba(255,115,0,0.15)]"
    >
      {/* 🔹 TEXT */}
      <div>
        <h3 className="text-sm sm:text-base font-semibold text-gray-100 leading-tight">
          {category.title}
        </h3>

        {category.subtitle && (
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {category.subtitle}
          </p>
        )}
      </div>

      {/* 🔹 IMAGE */}
      <div className="absolute bottom-3 right-3">
        <img
          src={category.image}
          alt={category.title}
          className="h-14 object-contain opacity-80"
        />
      </div>
    </div>
  );
}

export default CategoryCard;