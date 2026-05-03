import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  offerPrice?: number;
  qty: number;
  images: string[];
};

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {

  // ✅ FIX: Load from localStorage BEFORE first render
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  // ✅ Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (item: any, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + qty } : p
        );
      }

      return [...prev, { ...item, qty }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ FIX: prevent 0 / negative qty
  const updateQty = (id: number, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((p) => p.id !== id);

      return prev.map((p) =>
        p.id === id ? { ...p, qty } : p
      );
    });
  };

  const getItemQty = (id: number) => {
    return cart.find((p) => p.id === id)?.qty || 0;
  };

  // ✅ Derived values (used everywhere)
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.offerPrice || item.price) * item.qty,
    0
  );

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        getItemQty,
        totalItems,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);