// app/orders/[id]/page.jsx
export const runtime = "nodejs";          // 一定要 Node runtime
export const dynamic = "force-dynamic";   // 不快取，避免舊資料

import { notFound } from "next/navigation";
import { prisma } from "../../lib/prisma"; // ← 確保有 app/lib/prisma.js (我們之前給過)

export default async function OrderPage({ params }) {
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  if (!id) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-xl font-semibold text-red-600">缺少訂單 ID</h1>
      </main>
    );
  }

  try {
    // 直接查資料庫，不再透過 fetch 自己的 API
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) return notFound();

    return (
      <main className="mx-auto max-w-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold">訂單建立成功</h1>

        <div className="rounded-lg border p-4 space-y-1">
          <div>
            訂單編號：<b>{order.orderNo ?? order.id}</b>
          </div>
          <div>小計：NT$ {order.subTotal}</div>
          <div>運費：NT$ {order.shipping}</div>
          <div className="font-semibold">總計：NT$ {order.total}</div>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="font-semibold mb-2">商品明細</h2>
          <ul className="space-y-1">
            {(order.items ?? []).map((it) => (
              <li key={it.id} className="flex justify-between">
                <span>
                  {it.name} × {it.qty}
                </span>
                <span>NT$ {it.price * it.qty}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  } catch (e) {
    // 在頁面顯示實際錯誤，方便除錯
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-xl font-semibold text-red-600">載入訂單失敗</h1>
        <pre className="whitespace-pre-wrap rounded-lg border p-4 text-sm">
          {e?.message ?? String(e)}
        </pre>
      </main>
    );
  }
}
