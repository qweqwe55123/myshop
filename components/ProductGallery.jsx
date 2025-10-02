"use client";
import { useEffect, useRef, useState } from "react";

export default function ProductGallery({ images = [], alt = "" }) {
  const [index, setIndex] = useState(0);           // 目前主圖/燈箱索引
  const [open, setOpen] = useState(false);         // 是否開啟燈箱
  const [zoom, setZoom] = useState(1);             // 縮放
  const [pos, setPos] = useState({ x: 0, y: 0 });  // 拖曳位置
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  // 鍵盤快捷鍵
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  // 重置縮放/位置
  const reset = () => {
    setZoom(1);
    setPos({ x: 0, y: 0 });
  };

  // 燈箱內拖曳
  const onDown = (e) => {
    if (zoom === 1) return;
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  };
  const onMove = (e) => {
    if (!dragging.current || zoom === 1) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
  };
  const onUp = () => (dragging.current = false);

  return (
    <div>
      {/* 主圖 */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <img
          src={images[index]}
          alt={alt}
          className="w-full h-[420px] object-cover cursor-zoom-in hover:opacity-95 transition"
          onClick={() => { setOpen(true); reset(); }}
        />
      </div>

      {/* 縮圖列 */}
      <div className="mt-3 flex gap-2">
        {images.map((src, i) => (
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

      {/* 燈箱 */}
      {open && (
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center"
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
        >
          {/* 關閉 */}
          <button
            className="absolute top-4 right-4 text-white/90 hover:text-white text-2xl"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>

          {/* 上一張 */}
          {images.length > 1 && (
            <button
              className="absolute left-4 md:left-8 text-white/90 hover:text-white text-3xl select-none"
              onClick={() => { prev(); reset(); }}
              aria-label="Previous"
            >
              ‹
            </button>
          )}

          {/* 下一張 */}
          {images.length > 1 && (
            <button
              className="absolute right-4 md:right-8 text-white/90 hover:text-white text-3xl select-none"
              onClick={() => { next(); reset(); }}
              aria-label="Next"
            >
              ›
            </button>
          )}

          {/* 影像容器 */}
          <div
            className="relative max-h-[90vh] max-w-[90vw] cursor-grab active:cursor-grabbing"
            onMouseDown={onDown}
            onDoubleClick={() => setZoom((z) => (z === 1 ? 2 : 1))}
            onClick={(e) => {
              // 單擊切換縮放（避免按到左右鍵）
              if ((e.target).tagName === "IMG") setZoom((z) => (z === 1 ? 1.6 : 1));
            }}
          >
            <img
              src={images[index]}
              alt={alt}
              draggable={false}
              className="select-none"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                maxHeight: "90vh",
                maxWidth: "90vw",
              }}
            />
          </div>

          {/* 燈箱縮圖 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => { setIndex(i); reset(); }}
                className={`h-14 w-14 rounded-lg overflow-hidden border
                  ${i === index ? "border-white" : "border-white/40"}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
