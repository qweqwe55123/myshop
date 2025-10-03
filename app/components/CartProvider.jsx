"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // 初始化讀 localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // 每次變更都寫回 localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (p, qty = 1) => {
    const n = Math.max(1, Number(qty) || 1);
    setItems(prev => {
      const i = prev.findIndex(x => x.id === p.id);
      let next;
      if (i >= 0) {
        next = [...prev];
        next[i] = { ...next[i], qty: (next[i].qty || 0) + n };
      } else {
        next = [...prev, { ...p, qty: n }];
      }
      // 小小診斷：你可在瀏覽器 console 看到更新
      console.log("[Cart] add", { id: p.id, n, next });
      return next;
    });
  };

  const removeFromCart = (id) => setItems(prev => prev.filter(x => x.id !== id));
  const clearCart = () => setItems([]);

  const value = useMemo(() => ({ items, addToCart, removeFromCart, clearCart }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
