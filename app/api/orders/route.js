// app/api/orders/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma"; // ← 你的 prisma 在 app/lib/prisma.js，往上兩層

export const runtime = "nodejs";
export const dynamic = "force-dynamic";    // 保險，避免快取/靜態分析干擾

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

// ✅ 一定要有這個確切名稱與匯出
export async function POST(req) {
  try {
    const body = await req.json();

    const items = Array.isArray(body?.items) ? body.items : [];
    if (!items.length) {
      return NextResponse.json({ error: "EMPTY_CART" }, { status: 400 });
    }

    const normalized = items.map((it) => ({
      productId: String(it.id),
      name: it.name ?? "商品",
      price: Number(it.price) || 0,
      qty: Number(it.qty) || 1,
      image: it.image ?? null,
    }));

    const subTotal = normalized.reduce((s, it) => s + it.price * it.qty, 0);
    const shipping = 60;
    const total = subTotal + shipping;

    const c = body?.customer ?? {};
    const orderNo = genOrderNo();

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

    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    console.error("POST /api/orders error:", e);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}

// （可選）明確拒絕非 POST，避免 Next 回 405 讓你困惑
export async function GET() {
  return NextResponse.json({ error: "METHOD_NOT_ALLOWED" }, { status: 405 });
}
export async function PUT()  { return GET(); }
export async function PATCH(){ return GET(); }
export async function DELETE(){ return GET(); }
