// app/api/orders/[id]/route.js
export const runtime = "nodejs";

import { prisma } from "@/app/lib/prisma";

export async function GET(_req, { params }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true },
  });
  if (!order) return new Response("Not found", { status: 404 });
  return Response.json(order);
}
