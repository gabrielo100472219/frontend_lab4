import { useState, type ReactNode } from "react";
import type { Coffee } from "../coffees/model";
import { CartContext } from "./cart-context";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Coffee[]>([]);

  function addToCart(coffee: Coffee) {
    setCart((previous) => [...previous, coffee]);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
