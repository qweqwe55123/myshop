export const metadata = { title: "Yunho Studio", description: "Less is more." };

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

        {/* 黏頂導覽列：僅首頁 */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
          <nav className="max-w-[1200px] mx-auto px-4 py-3 flex items-center">
            <a href="/" className="flex items-center gap-3">
              <img
                src="/logo-yunho-studio.png"
                alt="Yunho Studio"
                className="h-8 w-auto"
              />
              {/* 若想只顯示圖形可把文字註解掉 */}
              <span className="sr-only">Yunho Studio</span>
            </a>
            {/* 右側留白，保留極簡 */}
            <div className="ml-auto" />
          </nav>
        </header>

        {children}

        <footer className="border-t border-slate-200 mt-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 py-10 text-sm text-slate-500">
            <div className="flex justify-between flex-col md:flex-row gap-4">
              <span>© {new Date().getFullYear()} Yunho Studio</span>
              <span className="text-slate-400">Minimal · Modern</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
