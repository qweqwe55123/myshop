// app/api/health/route.js
export const runtime = "nodejs";
import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const who = await prisma.$queryRaw`select current_user`;
    const reg = await prisma.$queryRawUnsafe(
      `select to_regclass('public."Order"') as exists`
    );
    return Response.json({
      ok: true,
      user: who?.[0]?.current_user,
      orderTable: reg?.[0]?.exists,
    });
  } catch (e) {
    return Response.json(
      { ok: false, error: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
