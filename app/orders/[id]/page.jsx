// app/orders/[id]/page.jsx
import { BANK_INFO } from "../../config/bank";

export const dynamic = "force-dynamic"; // 不要快取

async function getOrder(id) {
  // 在開發、本機與 Vercel 都可用的 base URL
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${base}/api/orders/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("ORDER_NOT_FOUND");
  return res.json();
}

export default async function OrderSuccessPage({ params }) {
  const { id } = params;

  let order;
  try {
    order = await getOrder(id);
  } catch {
    return (
      <div className="rounded-2xl border p-6">
        <h1 className="text-xl font-semibold mb-2">找不到訂單</h1>
        <p className="text-sm text-slate-600">訂單編號：{id}</p>
      </div>
    );
  }

  const items = order.items || [];
  const subTotal =
    order.subTotal ??
    items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 1), 0);
  const shipping = order.shipping ?? 60;
  const total = order.total ?? subTotal + shipping;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">訂單建立成功</h1>

      {/* 訂單摘要 */}
      <section className="rounded-2xl border p-5 space-y-2">
        <p className="text-sm">
          訂單編號：<span className="font-mono">{order.orderNo || order.id}</span>
        </p>
        <div className="text-sm">小計：NT$ {subTotal}</div>
        <div className="text-sm">運費：NT$ {shipping}</div>
        <div className="font-semibold">總計：NT$ {total}</div>
      </section>

      {/* 匯款資訊（已放在總計下面、商品明細上面） */}
      <section className="rounded-2xl border p-5 space-y-2">
        <h3 className="font-semibold">匯款資訊</h3>
        <p className="text-sm">
          銀行：{BANK_INFO.bankName}（{BANK_INFO.bankCode}）
        </p>
        <p className="text-sm">
          帳號：<span className="font-mono tracking-wider">{BANK_INFO.accountNumber}</span>
        </p>
      </section>

      {/* 商品明細 */}
      <section className="rounded-2xl border p-5 space-y-2">
        <h3 className="font-semibold">商品明細</h3>
        <ul className="divide-y">
          {items.map((it, idx) => (
            <li key={it.id || idx} className="flex items-center justify-between py-3">
              <div className="text-sm">
                {it.name} × {Number(it.qty) || 1}
              </div>
              <div className="text-sm">
                NT$ {(Number(it.price) || 0) * (Number(it.qty) || 1)}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
