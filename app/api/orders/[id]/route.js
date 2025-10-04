// app/api/orders/[id]/route.js
export const runtime = "nodejs";
import { prisma } from "../../../lib/prisma";

export async function GET(_req, { params }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { items: true },
    });
    if (!order) return Response.json({ error: "NOT_FOUND" }, { status: 404 });
    return Response.json(order, { status: 200 });
  } catch (e) {
    console.error("GET /api/orders/[id] error:", e);
    return Response.json({ error: "SERVER_ERROR", message: String(e?.message ?? e) }, { status: 500 });
  }
}
