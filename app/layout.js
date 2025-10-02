export const metadata = { title: "Yunho Studio", description: "Minimal & Modern" };

import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";

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

        <Providers>
          <Navbar />
          {children}
        </Providers>

        <footer className="border-t border-slate-200 mt-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 py-10 text-sm text-slate-500">
            <div className="flex justify-between flex-col md:flex-row gap-4">
              <span>© {new Date().getFullYear()} Yunho Studio</span>
              <span className="text-slate-400">Less is more.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
