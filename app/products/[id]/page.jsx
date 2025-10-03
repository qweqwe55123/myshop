// app/products/[id]/page.jsx
export const revalidate = 0;
export const dynamic = "force-dynamic";

import GalleryClient from "./GalleryClient";
import BuyBoxClient from "./BuyBoxClient";
import { products } from "../../data/products";

export default function Page({ params }) {
  const id = params.id;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="p-8">找不到商品</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* 左側圖片 */}
      <GalleryClient images={product.images} />

      {/* 右側資訊與加入購物車 */}
      <BuyBoxClient product={product} />
    </div>
  );
}
