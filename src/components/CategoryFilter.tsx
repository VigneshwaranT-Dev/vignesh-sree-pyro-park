const categories = [
  { label: "All", value: null },
  { label: "Flower Pots", value: "flower-pots" },
  { label: "Sky Shots", value: "sky-shots" },
  { label: "Sparklers", value: "sparklers" },
  { label: "Gift Boxes", value: "gift-boxes" },
];

type Props = {
  selected: string | null;
  onChange: (val: string | null) => void;
};

const CategoryFilter = ({ selected, onChange }: Props) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">

      {categories.map((cat) => (
        <button
          key={cat.label}
          onClick={() => onChange(cat.value)}
          className={`
            px-4 py-2 rounded-lg text-sm whitespace-nowrap
            border transition
            ${
              selected === cat.value
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-[#020617] text-gray-300 border-[#1e293b] hover:border-orange-400"
            }
          `}
        >
          {cat.label}
        </button>
      ))}

    </div>
  );
};

export default CategoryFilter;