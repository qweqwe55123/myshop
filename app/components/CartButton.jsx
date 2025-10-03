"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartButton() {
  const { items } = useCart();
  const count = items.reduce((n, it) => n + (it.qty || 0), 0);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 bg-white hover:bg-slate-100 transition"
      title="查看購物車"
    >
      <span>購物車</span>
      <span className="inline-flex items-center justify-center min-w-6 h-6 text-sm rounded-full bg-black text-white px-2">
        {count}
      </span>
    </Link>
  );
}
