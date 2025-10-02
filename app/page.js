export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* 網站標題 */}
      <h1 className="text-4xl font-extrabold text-amber-600 mb-6">
        歡迎來到我的商店 🛍️
      </h1>

      {/* Tailwind 測試框 */}
      <div className="bg-amber-100 text-amber-900 p-6 rounded-xl shadow-md mb-6">
        這是 Tailwind 測試：有看到淡橘背景、圓角、陰影嗎？
      </div>

      {/* 測試按鈕 */}
      <button className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition">
        點我測試按鈕
      </button>
    </main>
  );
}