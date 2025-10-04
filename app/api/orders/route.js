export const runtime = "nodejs";

// 用相對路徑，避免 alias 沒生效
import { prisma } from "../../lib/prisma";
import { products } from "../../data/products";

function genOrderNo() {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const r = crypto.randomUUID().slice(0, 8);
  return `HEM-${d}-${r}`;
}

export async function POST(req) {
  try {
    const body = await req.json();               // { customer?, items:[{id, qty}] }
    const itemsInput = Array.isArray(body.items) ? body.items : [];
    if (!itemsInput.length) {
      return new Response(JSON.stringify({ error: "EMPTY_ITEMS" }), { status: 400 });
    }

    const map = new Map(products.map(p => [p.id, p]));
    const safeItems = [];
    for (const it of itemsInput) {
      const p = map.get(it.id);
      if (!p) {
        return new Response(JSON.stringify({ error: "PRODUCT_NOT_FOUND", id: it.id }), { status: 400 });
      }
      const qty = Math.max(1, Number(it.qty) || 1);
      safeItems.push({
        productId: p.id,
        name: p.name,
        price: Number(p.price),
        qty,
        image: p.images?.[0] ?? null,
      });
    }

    const subTotal = safeItems.reduce((s, it) => s + it.price * it.qty, 0);
    const shipping = 60;
    const total = subTotal + shipping;

    const created = await prisma.order.create({
      data: {
        orderNo: genOrderNo(),
        status: "PENDING",
        subTotal, shipping, total,
        customerName: body.customer?.name ?? null,
        customerPhone: body.customer?.phone ?? null,
        customerEmail: body.customer?.email ?? null,
        note: body.customer?.note ?? null,
        items: { create: safeItems },
      },
      select: { id: true, orderNo: true },
    });

    return new Response(JSON.stringify(created), { status: 201 });
  } catch (e) {
    console.error("Create order failed:", e);
    return new Response(JSON.stringify({ error: "SERVER_ERROR", message: String(e?.message ?? e) }), { status: 500 });
  }
}
