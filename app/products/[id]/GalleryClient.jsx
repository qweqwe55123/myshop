"use client";

import { useEffect, useRef, useState } from "react";

export default function GalleryClient({ images = [], alt = "" }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const thumbsRef = useRef(null);

  useEffect(() => {
    const el = thumbsRef.current?.querySelector(`[data-i="${index}"]`);
    el?.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
  }, [index]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="w-full">
      {/* 主圖，點擊全螢幕 */}
      <div
        className="overflow-hidden rounded-2xl border border-slate-200 cursor-zoom-in"
        onClick={() => setOpen(true)}
        title="點擊放大"
      >
        <div className="aspect-[4/3] w-full bg-slate-100">
          <img src={images[index]} alt={alt} className="h-full w-full object-cover" />
        </div>
      </div>

      {/* 縮圖列 */}
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

      {/* 小圓點 */}
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

      {/* 全螢幕檢視（無外掛） */}
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
