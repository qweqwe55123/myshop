"use client";
import Link from "next/link";
import { useCart } from "@/app/providers";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, clear } = useCart();

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold">購物車</h1>

      {items.length === 0 ? (
        <div className="mt-6 text-slate-600">
          購物車是空的。<Link href="/products" className="text-blue-600"> 去逛逛商品 →</Link>
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg border" />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-slate-500">${item.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 rounded-lg border">−</button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 rounded-lg border">＋</button>
                </div>
                <div className="w-24 text-right font-semibold">${item.price * item.qty}</div>
                <button onClick={() => removeItem(item.id)} className="text-sm text-slate-500 hover:text-black">移除</button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-lg">小計</div>
            <div className="text-2xl font-extrabold">${subtotal}</div>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={clear} className="rounded-xl border px-4 py-3">清空購物車</button>
            <button className="rounded-xl bg-black text-white px-5 py-3 font-semibold hover:opacity-90">
              前往結帳（之後串接）
            </button>
          </div>
        </>
      )}
    </main>
  );
}
