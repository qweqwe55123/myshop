// app/api/health/route.js
export const runtime = "nodejs";
import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    // 打 DB 做最小查詢
    const r = await prisma.$queryRaw`SELECT 1 as ok`;
    return new Response(JSON.stringify({ ok: true, r }), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, error: String(e), stack: e?.stack }),
      { status: 500 }
    );
  }
}
