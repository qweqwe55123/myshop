import Link from "next/link";
import { products } from "../data/products";

export default function ProductsPage() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => {
        const cover =
          product.cover ||
          (product.images && product.images[2]) ||
          (product.images && product.images[0]) ||
          "/placeholder.png";

        return (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl transition"
          >
            <div className="aspect-[4/3] w-full flex items-center justify-center bg-slate-50">
              <img
                src={cover}
                alt={product.name}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition"
                loading="lazy"
              />
            </div>

            {/* 下半部黑框區塊 */}
            <div className="p-4 bg-black">
  <h2 className="font-semibold text-white">{product.name}</h2>
  <p className="text-gray-200 mt-1">NT$ {product.price}</p>
</div>
          </Link>
        );
      })}
    </div>
  );
}
