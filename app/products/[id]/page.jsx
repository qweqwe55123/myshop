// app/products/[id]/page.jsx  （Server Component）
export const revalidate = 0;         // 伺服器端設定，允許即時
export const dynamic = "force-dynamic";

import GalleryClient from "./GalleryClient";
import BuyBoxClient from "./BuyBoxClient";

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
      "極簡設計，鋁合金材質，穩固不晃，適合桌面使用。防滑止滑、多角度調整。",
  },
};

export default function Page({ params }) {
  const p = DB[params.id];

  if (!p) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="rounded-xl border p-8">
          <h1 className="text-xl font-semibold">找不到這個商品</h1>
          <p className="text-slate-600 mt-2">請回到商品列表再試一次。</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-12 grid gap-10 md:grid-cols-2">
      {/* 左邊：圖片區（不裁切、可切換縮圖） */}
      <section>
        <GalleryClient images={p.images} alt={p.name} />
      </section>

      {/* 右邊：購買區（數量 + 加入購物車） */}
      <section>
        <BuyBoxClient product={p} />
      </section>
    </main>
  );
}
