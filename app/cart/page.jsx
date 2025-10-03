"use client";

import { useCart } from "../components/CartProvider";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();

  const total = items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 0), 0);

  if (!items.length) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">購物車</h1>
        <p className="text-slate-600">目前沒有商品。</p>
        <Link href="/products" className="text-blue-600 underline mt-3 inline-block">
          去逛逛商品 →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">購物車</h1>

      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between rounded-xl border p-4 bg-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center overflow-hidden rounded-lg">
                {/* 預覽圖（不裁切） */}
                <img src={(it.images && it.images[0]) || "/placeholder.png"} alt={it.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div>
                <div className="font-semibold">{it.name}</div>
                <div className="text-slate-600">x {it.qty}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-right">NT$ {(it.price * it.qty).toLocaleString()}</div>
              <button onClick={() => removeFromCart(it.id)} className="text-slate-600 hover:text-red-600">
                移除
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-lg">合計</div>
        <div className="text-xl font-bold">NT$ {total.toLocaleString()}</div>
      </div>

      <div className="flex gap-3">
        <button onClick={clearCart} className="px-4 py-2 rounded-lg border hover:bg-slate-100">
          清空購物車
        </button>
        <button className="px-4 py-2 rounded-lg bg-black text-white">前往結帳</button>
      </div>
    </div>
  );
}
