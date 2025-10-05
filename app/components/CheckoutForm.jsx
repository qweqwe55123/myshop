"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// 若你的 CartProvider 路徑不同，請改這行
import { useCart } from "../components/CartProvider";

export default function CheckoutForm() {
  const router = useRouter();
  const { items = [], subTotal = 0 } = (typeof useCart === "function" ? useCart() : {}) || {};
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);

      const buyer = {
        name: form.get("buyerName")?.toString().trim(),
        phone: form.get("buyerPhone")?.toString().trim(),
        email: form.get("buyerEmail")?.toString().trim(),
      };

      const sameAsBuyer = !!form.get("sameAsBuyer");

      const receiver = {
        name: (sameAsBuyer ? buyer.name : form.get("receiverName"))?.toString().trim() || "",
        phone: (sameAsBuyer ? buyer.phone : form.get("receiverPhone"))?.toString().trim() || "",
        email: (sameAsBuyer ? buyer.email : form.get("receiverEmail"))?.toString().trim() || "",
      };

      const payload = {
        buyer,
        receiverSameAsBuyer: sameAsBuyer,
        receiver,
        storeText: form.get("storeText")?.toString().trim() || "",
        note: form.get("note")?.toString().trim() || "",
        // 下面三個依你購物車實作調整；先用簡單值避免後端出錯
        items,
        subTotal,
        shipping: 60, // 你原本是超商運費 60
        total: Number(subTotal) + 60,
        // 若前端自己產生 orderNo，也可一併帶上；否則後端會自動產生
        // orderNo: `HEM-...`,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json(); // 期望 { id, orderNo }
      router.push(`/orders/${data.orderNo || data.id}`);
    } catch (err) {
      console.error(err);
      alert("建立訂單失敗");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* 購買人資訊 */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">購買人資訊</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="buyerName" placeholder="姓名*" required className="input input-bordered w-full" />
          <input name="buyerPhone" placeholder="手機*" required className="input input-bordered w-full" />
        </div>
        <input name="buyerEmail" type="email" placeholder="電子郵件*" required className="input input-bordered w-full" />
      </section>

      {/* 收件人資訊 */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">收件人資訊</h2>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="sameAsBuyer" /> 同購買人
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="receiverName" placeholder="姓名*" className="input input-bordered w-full" />
          <input name="receiverPhone" placeholder="手機*" className="input input-bordered w-full" />
        </div>
        <input name="receiverEmail" type="email" placeholder="電子郵件（選填）" className="input input-bordered w-full" />
      </section>

      {/* 取貨門市（暫時手填） */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">取貨門市</h2>
        <input
          name="storeText"
          placeholder="例：7-ELEVEN 松福門市（935392）"
          className="input input-bordered w-full"
        />
        <p className="text-xs text-slate-500">目前先手動輸入門市名稱／店號。</p>
      </section>

      {/* 付款方式：只顯示 ATM 轉帳，不顯示帳號 */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">付款方式</h2>
        <div className="rounded-md border p-3 bg-slate-50 text-sm">
          ATM 轉帳
        </div>
      </section>

      {/* 訂單備註 */}
      <section className="space-y-3">
        <h2 className="font-semibold text-lg">訂單備註</h2>
        <textarea name="note" placeholder="如有其他需求在此備註" className="textarea textarea-bordered w-full" rows={3} />
      </section>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full md:w-auto"
      >
        {loading ? "處理中…" : "送出訂單"}
      </button>
    </form>
  );
}
