// app/products/[id]/page.jsx
"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

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

export default function ProductDetail({ params }) {
  const p = DB[params.id];
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!p) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 py-12">找不到商品</main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-12 grid gap-10 md:grid-cols-2">
      {/* 左：圖片區 */}
      <section>
        {/* 主圖（固定比例縮圖，點擊開燈箱） */}
        <div
          className="overflow-hidden rounded-2xl border border-slate-200 cursor-zoom-in"
          onClick={() => setOpen(true)}
        >
          <div className="aspect-[4/3] w-full">
            <img
              src={p.images[index]}
              alt={p.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* 縮圖列（切換主圖） */}
        <div className="mt-3 flex gap-2">
          {p.images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIndex(i)}
              className={`h-16 w-16 overflow-hidden rounded-xl border transition
                ${i === index ? "border-slate-900" : "border-slate-200 hover:border-slate-400"}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Lightbox（放大檢視 + 縮圖 + 縮放） */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={p.images.map((src) => ({ src }))}
          plugins={[Zoom, Thumbnails]}
          zoom={{ maxZoomPixelRatio: 3, zoomInMultiplier: 1.3 }}
          thumbnails={{ position: "bottom" }}
          on={{ view: ({ index: i }) => setIndex(i) }}
        />
      </section>

      {/* 右：商品資訊 */}
      <section>
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <div className="mt-2 text-rose-600 text-3xl font-extrabold">${p.price}</div>
        <p className="mt-4 text-slate-600 leading-7">{p.description}</p>
      </section>
    </main>
  );
}
