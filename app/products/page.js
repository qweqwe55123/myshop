export const revalidate = 0;
export const dynamic = 'force-dynamic';

// app/products/page.jsx
import Link from "next/link";

const PRODUCT = {
  id: "stand-1",
  name: "手機支架 · Minimal Stand",
  price: 299,
  img: "/products/stand-1/1.jpg",   // 確認圖片放在 public/products/stand-1/ 裡
  tagline: "極簡設計｜穩固不晃",
};

export default function ProductsPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold">商品列表</h1>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        <article className="group bg-white border border-slate-200 rounded-3xl p-4 shadow-sm hover:shadow-lg transition">
          <Link href={`/products/${PRODUCT.id}`} className="block overflow-hidden rounded-2xl">
            {/* 圖片縮圖：固定比例 4:3 */}
            <div className="aspect-[4/3] w-full">
              <img
                src={PRODUCT.img}
                alt={PRODUCT.name}
                className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                loading="lazy"
              />
            </div>
          </Link>

          <Link href={`/products/${PRODUCT.id}`}>
            <h3 className="mt-3 text-lg font-semibold">{PRODUCT.name}</h3>
          </Link>
          <div className="mt-1 text-slate-500 text-sm">{PRODUCT.tagline}</div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-rose-600 font-extrabold text-2xl">
              ${PRODUCT.price}
            </div>
          </div>

          <Link
            href={`/products/${PRODUCT.id}`}
            className="mt-4 w-full inline-flex items-center justify-center rounded-xl bg-black text-white py-3 font-semibold hover:opacity-90"
          >
            查看商品
          </Link>
        </article>
      </div>
    </main>
  );
}
