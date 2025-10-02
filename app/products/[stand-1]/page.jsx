"use client";

import { useEffect, useRef, useState } from "react";

/** 你可以把這個 DB 改成從後端/檔案載入 */
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

/** 只用 React 做的畫廊（主圖 + 縮圖列 + 小圓點 + 全螢幕檢視） */
function Gallery({ images = [], alt = "" }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const thumbsRef = useRef(null);

  // 讓目前的縮圖自動捲到可視範圍
  useEffect(() => {
    const el = thumbsRef.current?.querySelector(`[data-i="${index}"]`);
    el?.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
  }, [index]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="w-full">
      {/* 主圖區：4:3 比例，點擊可全螢幕 */}
      <div
        className="overflow-hidden rounded-2xl border border-slate-200 cursor-zoom-in"
        onClick={() => setOpen(true)}
        title="點擊放大"
      >
        <div className="aspect-[4/3] w-full bg-slate-100">
          <img
            src={images[index]}
            alt={alt}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
      </div>

      {/* 縮圖列（可水平滑動） */}
      <div
        ref={thumbsRef}
        className="mt-4 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <button
            key={src}
            data-i={i}
            onClick={() => setIndex(i)}
            className={`shrink-0 h-20 w-20 rounded-xl overflow-hidden border transition
              ${i === index ? "border-slate-900" : "border-slate-200 hover:border-slate-400"}`}
            title={`第 ${i + 1} 張`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* 小圓點指示器 */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`切換到第 ${i + 1} 張`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition
              ${i === index ? "bg-slate-900" : "bg-slate-300 hover:bg-slate-400"}`}
          />
        ))}
      </div>

      {/* 全螢幕檢視（無外掛） */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          {/* 關閉鍵 */}
          <button
            className="absolute right-5 top-5 text-white text-2xl"
            onClick={() => setOpen(false)}
            aria-label="關閉"
          >
            ✕
          </button>

          {/* 左右切換 */}
          <button
            className="absolute left-4 md:left-8 text-white text-4xl select-none"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
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
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
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
  const p = DB[params.id];

  if (!p) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 py-12">找不到商品</main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-12 grid gap-10 md:grid-cols-2">
      {/* 左：畫廊（主圖 + 縮圖 + 小圓點 + 全螢幕） */}
      <section>
        <Gallery images={p.images} alt={p.name} />
      </section>

      {/* 右：商品資訊 + 加入購物車（保留你原本的區塊） */}
      <section>
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <div className="mt-2 text-rose-600 text-3xl font-extrabold">${p.price}</div>
        <p className="mt-4 text-slate-600 leading-7">{p.description}</p>

        {/* 這裡就是你原本的加入購物車那些 */}
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
