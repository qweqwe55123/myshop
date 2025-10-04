// app/orders/[id]/page.jsx
export const runtime = "nodejs";          // 明確用 Node runtime
export const dynamic = "force-dynamic";   // 不快取，避免舊資料

import { notFound } from "next/navigation";

async function getOrderResult(id) {
  try {
    // 在 Vercel 會有 VERCEL_URL，server component 用絕對網址較保險
    const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
    const res = await fetch(`${base}/api/orders/${id}`, { cache: "no-store" });

    const ct = res.headers.get("content-type") || "";
    const payload = ct.includes("application/json") ? await res.json() : await res.text();

    if (res.ok) return { order: payload };
    if (res.status === 404) return { notFound: true };

    // 將 API 回傳的 message/code 帶出來顯示（不要 throw）
    return { error: { status: res.status, payload } };
  } catch (e) {
    return { error: { status: 0, payload: String(e) } };
  }
}

export default async function OrderPage({ params }) {
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  if (!id) {
    return (
      <div className="p-6 text-red-600">
        <h1 className="text-xl font-semibold">缺少訂單 ID</h1>
      </div>
    );
  }

  const { order, error, notFound: nf } = await getOrderResult(id);

  if (nf) return notFound();

  if (error) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-xl font-semibold text-red-600">載入訂單失敗</h1>
        <p className="text-sm text-gray-500 mb-3">
          請到 Vercel → Deployments → Functions 查{" "}
          <code>GET /api/orders/{id}</code> 的日誌。
        </p>
        <pre className="whitespace-pre-wrap rounded-lg border p-4 text-sm">
{typeof error.payload === "string"
  ? error.payload
  : JSON.stringify(error.payload, null, 2)}
        </pre>
      </main>
    );
  }

  // 正常渲染
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">訂單建立成功</h1>

      <div className="rounded-lg border p-4 space-y-1">
        <div>訂單編號：<b>{order.orderNo ?? order.id}</b></div>
        <div>小計：NT$ {order.subTotal}</div>
        <div>運費：NT$ {order.shipping}</div>
        <div className="font-semibold">總計：NT$ {order.total}</div>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="font-semibold mb-2">商品明細</h2>
        <ul className="space-y-1">
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
