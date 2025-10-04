// app/orders/[id]/page.jsx
export const dynamic = "force-dynamic";     // 不要快取
export const runtime = "nodejs";            // 明確在 Node runtime

import { notFound } from "next/navigation";

async function getOrder(id) {
  const base =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : ""; // 本機或伺服端可用相對路徑

  const res = await fetch(`${base}/api/orders/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Fetch /api/orders/${id} failed: ${res.status} ${txt}`);
  }
  return res.json();
}

export default async function OrderPage({ params }) {
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  if (!id) throw new Error("缺少訂單 ID");

  const order = await getOrder(id);
  if (!order) return notFound();

  // 極簡呈現（你可再美化）
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">訂單建立成功</h1>
      <div className="rounded-lg border p-4 space-y-2">
        <div>訂單編號：<b>{order.orderNo ?? order.id}</b></div>
        <div>小計：NT$ {order.subTotal}</div>
        <div>運費：NT$ {order.shipping}</div>
        <div className="font-semibold">總計：NT$ {order.total}</div>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold mb-3">商品明細</h2>
        <ul className="space-y-2">
          {(order.items ?? []).map((it) => (
            <li key={it.id} className="flex justify-between">
              <span>{it.name} × {it.qty}</span>
              <span>NT$ {it.price * it.qty}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
