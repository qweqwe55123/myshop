// app/products/[id]/GalleryClient.jsx
"use client";

import { useState } from "react";

export default function GalleryClient({ images = [], alt = "" }) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-[4/3] w-full bg-white rounded-2xl border flex items-center justify-center">
        <span className="text-slate-500">沒有圖片</span>
      </div>
    );
  }

  return (
    <div>
      {/* 主圖：不裁切，置中 */}
      <div className="overflow-hidden rounded-2xl border bg-white flex items-center justify-center p-3">
        <div className="aspect-[4/3] w-full">
          <img
            src={images[index]}
            alt={alt}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* 縮圖列：不裁切，點選切換 */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className={`shrink-0 h-20 w-20 rounded-xl overflow-hidden border transition bg-white
              ${i === index ? "border-slate-900" : "border-slate-200 hover:border-slate-400"}`}
            title={`第 ${i + 1} 張`}
          >
            <div className="h-full w-full flex items-center justify-center p-1">
              <img src={src} alt="" className="max-h-full max-w-full object-contain" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
