"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider"; // 與 CheckoutForm 同資料夾，所以用 ./

export default function CheckoutForm() {
  const router = useRouter();
  const { items = [], clearCart } =
    (typeof useCart === "function" ? useCart() : {}) || {};

  // 金額
  const subTotal = useMemo(
    () =>
      items.reduce(
        (s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 1),
        0
      ),
    [items]
  );
  const shipping = items.length ? 60 : 0;
  const total = subTotal + shipping;

  // 表單狀態（受控，才能「同購買人」即時帶入）
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    sameAsBuyer: true,
    rName: "",
    rPhone: "",
    rEmail: "",
    pickupStore: "",
    note: "",
  });

  // 勾選「同購買人」或變更購買人欄位時，立即帶入收件人
  useEffect(() => {
    if (form.sameAsBuyer) {
      setForm((f) => ({
        ...f,
        rName: f.name,
        rPhone: f.phone,
        rEmail: f.email,
      }));
    }
  }, [form.sameAsBuyer, form.name, form.phone, form.email]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // 送出
  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    // 前端必填檢查
    if (!items.length) return setErr("購物車是空的。");
    if (!form.name || !form.phone || !form.email)
      return setErr("請填購買人姓名 / 手機 / Email。");
    if (!form.rName || !form.rPhone)
      return setErr("請填收件人姓名 / 手機。");
    if (!form.pickupStore) return setErr("請輸入取貨門市。");

    try {
      setLoading(true);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            note: form.note || null,
            pickupStore: form.pickupStore,
            shipMethod: "CVS_7ELEVEN",
            payMethod: "BANK_TRANSFER",
          },
          receiver: {
            name: form.rName,
            phone: form.rPhone,
            email: form.rEmail || null,
          },
          items: items.map((it) => ({
            id: it.id,
            name: it.name,
            price: it.price,
            qty: Number(it.qty) || 1,
            image:
              it.image ||
              (Array.isArray(it.images) && (it.images[2] || it.images[0])) ||
              null,
          })),
        }),
      });

let data;
try {
  data = await res.json(); // ✅ 只讀一次 JSON
} catch {
  data = {};
}

if (!res.ok) {
  setErr(data?.message || data?.error || `建立失敗（${res.status}）`);
  return;
}

try {
  clearCart?.();
} catch {}

      // ★ 用 orderNo || id 導頁，避免「找不到訂單」
      const { orderNo } = await res.json();
router.push(`/orders/${orderNo}`);
    } catch (e2) {
      setErr(String(e2?.message ?? e2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 左：表單 */}
      <form onSubmit={submit} className="space-y-6 rounded-2xl border p-5 bg-white">
        {/* 購買人 */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">購買人資訊</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="col-span-1">
              <label className="text-sm">姓名<span className="text-red-500">*</span></label>
              <input name="name" value={form.name} onChange={onChange}
                     className="mt-1 w-full rounded-md border p-2" />
            </div>
            <div className="col-span-1">
              <label className="text-sm">手機<span className="text-red-500">*</span></label>
              <input name="phone" value={form.phone} onChange={onChange}
                     className="mt-1 w-full rounded-md border p-2" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm">電子郵件<span className="text-red-500">*</span></label>
              <input name="email" value={form.email} onChange={onChange}
                     className="mt-1 w-full rounded-md border p-2" />
            </div>
          </div>
        </section>

        {/* 收件人 */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">收件人資訊</h2>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox"
                   checked={form.sameAsBuyer}
                   onChange={(e) => setForm((f) => ({ ...f, sameAsBuyer: e.target.checked }))} />
            同購買人
          </label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="col-span-1">
              <label className="text-sm">姓名<span className="text-red-500">*</span></label>
              <input name="rName" value={form.rName} onChange={onChange}
                     disabled={form.sameAsBuyer}
                     className="mt-1 w-full rounded-md border p-2 disabled:bg-slate-50" />
            </div>
            <div className="col-span-1">
              <label className="text-sm">手機<span className="text-red-500">*</span></label>
              <input name="rPhone" value={form.rPhone} onChange={onChange}
                     disabled={form.sameAsBuyer}
                     className="mt-1 w-full rounded-md border p-2 disabled:bg-slate-50" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm">電子郵件（選填）</label>
              <input name="rEmail" value={form.rEmail} onChange={onChange}
                     disabled={form.sameAsBuyer}
                     className="mt-1 w-full rounded-md border p-2 disabled:bg-slate-50" />
            </div>
          </div>
        </section>

        {/* 取貨門市（手動） */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">取貨門市</h2>
          <input
            name="pickupStore"
            value={form.pickupStore}
            onChange={onChange}
            placeholder="例：7-ELEVEN 松福門市（935392）"
            className="w-full rounded-md border p-2"
          />
          <p className="text-xs text-slate-500">請手動輸入門市名稱。</p>
        </section>

        {/* 付款方式（僅顯示文字，不曝露帳號） */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">付款方式</h2>
          <div className="rounded-md border p-3 bg-slate-50 text-sm">ATM 轉帳</div>
        </section>

        {/* 備註 */}
        <section className="space-y-2">
          <h2 className="font-semibold text-lg">訂單備註</h2>
          <textarea name="note" value={form.note} onChange={onChange}
                    rows={4} className="w-full rounded-md border p-2" />
        </section>

        {err && (
          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        )}

        <button type="submit" disabled={loading || !items.length}
                className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50">
          {loading ? "送出中…" : "送出訂單"}
        </button>
      </form>

      {/* 右：摘要（只是顯示，不動你的版面邏輯） */}
      <aside className="space-y-4 rounded-2xl border p-5 bg-white">
        <h2 className="font-semibold text-lg">訂單摘要</h2>
        <ul className="divide-y">
          {items.map((it) => (
            <li key={it.id} className="flex items-center justify-between py-3">
              <span className="text-sm">
                {it.name} × {it.qty}
              </span>
              <span className="text-sm">
                NT$ {(Number(it.price) || 0) * (Number(it.qty) || 1)}
              </span>
            </li>
          ))}
        </ul>
        <div className="h-px bg-slate-200" />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between"><span>商品小計</span><span>NT$ {subTotal}</span></div>
          <div className="flex justify-between"><span>運費（超商）</span><span>NT$ {shipping}</span></div>
        </div>
        <div className="flex justify-between font-semibold">
          <span>總計</span><span>NT$ {total}</span>
        </div>
      </aside>
    </div>
  );
}
