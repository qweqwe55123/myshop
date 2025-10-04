export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "../../lib/prisma";

// 產生簡易 ATM 資訊（示範用，未串真金流）
function buildAtmInfo(order) {
  const bank = "812"; // 台新(示例)；可改 808 玉山, 700 郵局...
  // 用 orderNo 的數字組成 14 碼，僅示例（正式請串金流產生）
  const digits = (order.orderNo || order.id).replace(/\D/g, "");
  const acct = (digits + "00000000000000").slice(-14);
  const due = new Date(Date.now() + 3 * 86400000); // +3 天
  const dueStr = `${due.getFullYear()}/${String(due.getMonth() + 1).padStart(2, "0")}/${String(
    due.getDate()
  ).padStart(2, "0")}`;
  return { bank, acct, amount: order.total, dueStr };
}

async function getOrder(id) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
}

export default async function OrderPage({ params }) {
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  if (!id) return notFound();

  const order = await getOrder(id);
  if (!order) return notFound();

  const atm = buildAtmInfo(order);

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">訂單建立成功</h1>

      {/* 訂單摘要 */}
      <div className="rounded-lg border p-4 space-y-1 bg-white">
        <div>訂單編號：<b>{order.orderNo ?? order.id}</b></div>
        {order.customerName && <div>訂購人：{order.customerName}</div>}
        {order.customerPhone && <div>手機：{order.customerPhone}</div>}
        {order.customerEmail && <div>Email：{order.customerEmail}</div>}
        {order.pickupStore && <div>超商門市：{order.pickupStore}</div>}
        {order.note && <div>備註：{order.note}</div>}
        <div>小計：NT$ {order.subTotal}</div>
        <div>運費：NT$ {order.shipping}</div>
        <div className="font-semibold">總計：NT$ {order.total}</div>
      </div>

      {/* ATM 付款資訊 */}
      <div className="rounded-lg border p-4 bg-white space-y-3">
        <h2 className="font-semibold">ATM 轉帳資訊</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="銀行代碼" value={atm.bank} />
          <Field label="轉帳金額" value={`NT$ ${atm.amount}`} />
          <Field label="虛擬帳號" value={atm.acct} long />
          <Field label="繳費期限" value={atm.dueStr} />
        </div>
        <p className="text-xs text-slate-500">
          ※ 此為示範虛擬帳號。正式環境請串接金流（藍新/綠界等）取得真實帳號、期限與入帳通知。
        </p>
      </div>

      {/* 商品明細 */}
      <div className="rounded-lg border p-4 bg-white">
        <h2 className="font-semibold mb-2">商品明細</h2>
        <ul className="space-y-1 text-sm">
          {order.items.map((it) => (
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
}

function Field({ label, value, long }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-20 shrink-0 text-sm text-slate-500">{label}</span>
      <div className="flex-1 rounded-md border px-3 py-2 text-sm bg-slate-50">
        {value}
      </div>
      <button
        className={`ml-2 shrink-0 rounded-md border px-3 py-1 text-xs hover:bg-slate-50 ${long ? "sm:col-span-2" : ""}`}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(String(value));
          } catch {}
        }}
      >
        複製
      </button>
    </div>
  );
}
