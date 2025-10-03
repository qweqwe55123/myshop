// app/products/[id]/page.jsx
export const revalidate = 0;
export const dynamic = "force-dynamic";

import GalleryClient from "./GalleryClient";
import BuyBoxClient from "./BuyBoxClient";

// 這裡我放一個最小 DB，先確保找得到資料
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
      "極簡設計，鋁合金材質，穩固不晃，適合桌面使用。矽膠止滑，多角度調整。",
  },
};

export default function Page({ params }) {
  const id = params.id;
  const product = DB[id];

  if (!product) {
    return <div className="p-8">找不到商品</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* 左側圖片（你自己的 GalleryClient 已經可以縮圖 + 點放大） */}
      <GalleryClient images={product.images} />

      {/* 右側資訊與加入購物車 */}
      <BuyBoxClient product={product} />
    </div>
  );
}
