export const revalidate = 0;              // 伺服器端設定，允許
export const dynamic = "force-dynamic";   // 伺服器端設定，允許

import GalleryClient from "./GalleryClient";

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

// 可選：別名對照，避免網址不同寫法找不到
const ALIAS = {
  "stand-1": "stand-1",
  "minimal-stand": "stand-1",
  "phone-stand": "stand-1",
  "stand": "stand-1",
};

export default function ProductDetail({ params }) {
  const raw = decodeURIComponent(params.id || "");
  const key = ALIAS[raw] || raw;
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
        <GalleryClient images={p.images} alt={p.name} />
      </section>

      <section>
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <div className="mt-2 text-rose-600 text-3xl font-extrabold">${p.price}</div>
        <p className="mt-4 text-slate-600 leading-7">{p.description}</p>

        {/* 你的購物車區塊保留 */}
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
