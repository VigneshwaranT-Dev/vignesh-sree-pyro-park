export type Category = {
  title: string;
  bg: string;
  image: string;
  isSeeAll?: boolean;
};

export const categories: Category[] = [
  {
    title: "Aerial Shots",
    bg: "bg-gradient-to-r from-purple-900 to-indigo-900",
    image: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
  },
  {
    title: "Sparklers",
    bg: "bg-gradient-to-r from-yellow-700 to-orange-500",
    image: "https://cdn-icons-png.flaticon.com/512/616/616494.png",
  },
  {
    title: "Rockets",
    bg: "bg-gradient-to-r from-blue-900 to-cyan-700",
    image: "https://cdn-icons-png.flaticon.com/512/3212/3212608.png",
  },
  {
    title: "Gift Boxes",
    bg: "bg-gradient-to-r from-pink-800 to-red-600",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
  },
  {
    title: "Fancy Items",
    bg: "bg-gradient-to-r from-indigo-800 to-purple-700",
    image: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  },

  // 🔥 SEE ALL AS CATEGORY
  {
    title: "See All",
    bg: "bg-[#1a1a2e]",
    image: "➡️", // can also use icon
    isSeeAll: true,
  },
];
