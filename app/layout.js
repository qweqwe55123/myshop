export const metadata = { title: "MyShop", description: "簡潔好用的生活小物" };

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className="bg-gray-50 text-slate-900">
        {/* 公告列 */}
        <div className="w-full bg-black text-white text-center text-sm py-2">
          待新增｜公告與活動
        </div>

        {/* 導覽列 */}
        <header className="bg-white border-b border-slate-200">
          <nav className="max-w-[1100px] mx-auto px-4 py-3 flex items-center gap-6">
            <a href="/" className="font-extrabold tracking-wide">MyShop</a>
            <a href="/" className="text-slate-700 hover:text-black">首頁</a>
            <a href="/products" className="text-slate-700 hover:text-black">商品</a>
          </nav>
        </header>

        {children}

        <footer className="border-t border-slate-200 mt-16 bg-white">
          <div className="max-w-[1100px] mx-auto px-4 py-6 text-sm text-slate-500">
            © {new Date().getFullYear()} MyShop · All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
