export const runtime = "nodejs";
import { prisma } from "../../../lib/prisma";

export async function GET(_req, { params }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { items: true },
    });
    if (!order) return new Response("Not found", { status: 404 });
    return new Response(JSON.stringify(order), { status: 200 });
  } catch (e) {
    console.error("Get order failed:", e);
    return new Response(JSON.stringify({ error: "SERVER_ERROR", message: String(e?.message ?? e) }), { status: 500 });
  }
}
