"use client";

import { useState } from "react";
import { useCart } from "../../components/CartProvider";

export default function BuyBoxClient({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const add = () => setQty(q => Math.min(99, q + 1));
  const sub = () => setQty(q => Math.max(1, q - 1));

  return (
    <div className="p-6 space-y-4 border rounded-xl bg-white">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg text-slate-600">NT$ {product.price}</p>

      {/* 數量控制 */}
      <div className="flex items-center gap-3">
        <button onClick={sub} className="w-9 h-9 border rounded-lg">-</button>
        <input
          value={qty}
          onChange={(e)=>setQty(Math.max(1, Math.min(99, Number(e.target.value)||1)))}
          className="w-14 h-9 text-center border rounded-lg"
        />
        <button onClick={add} className="w-9 h-9 border rounded-lg">+</button>
      </div>

      <button
        onClick={() => addToCart(product, qty)}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
      >
        加入購物車
      </button>
    </div>
  );
}
