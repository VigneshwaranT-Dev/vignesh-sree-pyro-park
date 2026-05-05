import type { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";

type Props = {
  children: ReactNode;
};

// 🔥 Add providers here (order matters)
const providers = [
  CartProvider,
  WishlistProvider,
  // AuthProvider,
  // ThemeProvider,
];

const Providers = ({ children }: Props) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
};

export default Providers;
