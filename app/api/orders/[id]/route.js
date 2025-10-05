// app/api/orders/[id]/route.js
import { NextResponse } from "next/server";
// ⬇⬇⬇ 同樣把路徑改成你實際的 ⬇⬇⬇
import { prisma } from "../../../../lib/prisma";

export const runtime = "nodejs";

export async function GET(_req, { params }) {
  try {
    const id = params?.id;
    if (!id) {
      return NextResponse.json({ error: "NO_ID" }, { status: 400 });
    }

    // 你前端導頁用的是 orderNo，就用 orderNo 查；
    // 如果你是用資料庫 primary id 導頁，這裡就改成 where: { id }
    const order =
      (await prisma.order.findUnique({
        where: { orderNo: id },
        include: { items: true },
      })) ||
      null;

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
