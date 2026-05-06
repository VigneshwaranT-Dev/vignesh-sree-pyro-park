import type { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { AuthProvider } from "./AuthContext";
import { AddressProvider } from "./AddressContext";

type Props = {
  children: ReactNode;
};

// 🔥 Add providers here (order matters)
const providers = [
  CartProvider,
  WishlistProvider,
  AuthProvider,
  AddressProvider,
];

const Providers = ({ children }: Props) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
};

export default Providers;
