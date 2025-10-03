// app/api/orders/route.js
export const runtime = "nodejs";

import { prisma } from "@/app/lib/prisma";
import { products } from "@/app/data/products";

function genOrderNo() {
  const d = new Date().toISOString().slice(0,10).replace(/-/g,"");
  const r = crypto.randomUUID().slice(0,8);
  return `HEM-${d}-${r}`;
}

export async function POST(req) {
  try {
    const body = await req.json(); // { customer, items:[{id,qty}], note }
    const items = Array.isArray(body.items) ? body.items : [];

    // 伺服端重算價格（避免前端竄改）
    const map = new Map(products.map(p => [p.id, p]));
    const safe = items.map(it => {
      const p = map.get(it.id);
      if (!p) throw new Error("商品不存在");
      const qty = Math.max(1, Number(it.qty) || 1);
      return {
        productId: p.id,
        name: p.name,
        price: Number(p.price),
        qty,
        image: (p.images && p.images[0]) || null
      };
    });

    const subTotal = safe.reduce((s, it) => s + it.price * it.qty, 0);
    const shipping = 60; // 只用超商
    const total = subTotal + shipping;

    const created = await prisma.order.create({
      data: {
        orderNo: genOrderNo(),
        status: "PENDING",
        customerName: body.customer?.name ?? null,
        customerPhone: body.customer?.phone ?? null,
        customerEmail: body.customer?.email ?? null,
        note: body.customer?.note ?? null,
        subTotal, shipping, total,
        items: { create: safe }
      },
      select: { id: true, orderNo: true }
    });

    return Response.json(created, { status: 201 });
  } catch (e) {
    console.error("Create order failed:", e);
    return new Response("Bad Request", { status: 400 });
  }
}

export async function GET() {
  const list = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50
  });
  return Response.json(list);
}
