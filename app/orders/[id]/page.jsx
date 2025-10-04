// app/orders/[id]/page.jsx
export const dynamic = "force-dynamic";

async function fetchOrder(id) {
  const res = await fetch(`/api/orders/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function OrderPage({ params }) {
  const order = await fetchOrder(params.id);
  if (!order) return <div className="p-6">找不到訂單</div>;

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">訂單成立</h1>
        <div className="text-slate-600">
          訂單編號：<span className="font-mono">{order.orderNo}</span>
        </div>

        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[1fr_120px_120px_120px] px-4 py-3 text-sm text-slate-600 border-b">
            <div>商品</div>
            <div className="text-right">單價</div>
            <div className="text-center">數量</div>
            <div className="text-right">小計</div>
          </div>
          {order.items.map((it) => (
            <div
              key={it.id}
              className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_120px] gap-3 px-4 py-3 items-center border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 flex items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={it.image || "/placeholder.png"}
                    alt={it.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div>{it.name}</div>
              </div>
              <div className="md:text-right">NT$ {it.price.toLocaleString()}</div>
              <div className="md:text-center">x {it.qty}</div>
              <div className="md:text-right font-semibold">
                NT$ {(it.price * it.qty).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="space-y-6">
        <div className="bg-white border rounded-xl p-4 space-y-4">
          <div className="font-bold">付款方式：ATM 轉帳</div>
          <div className="text-sm space-y-1">
            <div>銀行：華南銀行（008））</div>
            <div>
              帳號：<span className="font-mono">752100065001</span>
            </div>
          </div>

          <div className="space-y-2 border-t pt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">商品小計</span>
              <span>NT$ {order.subTotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">運費</span>
              <span>NT$ {order.shipping.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold pt-2">
              <span>應付總額</span>
              <span>NT$ {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
