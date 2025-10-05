// app/api/orders/[id]/route.js
import { prisma } from "@/app/lib/prisma"; // 如果你的路徑不同，換成你的實際路徑
export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  const key = params.id; // 可能是 orderNo (HEM-...) 或資料庫 id（字串 / 整數都行）
  try {
    const where = {
      OR: [{ id: key }, { orderNo: key }],
    };
    if (Number.isFinite(Number(key))) where.OR.push({ id: Number(key) });

    const order = await prisma.order.findFirst({ where });
    if (!order) return new Response("NOT_FOUND", { status: 404 });
    return Response.json(order);
  } catch (err) {
    console.error("GET /api/orders/[id] error:", err);
    return new Response("SERVER_ERROR", { status: 500 });
  }
}
