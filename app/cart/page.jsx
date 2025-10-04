"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../components/CartProvider";

export default function CartPage() {
  const router = useRouter();
  // 你的 CartProvider 只要提供 items 就行；其餘控制（移除/調整數量）這裡不強制使用
  const { items = [] } = useCart?.() || { items: [] };

  const subTotal = items.reduce(
    (sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 1),
    0
  );
  const shipping = items.length ? 60 : 0; // 超商運費固定 60
  const total = subTotal + shipping;

  const goCheckout = () => {
    if (!items.length) return;
    router.push("/checkout");
  };

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">購物車</h1>

      {!items.length ? (
        <div className="rounded-2xl border p-6 bg-white">
          你的購物車目前是空的。
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          {/* 左：商品列表 */}
          <div className="rounded-2xl border p-4 bg-white">
            <ul className="divide-y">
              {items.map((it) => (
                <li key={it.id} className="flex items-center justify-between py-4">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{it.name}</div>
                    <div className="text-sm text-slate-500">
                      數量：{Number(it.qty) || 1}
                    </div>
                  </div>
                  <div className="text-sm whitespace-nowrap">
                    NT$ {(Number(it.price) || 0) * (Number(it.qty) || 1)}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 右：金額摘要與前往結帳 */}
          <aside className="rounded-2xl border p-4 bg-white space-y-3 h-fit">
            <h2 className="font-semibold">訂單摘要</h2>
            <div className="flex justify-between text-sm">
              <span>商品小計</span>
              <span>NT$ {subTotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>運費（超商）</span>
              <span>NT$ {shipping}</span>
            </div>
            <div className="h-px bg-slate-200" />
            <div className="flex justify-between font-semibold">
              <span>總計</span>
              <span>NT$ {total}</span>
            </div>

            <button
              onClick={goCheckout}
              disabled={!items.length}
              className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
            >
              前往結帳
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
