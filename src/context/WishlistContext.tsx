import { createContext, useContext, useEffect, useState } from "react";

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  images: string[];
};

const WishlistContext = createContext<any>(null);

export const WishlistProvider = ({ children }: any) => {
  // ✅ Load from localStorage
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ❤️ Toggle (add/remove)
  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) {
        return prev.filter((p) => p.id !== item.id);
      }

      return [...prev, item];
    });
  };

  const isWishlisted = (id: number) => {
    return wishlist.some((p) => p.id === id);
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
