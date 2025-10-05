// app/api/orders/route.js
import { prisma } from "@/app/lib/prisma"; // ← 如你的 prisma 路徑不同，請改成你的實際路徑
export const dynamic = "force-dynamic";

function genOrderNo(prefix = "HEM") {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 7);
  return `${prefix}-${y}${m}${day}-${rand}`;
}

export async function POST(req) {
  try {
    const body = await req.json();

    // 若前端未帶 orderNo，這裡自動產生一個
    const orderNo = body.orderNo ?? genOrderNo();

    const order = await prisma.order.create({
      data: {
        ...body,
        orderNo,
      },
    });

    // ★ 只回 { id, orderNo } 給前端做導頁
    return Response.json({ id: order.id, orderNo: order.orderNo }, { status: 201 });
  } catch (err) {
    console.error("POST /api/orders error:", err);
    return new Response("SERVER_ERROR", { status: 500 });
  }
}
