export const metadata = { title: "MyShop", description: "簡潔好用的生活小物" };

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className="bg-gray-50 text-slate-900 antialiased">
        {/* 公告列 */}
        <div className="w-full bg-slate-900 text-white">
          <div className="max-w-[1200px] mx-auto px-4 text-center text-[13px] py-2 tracking-wide">
            待新增｜公告與活動
          </div>
        </div>

        {/* 黏頂導覽列 */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
          <nav className="max-w-[1200px] mx-auto px-4 py-3 flex items-center gap-6">
            <a href="/" className="text-xl font-extrabold tracking-tight">MyShop</a>
            <div className="ml-auto flex items-center gap-4">
              <a href="/" className="text-slate-600 hover:text-slate-900 transition">首頁</a>
              <a href="/products" className="text-slate-600 hover:text-slate-900 transition">商品</a>
            </div>
          </nav>
        </header>

        {children}

        <footer className="border-t border-slate-200 mt-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 py-10 text-sm text-slate-500">
            <div className="flex justify-between flex-col md:flex-row gap-4">
              <span>© {new Date().getFullYear()} MyShop</span>
              <span className="text-slate-400">極簡現代 · 生活小物</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
