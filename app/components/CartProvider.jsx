"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // 讀 / 寫 localStorage（避免刷新遺失）
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (p) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === p.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setItems((prev) => prev.filter((x) => x.id !== id));

  const clearCart = () => setItems([]);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, clearCart }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
