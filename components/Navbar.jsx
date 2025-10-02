"use client";
import Link from "next/link";
import { useCart } from "@/app/providers";

export default function Navbar() {
  const { count } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-yunho-studio.png" alt="Yunho Studio" className="h-8 w-auto" />
          <span className="sr-only">Yunho Studio</span>
        </Link>

        <div className="ml-auto flex items-center gap-6 text-[15px] font-medium">
          <Link href="/" className="text-slate-700 hover:text-black">首頁</Link>
          <Link href="/products" className="text-slate-700 hover:text-black">商品列表</Link>
          <Link href="/cart" className="text-slate-700 hover:text-black relative">
            購物車
            {count > 0 && (
              <span className="absolute -right-3 -top-2 rounded-full bg-black text-white text-xs px-1.5 py-0.5">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
