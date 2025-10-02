"use client";
import { useState } from "react";
import { useCart } from "@/app/providers";

const PRODUCTS = [
  { id: "stand-1", name: "手機支架 · Minimal Stand", price: 299, img: "/placeholder.jpg" },
  { id: "stand-2", name: "折疊支架 · Fold Stand", price: 349, img: "/placeholder.jpg" },
  { id: "stand-3", name: "金屬支架 · Metal Stand", price: 399, img: "/placeholder.jpg" },
];

export default function ProductsPage() {
  const { addItem } = useCart();
  const [qty, setQty] = useState({});

  const changeQty = (id, n) => setQty(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + n) }));

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold">商品列表</h1>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {PRODUCTS.map(p => (
          <article key={p.id} className="group bg-white border border-slate-200 rounded-3xl p-4 shadow-sm hover:shadow-lg transition">
            <div className="overflow-hidden rounded-2xl">
              <img src={p.img} alt={p.name} className="w-full h-64 object-cover group-hover:scale-[1.02] transition" />
            </div>
            <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
            <div className="mt-1 text-slate-500 text-sm">極簡設計｜穩固不晃</div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-rose-600 font-extrabold text-2xl">${p.price}</div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2">
                <button onClick={() => changeQty(p.id, -1)} className="w-8 h-8 rounded-lg hover:bg-white">−</button>
                <span className="w-8 text-center tabular-nums">{qty[p.id] || 1}</span>
                <button onClick={() => changeQty(p.id, +1)} className="w-8 h-8 rounded-lg hover:bg-white">＋</button>
              </div>
            </div>

            <button
              onClick={() => addItem(p, qty[p.id] || 1)}
              className="mt-4 w-full rounded-xl bg-black text-white py-3 font-semibold hover:opacity-90"
            >
              加入購物車
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
