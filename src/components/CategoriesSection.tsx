import { ArrowRight } from "lucide-react";
import { categories } from "../data/categories";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";

function CategoriesSection() {
  const navigate = useNavigate();
  return (
    <section className="max-w-[1600px] mx-auto px-4 mt-2">

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(6,minmax(0,1fr))] gap-4">

        {categories.slice(0, 5).map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}

        <div className="relative rounded-2xl min-h-[130px]
        flex flex-col items-center justify-center cursor-pointer transition
        bg-[#0f172a] border border-orange-500/40
        hover:bg-orange-500/10"
        onClick={() => navigate("/products")}>

          <ArrowRight className="text-orange-400 mb-2" size={20} />
          <span className="text-sm text-orange-400 font-medium" >
            See All
          </span>
        </div>

      </div>

    </section>
  );
}

export default CategoriesSection;