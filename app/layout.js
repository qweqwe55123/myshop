// app/layout.js
import "./globals.css";
import Link from "next/link";
import { CartProvider } from "./components/CartProvider";
import CartButton from "./components/CartButton";

export const metadata = { title: "Shop", description: "Demo" };

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <CartProvider>
          {/* 頂部導覽（含購物車按鈕） */}
          <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
            <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
              <Link href="/" className="font-semibold">My Shop</Link>
              <nav className="flex items-center gap-4">
                <Link href="/products" className="hover:underline">全部商品</Link>
                <CartButton />
              </nav>
            </div>
          </header>

          {/* ★ children 必須在 CartProvider 裡 */}
          <main className="mx-auto max-w-6xl px-4 py-6">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
