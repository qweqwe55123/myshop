"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartProvider";

export default function CheckoutForm() {
  const router = useRouter();
  const { items = [], clearCart } = useCart?.() || { items: [] };

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

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    rName: "",
    rPhone: "",
    rEmail: "",
    sameAsBuyer: true,
    pickupStore: "",
    note: "",
  });

  // 同購買人
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

  // 讀取綠界回傳的門市 cookie
  useEffect(() => {
    const m = document.cookie.match(
      /(?:^|;\s*)cvs_pickup=([^;]+)/
    );
    if (m) {
      try {
        const obj = JSON.parse(decodeURIComponent(m[1]));
        setForm((f) => ({ ...f, pickupStore: obj.label }));
      } catch {}
      // 清掉 cookie
      document.cookie = "cvs_pickup=; Max-Age=0; path=/";
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const goPickStore = () => {
    window.location.href = "/api/cvs/map?subtype=UNIMARTC2C";
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!items.length) return setErr("購物車是空的。");
    if (!form.name || !form.phone || !form.email)
      return setErr("請填購買人姓名 / 手機 / Email。");
    if (!form.rName || !form.rPhone)
      return setErr("請填收件人姓名 / 手機。");
    if (!form.pickupStore)
      return setErr("請選擇取貨門市。");

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
            payMethod: "ATM",
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

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data?.message || data?.error || `建立失敗（${res.status}）`);
        return;
      }

      try {
        clearCart?.();
      } catch {}
      router.push(`/orders/${data.id}`);
    } catch (e2) {
      setErr(String(e2?.message ?? e2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 左：表單卡片 */}
      <form
        onSubmit={submit}
        className="space-y-6 rounded-2xl border p-5 bg-white"
      >
        {/* 購買人 */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">購買人資訊</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm">
                姓名<span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="rounded-md border p-2"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">
                手機<span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="rounded-md border p-2"
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm">
                電子郵件<span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                className="rounded-md border p-2"
              />
            </div>
          </div>
        </section>

        {/* 收件人 */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">收件人資訊</h2>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.sameAsBuyer}
              onChange={(e) =>
                setForm((f) => ({ ...f, sameAsBuyer: e.target.checked }))
              }
            />
            同購買人
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm">
                姓名<span className="text-red-500">*</span>
              </label>
              <input
                name="rName"
                value={form.rName}
                onChange={onChange}
                disabled={form.sameAsBuyer}
                className="rounded-md border p-2 disabled:bg-slate-50"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">
                手機<span className="text-red-500">*</span>
              </label>
              <input
                name="rPhone"
                value={form.rPhone}
                onChange={onChange}
                disabled={form.sameAsBuyer}
                className="rounded-md border p-2 disabled:bg-slate-50"
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm">電子郵件（選填）</label>
              <input
                name="rEmail"
                value={form.rEmail}
                onChange={onChange}
                disabled={form.sameAsBuyer}
                className="rounded-md border p-2 disabled:bg-slate-50"
              />
            </div>
          </div>
        </section>

        {/* 門市 */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">取貨門市</h2>
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input
              readOnly
              value={form.pickupStore || "取貨門市：您尚未選擇門市"}
              className={`rounded-md border p-2 ${
                !form.pickupStore ? "text-red-600" : ""
              }`}
            />
            <button
              type="button"
              onClick={goPickStore}
              className="rounded-lg border px-4 py-2 hover:bg-slate-50"
            >
              前往選擇門市
            </button>
          </div>
          <p className="text-xs text-slate-500">
            目前僅提供 7-ELEVEN 超商取件；若需宅配可再加欄位擴充。
          </p>
        </section>

        {/* 付款 */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">付款方式</h2>
          <div className="rounded-md border p-3 bg-slate-50">
            ATM 轉帳（下一步會顯示虛擬帳號與期限）
          </div>
        </section>

        {/* 備註 */}
        <section className="space-y-2">
          <h2 className="font-semibold text-lg">訂單備註</h2>
          <textarea
            name="note"
            value={form.note}
            onChange={onChange}
            className="w-full rounded-md border p-2"
            rows={4}
            placeholder="如有其他需求在此備註"
          />
        </section>

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
          {loading ? "送出中…" : "前往付款 - ATM 虛擬帳號"}
        </button>
      </form>

      {/* 右：摘要 */}
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
          <div className="flex justify-between">
            <span>商品小計</span>
            <span>NT$ {subTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>運費（超商）</span>
            <span>NT$ {shipping}</span>
          </div>
        </div>
        <div className="flex justify-between font-semibold">
          <span>總計</span>
          <span>NT$ {total}</span>
        </div>
      </aside>
    </div>
  );
}
