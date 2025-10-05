// app/api/orders/[id]/route.js
import { prisma } from "@/app/lib/prisma"; // ← 如你的 prisma 路徑不同，請改成你的實際路徑
export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  const raw = params.id; // 可能是 orderNo (HEM-...) 或資料庫 id

  try {
    const where = {
      OR: [
        { id: raw },       // 若 id 為字串 (cuid/uuid)
        { orderNo: raw },  // 用 orderNo 查
      ],
    };

    // 若你的 id 是整數型別，這行會再補一個條件
    if (Number.isFinite(Number(raw))) {
      where.OR.push({ id: Number(raw) });
    }

    const order = await prisma.order.findFirst({
      where,
    });

    if (!order) {
      return new Response("NOT_FOUND", { status: 404 });
    }

    return Response.json(order);
  } catch (err) {
    console.error("GET /api/orders/[id] error:", err);
    return new Response("SERVER_ERROR", { status: 500 });
  }
}
