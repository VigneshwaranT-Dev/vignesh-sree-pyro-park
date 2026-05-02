export interface Category {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "flower-pots",
    title: "Flower Pots",
    subtitle: "Classic ground sparks",
    image: "/assets/category/flower-pot.png",
  },
  {
    id: "chakra",
    title: "Chakra Crackers",
    subtitle: "Spin the festive joy",
    image: "/assets/category/Chakras.png",
  },
  {
    id: "sparklers",
    title: "Sparklers",
    subtitle: "Safe sparkle fun",
    image: "/assets/category/sprinkler.png",
  },
  {
    id: "sky-shots",
    title: "Sky Shots",
    subtitle: "Light up the sky",
    image: "/assets/category/sky-shot.png",
  },
  {
    id: "gift-boxes",
    title: "Gift Boxes",
    subtitle: "Celebrate, all packed",
    image: "/assets/category/gift-box.png",
  },
];
