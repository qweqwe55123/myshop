"use client";

import { useState } from "react";

// 關閉快取（避免部署後看舊頁面）
export const revalidate = 0;
export const dynamic = "force-dynamic";

// 商品資料
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
    description:
      "極簡設計，鋁合金材質，穩固不晃，適合桌面使用。矽膠止滑、多角度調整。",
  },
};

// 👉 別名（slug）對照，全部指到同一個商品
const ALIAS = {
  "stand-1": "stand-1",
  "minimal-stand": "stand-1",
  "phone-stand": "stand-1",
  "stand": "stand-1",
};

function Gallery({ images = [], alt = "" }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="w-full">
      <div
        className="overflow-hidden rounded-2xl border border-slate-200 cursor-zoom-in"
        onClick={() => setOpen(true)}
        title="點擊放大"
      >
        <div className="aspect-[4/3] w-full bg-slate-100">
          <img src={images[index]} alt={alt} className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className={`shrink-0 h-20 w-20 rounded-xl overflow-hidden border transition
              ${i === index ? "border-slate-900" : "border-slate-200 hover:border-slate-400"}`}
            title={`第 ${i + 1} 張`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition
              ${i === index ? "bg-slate-900" : "bg-slate-300 hover:bg-slate-400"}`}
          />
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute right-5 top-5 text-white text-2xl"
            onClick={() => setOpen(false)}
            aria-label="關閉"
          >
            ✕
          </button>

          <button
            className="absolute left-4 md:left-8 text-white text-4xl select-none"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="上一張"
          >
            ‹
          </button>

          <img
            src={images[index]}
            alt=""
            className="max-w-[92vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 md:right-8 text-white text-4xl select-none"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="下一張"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductDetail({ params }) {
  const raw = decodeURIComponent(params.id || "");
  const key = ALIAS[raw] || raw;     // 先用 alias 對照，找不到就用原值
  const p = DB[key];

  if (!p) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 py-12">
        找不到商品（ID: <code className="bg-slate-100 px-2 py-1 rounded">{raw}</code>）
      </main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-12 grid gap-10 md:grid-cols-2">
      <section>
        <Gallery images={p.images} alt={p.name} />
      </section>

      <section>
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <div className="mt-2 text-rose-600 text-3xl font-extrabold">${p.price}</div>
        <p className="mt-4 text-slate-600 leading-7">{p.description}</p>

        <div className="mt-6 flex items-center gap-3">
          <div className="inline-flex items-center rounded-xl border px-3 py-2">
            <button className="px-2 text-lg">-</button>
            <span className="px-3">1</span>
            <button className="px-2 text-lg">+</button>
          </div>
          <button className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90">
            加入購物車
          </button>
        </div>
      </section>
    </main>
  );
}
