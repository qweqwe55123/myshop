// app/api/orders/route.js
export const runtime = "nodejs";
import { prisma } from "../../lib/prisma"; // ← 路徑依你專案，和你之前用的一樣

function genOrderNo() {
  const d = new Date();
  const ymd = [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("");
  const rand = Math.random().toString(36).slice(2, 6);
  return `HEM-${ymd}-${rand}`;
}

export async function POST(req) {
  try {
    const body = await req.json();

    // 1) 驗證 & 正常化 items
    const items = Array.isArray(body?.items) ? body.items : [];
    if (!items.length) {
      return Response.json({ error: "EMPTY_CART" }, { status: 400 });
    }
    const normalized = items.map((it) => ({
      productId: String(it.id),
      name: it.name ?? "商品",
      price: Number(it.price) || 0,
      qty: Number(it.qty) || 1,
      image: it.image ?? null,
    }));

    // 2) 金額
    const subTotal = normalized.reduce((s, it) => s + it.price * it.qty, 0);
    const shipping = 60; // 超商固定 60
    const total = subTotal + shipping;

    // 3) 顧客資料
    const c = body?.customer ?? {};
    const orderNo = genOrderNo();

    // 4) 建立訂單（欄位名稱沿用你之前的 schema）
    const created = await prisma.order.create({
      data: {
        orderNo,
        customerName:  c.name  ?? null,
        customerPhone: c.phone ?? null,
        customerEmail: c.email ?? null,
        note:          c.note  ?? null,
        pickupStore:   c.pickupStore ?? null,

        subTotal,
        shipping,
        total,

        items: {
          create: normalized.map((it) => ({
            productId: it.productId,
            name: it.name,
            price: it.price,
            qty: it.qty,
            image: it.image,
          })),
        },
      },
      select: { id: true, orderNo: true },
    });

    // 只回傳 {id, orderNo} 給前端導頁用
    return Response.json(created, { status: 201 });
  } catch (e) {
    console.error("POST /api/orders error:", e);
    return Response.json(
      { error: "SERVER_ERROR", message: String(e) },
      { status: 500 }
    );
  }
}
