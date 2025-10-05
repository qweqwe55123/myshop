// app/api/cvs/return/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const fd = await req.formData();
  const name = fd.get("CVSStoreName") || "";
  const storeId = fd.get("CVSStoreID") || "";
  const addr = fd.get("CVSAddress") || "";
  const subtype = fd.get("LogisticsSubType") || "";

  const label = `${name}（${storeId}）`;
  const data = encodeURIComponent(
    JSON.stringify({ label, name, storeId, addr, subtype })
  );

  cookies().set("cvs_pickup", data, { path: "/", httpOnly: false });
  return NextResponse.redirect(new URL("/checkout", req.url));
}
