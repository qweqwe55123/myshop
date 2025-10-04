"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartProvider"; // 你的 CartProvider 路徑

export default function CheckoutForm() {
  const router = useRouter();
  const { items, removeItem, clearCart } = useCart?.() || { items: [] };

  const subTotal = useMemo(
    () => items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 1), 0),
    [items]
  );
  const shipping = items.length > 0 ? 60 : 0; // 你之前指定只用超商，運費固定 60
  const total = subTotal + shipping;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
    pickupStore: "", // 超商門市（可選填）
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!items.length) {
      setErr("購物車是空的。");
      return;
    }
    if (!form.name || !form.phone) {
      setErr("請填寫姓名與手機。");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            phone: form.phone,
            email: form.email || null,
            note: form.note || null,
            pickupStore: form.pickupStore || null, // 備存門市資訊（如要也可寫到 DB）
            payMethod: "ATM",
            shipMethod: "CVS_7ELEVEN",
          },
          items: items.map((it) => ({
            id: it.id,
            qty: Number(it.qty) || 1,
          })),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErr(data?.message || data?.error || `建立失敗（${res.status}）`);
        return;
      }

      // 建立成功 → 清購物車（若你的 CartProvider 有 clearCart）
      if (typeof clearCart === "function") {
        try { clearCart(); } catch {}
      }

      router.push(`/orders/${data.id}`);
    } catch (e2) {
      setErr(String(e2?.message ?? e2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* 左：表單 */}
      <form onSubmit={submit} className="space-y-4 rounded-2xl border p-5 bg-white">
        <h2 className="font-semibold text-lg">訂購人資訊</h2>

        <div className="grid gap-3">
          <label className="text-sm">
            姓名<span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="rounded-md border p-2"
            placeholder="王小明"
            required
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm">
            手機<span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="rounded-md border p-2"
            placeholder="09xx-xxx-xxx"
            required
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm">Email（選填）</label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            className="rounded-md border p-2"
            placeholder="you@example.com"
          />
        </div>

        <div className="grid gap-3">
          <label className="text-sm">取貨方式</label>
          <div className="rounded-md border p-3 bg-slate-50">
            <div className="font-medium">超商取貨（7-ELEVEN）</div>
            <div className="mt-2 grid gap-2">
              <input
                name="pickupStore"
                value={form.pickupStore}
                onChange={onChange}
                className="rounded-md border p-2"
                placeholder="可填門市名稱、店號（選填）"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <label className="text-sm">付款方式</label>
          <div className="rounded-md border p-3 bg-slate-50">ATM 轉帳</div>
        </div>

        <div className="grid gap-3">
          <label className="text-sm">備註</label>
          <textarea
            name="note"
            value={form.note}
            onChange={onChange}
            className="rounded-md border p-2"
            rows={4}
            placeholder="有其他需求可在此備註"
          />
        </div>

        {err && (
          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !items.length}
          className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "送出中…" : "送出訂單"}
        </button>
      </form>

      {/* 右：訂單摘要 */}
      <div className="space-y-4 rounded-2xl border p-5 bg-white">
        <h2 className="font-semibold text-lg">訂單摘要</h2>
        <ul className="divide-y">
          {items.map((it) => (
            <li key={it.id} className="flex items-center justify-between py-3">
              <span className="text-sm">
                {it.name} × {it.qty}
              </span>
              <span className="text-sm">NT$ {(Number(it.price) || 0) * (Number(it.qty) || 1)}</span>
            </li>
          ))}
        </ul>
        <div className="h-px bg-slate-200" />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>商品小計</span>
            <span>NT$ {subTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>運費（超商）</span>
            <span>NT$ {shipping}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>總計</span>
            <span>NT$ {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
