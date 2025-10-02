// app/products/[id]/page.jsx
"use client";
import { useState } from "react";

const DB = {
  "stand-1": {
    id: "stand-1",
    name: "手機支架 · Minimal Stand",
    price: 299,
    images: [
      "/products/stand-1/1.jpg",
      "/products/stand-1/2.jpg",
      "/products/stand-1/3.jpg",
      "/products/stand-1/4.jpg",
      "/products/stand-1/5.jpg",
      "/products/stand-1/6.jpg",
    ],
    description: "極簡設計，鋁合金材質，穩固不晃，適合桌面使用。",
  },
};

export default function ProductDetail({ params }) {
  const p = DB[params.id];
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  if (!p) return <div className="max-w-[1200px] mx-auto px-4 py-12">找不到商品</div>;

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-12 grid gap-10 md:grid-cols-2">
      {/* 簡單畫廊（點主圖放大可以先之後再加 Lightbox） */}
      <div>
        <div className="overflow-hidden rounded-2xl border">
          <img
            src={p.images[idx]}
            alt={p.name}
            className="w-full h-[420px] object-cover cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="mt-3 flex gap-2">
          {p.images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIdx(i)}
              className={`h-16 w-16 overflow-hidden rounded-xl border ${i === idx ? "border-slate-900" : "border-slate-200"}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <section>
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <div className="mt-2 text-rose-600 text-3xl font-extrabold">${p.price}</div>
        <p className="mt-4 text-slate-600 leading-7">{p.description}</p>
      </section>
    </main>
  );
}
