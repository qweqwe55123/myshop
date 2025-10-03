// app/products/page.jsx
import Link from "next/link";
import { products } from "../data/products";

export default function ProductsPage() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => {
        const cover =
          product.cover ||
          (product.images && product.images[2]) || // 第3張（純產品）
          (product.images && product.images[0]) || // 沒有就第1張
          "/placeholder.png";

        return (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition"
          >
            {/* 圖片容器：固定比例 + 不裁切 */}
            <div className="aspect-[4/3] w-full bg-white flex items-center justify-center p-3">
              <img
                src={cover}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>

            <div className="p-4 space-y-1">
              <h2 className="font-semibold text-slate-900">{product.name}</h2>
              <p className="text-slate-600">NT$ {product.price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
