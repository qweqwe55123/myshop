"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "../components/CartProvider";

export default function CartPage() {
  const router = useRouter();
  // 盡量容錯：如果某些方法在你的 CartProvider 尚未提供，就用 fallback
  const cart = (typeof useCart === "function" ? useCart() : {}) || {};
  const {
    items = [],
    inc,                 // (id) => void
    dec,                 // (id) => void
    setQty,              // (id, qty) => void
    removeItem,          // (id) => void
  } = cart;

  const [editing, setEditing] = useState({}); // { [id]: "2" } 文字輸入暫存

  const fmt = (n) => `NT$ ${Number(n || 0)}`;

  const subTotal = useMemo(
    () =>
      items.reduce(
        (s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 1),
        0
      ),
    [items]
  );
  const shipping = items.length ? 60 : 0; // 超商運費固定 60
  const total = subTotal + shipping;

  // ---- 數量控制（盡量相容不同的 CartProvider 實作） ----
  const handleDec = (id, currentQty) => {
    if (typeof dec === "function") return dec(id);
    if (typeof setQty === "function")
      return setQty(id, Math.max(1, Number(currentQty || 1) - 1));
  };

  const handleInc = (id, currentQty) => {
    if (typeof inc === "function") return inc(id);
    if (typeof setQty === "function")
      return setQty(id, Math.min(99, Number(currentQty || 1) + 1));
  };

  const handleInputChange = (id, val) => {
    setEditing((e) => ({ ...e, [id]: val }));
  };

  const handleInputBlur = (id, currentQty) => {
    const raw = editing[id] ?? String(currentQty ?? 1);
    let q = parseInt(raw, 10);
    if (Number.isNaN(q)) q = Number(currentQty || 1);
    q = Math.min(99, Math.max(1, q));
    if (typeof setQty === "function") setQty(id, q);
    setEditing((e) => {
      const { [id]: _, ...rest } = e;
      return rest;
    });
  };

  const handleRemove = (id) => {
    if (typeof removeItem === "function") removeItem(id);
  };

  const goCheckout = () => {
    if (!items.length) return;
    router.push("/checkout");
  };

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
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
              {items.map((it) => {
                const liveQty =
                  editing[it.id] !== undefined
                    ? editing[it.id]
                    : String(Number(it.qty) || 1);

                return (
                  <li key={it.id} className="flex items-center justify-between py-4 gap-4">
                    {/* 名稱 & 單價 */}
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{it.name}</div>
                      <div className="text-sm text-slate-500">
                        單價：{fmt(it.price)}
                      </div>
                    </div>

                    {/* 數量控制 */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="h-8 w-8 rounded-md border hover:bg-slate-50"
                        onClick={() => handleDec(it.id, it.qty)}
                        aria-label="減少數量"
                      >
                        −
                      </button>
                      <input
                        className="w-12 rounded-md border p-1 text-center"
                        value={liveQty}
                        inputMode="numeric"
                        onChange={(e) => handleInputChange(it.id, e.target.value)}
                        onBlur={() => handleInputBlur(it.id, it.qty)}
                      />
                      <button
                        type="button"
                        className="h-8 w-8 rounded-md border hover:bg-slate-50"
                        onClick={() => handleInc(it.id, it.qty)}
                        aria-label="增加數量"
                      >
                        +
                      </button>
                    </div>

                    {/* 小計 */}
                    <div className="w-24 text-right text-sm">
                      {fmt((Number(it.price) || 0) * (Number(it.qty) || 1))}
                    </div>

                    {/* 刪除 */}
                    <button
                      type="button"
                      onClick={() => handleRemove(it.id)}
                      className="rounded-md border px-3 py-1 text-sm hover:bg-slate-50"
                    >
                      移除
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 右：金額摘要與前往結帳 */}
          <aside className="rounded-2xl border p-4 bg-white space-y-3 h-fit">
            <h2 className="font-semibold">訂單摘要</h2>
            <div className="flex justify-between text-sm">
              <span>商品小計</span>
              <span>{fmt(subTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>運費（超商）</span>
              <span>{fmt(shipping)}</span>
            </div>
            <div className="h-px bg-slate-200" />
            <div className="flex justify-between font-semibold">
              <span>總計</span>
              <span>{fmt(total)}</span>
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
