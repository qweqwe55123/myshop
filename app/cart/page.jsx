"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "../components/CartProvider";

const SHIPPING = 60; // 只用超商取貨

export default function CartPage() {
  const { items, setQty, removeFromCart, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("尚未輸入");

  const subTotal = useMemo(
    () => items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0),
    [items]
  );
  const shipping = items.length ? SHIPPING : 0;
  const discount = 0;
  const total = Math.max(0, subTotal + shipping - discount);

  if (!items.length) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">購物車</h1>
        <p className="text-slate-600">目前沒有商品。</p>
        <Link href="/products" className="text-blue-600 underline mt-3 inline-block">去逛逛商品 →</Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8">
      {/* 左邊：購物清單 */}
      <section className="space-y-6">
        <h1 className="text-2xl font-bold">購物清單確認</h1>

        <div className="bg-white border rounded-xl overflow-hidden">
          {/* 表頭 */}
          <div className="hidden md:grid grid-cols-[1fr_120px_120px_120px_48px] px-4 py-3 text-sm text-slate-600 border-b">
            <div>商品</div>
            <div className="text-right">單價</div>
            <div className="text-center">數量</div>
            <div className="text-right">小計</div>
            <div></div>
          </div>

          {/* 品項列 */}
          {items.map((it) => (
            <div key={it.id}
              className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_120px_48px] gap-3 px-4 py-4 items-center border-b last:border-b-0">
              {/* 商品 */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 flex items-center justify-center overflow-hidden rounded-lg shrink-0">
                  <img src={(it.images && it.images[0]) || "/placeholder.png"} alt={it.name}
                       className="max-w-full max-h-full object-contain"/>
                </div>
                <div className="font-medium">{it.name}</div>
              </div>
              {/* 單價（桌面版顯示） */}
              <div className="hidden md:block md:text-right">NT$ {Number(it.price).toLocaleString()}</div>
              {/* 數量 */}
              <div className="md:text-center">
                <select value={it.qty} onChange={(e)=>setQty(it.id, Number(e.target.value))}
                        className="border rounded-lg h-9 px-2">
                  {Array.from({length:10},(_,i)=>i+1).map(n=><option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              {/* 小計 */}
              <div className="md:text-right font-semibold">
                NT$ {(Number(it.price) * Number(it.qty)).toLocaleString()}
              </div>
              {/* 刪除 */}
              <div className="text-right">
                <button onClick={()=>removeFromCart(it.id)} className="text-slate-500 hover:text-red-600" title="移除">×</button>
              </div>
            </div>
          ))}
        </div>

        {/* 活動代碼（虛線框） */}
        <div className="border-2 border-dashed rounded-xl p-4 text-sm">
          <div className="font-medium mb-3">活動代碼</div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder="請輸入"
                   className="border rounded-lg h-10 px-3 w-56"/>
            <button onClick={()=>setCouponMsg(coupon ? `已輸入：${coupon}` : "尚未輸入")}
                    className="h-10 px-4 rounded-lg bg-black text-white">送出</button>
          </div>
          <div className="text-slate-500 mt-3">{couponMsg}</div>
        </div>
      </section>

      {/* 右邊：訂單資訊 */}
      <aside className="space-y-6">
        <div className="bg-white border rounded-xl p-4 space-y-6">
          <div>
            <div className="font-bold mb-2">訂單資訊</div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">商品小計</span>
              <span>NT$ {subTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* 取貨方式：只顯示超商 +60 */}
          <div>
            <div className="font-bold mb-2">取貨方式</div>
            <label className="flex items-center gap-3">
              <input type="radio" checked readOnly />
              <span>超商取貨</span>
              <span className="ml-auto text-xs rounded-full border px-2 py-0.5">+60</span>
            </label>
          </div>

          {/* 付款方式：只顯示 ATM */}
          <div>
            <div className="font-bold mb-2">付款方式</div>
            <label className="flex items-center gap-3">
              <input type="radio" defaultChecked readOnly />
              <span>ATM 轉帳</span>
            </label>
          </div>

          {/* 運費/合計 */}
          <div className="space-y-2 border-t pt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">運費</span>
              <span>NT$ {shipping.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold pt-2">
              <span>合計</span>
              <span>NT$ {total.toLocaleString()}</span>
            </div>
          </div>

          {/* 目前不跳頁，按了先留在本頁（之後要導向再接） */}
          <button className="w-full h-12 rounded-lg bg-rose-700 text-white font-semibold hover:opacity-90">
            下一步
          </button>

          <button onClick={clearCart} className="w-full h-10 rounded-lg border hover:bg-slate-100">
            清空購物車
          </button>
        </div>
      </aside>
    </div>
  );
}
