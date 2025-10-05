// app/api/orders/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; // ← 注意：相對於 app/api/orders/[id]/

export const runtime = "nodejs";

export async function GET(_req, { params }) {
  try {
    const id = params?.id; // 這個就是 URL 裡的 HEM-20251005-xxxx
    if (!id) {
      return NextResponse.json({ error: "NO_ID" }, { status: 400 });
    }

    // ✅ 用 orderNo 查，不是用資料表的 id
    const order = await prisma.order.findUnique({
      where: { orderNo: id },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (e) {
    console.error("GET /api/orders/[id] error:", e);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: String(e) },
      { status: 500 }
    );
  }
}
