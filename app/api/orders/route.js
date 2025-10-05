// app/api/orders/route.js
export const runtime = "nodejs";

import { prisma } from "../../lib/prisma";
import { products } from "../../data/products"; // 依你的專案：app/data/products.js

// 強制把任何值轉成正整數
const toInt = (v, d = 0) => {
  const n = Math.trunc(Number(v));
  return Number.isFinite(n) && n > 0 ? n : d;
};

// 安全產生訂單號
const orderNo = () =>
  `HEM-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

export async function POST(req) {
  try {
    const body = await req.json(); // { customer?, items:[{id, qty}] }

    // 基本驗證
    if (!Array.isArray(body?.items) || body.items.length === 0) {
return Response.json({ id: order.id, orderNo: order.orderNo }, { status: 201 });
    }

    // 用 products 表轉換，確保價格是 Int
    const map = new Map(products.map((p) => [p.id, p]));
    const createItems = [];

    for (const it of body.items) {
      const p = map.get(it.id);
      if (!p) {
        return Response.json(
          { error: "PRODUCT_NOT_FOUND", id: it.id },
          { status: 400 }
        );
      }
      const qty = toInt(it.qty, 1);
      createItems.push({
        productId: p.id,
        name: p.name,
        price: toInt(p.price, 0),
        qty,
        image: p.images?.[0] ?? null,
      });
    }

    const subTotal = createItems.reduce((s, x) => s + x.price * x.qty, 0);
    const shipping = 60;
    const total = subTotal + shipping;

    const created = await prisma.order.create({
      data: {
        orderNo: orderNo(),
        status: "PENDING",
        subTotal,
        shipping,
        total,
        customerName: body.customer?.name ?? null,
        customerPhone: body.customer?.phone ?? null,
        customerEmail: body.customer?.email ?? null,
        note: body.customer?.note ?? null,
        items: { create: createItems },
      },
      select: { id: true, orderNo: true },
    });

    return Response.json(created, { status: 201 });
  } catch (e) {
    // 關鍵：把真正錯誤回傳給前端＋寫入 Functions logs
    console.error("POST /api/orders error:", e);
    return Response.json(
      {
        error: "SERVER_ERROR",
        message: e?.message ?? String(e),
        prismaCode: e?.code ?? null,
        stack: process.env.NODE_ENV !== "production" ? e?.stack : undefined,
      },
      { status: 500 }
    );
  }
}
