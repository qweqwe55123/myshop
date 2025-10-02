"use client";
import { useState } from "react";

export default function Home() {
  const [qty, setQty] = useState(1);
  const price = 299;

  const addToCart = () => {
    alert(`已加入購物車：手機支架 x ${qty}（小計 $${price * qty}）`);
  };

  return (
    <main>
      {/* HERO：極簡大字＋柔和漸層背景 */}
      <section className="relative border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-100" />
        <div className="relative max-w-[1200px] mx-auto px-4 py-16 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-[12px] text-slate-600">
              新品輕量｜可調角度｜穩固不晃
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              每天的小日子，<span className="text-slate-500">也值得好好被支撐。</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              手機支架，陪你滑劇、追片、視訊不費力。
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:opacity-90 transition"
              >
                逛逛商品
              </a>
              <a
                href="/products"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50 transition"
              >
                查看全部
              </a>
            </div>
          </div>

          {/* 產品示意圖（之後換成你的圖） */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
              <img
                src="/placeholder.jpg"
                alt="手機支架"
                className="w-full h-[420px] object-cover rounded-2xl"
              />
            </div>
            {/* 柔光 */}
            <div className="pointer-events-none absolute -inset-x-8 -bottom-8 h-24 bg-gradient-to-t from-slate-100 to-transparent blur-xl opacity-70" />
          </div>
        </div>
      </section>

      {/* 精選商品卡片 */}
      <section id="products" className="max-w-[1200px] mx-auto px-4 py-14">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">精選商品</h2>
          <a href="/products" className="text-sm text-slate-600 hover:text-slate-900 transition">更多商品 →</a>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {/* 商品卡 */}
          <article className="group relative bg-white border border-slate-200 rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/placeholder.jpg"
                alt="手機支架"
                className="w-full h-64 object-cover group-hover:scale-[1.03] transition"
              />
              <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[12px] font-medium text-slate-700 border border-slate-200">
                熱賣中
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">手機支架 · Minimal Stand</h3>
              <p className="mt-1 text-slate-500 text-sm">可調視角｜摺疊收納｜防滑矽膠</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-rose-600 font-extrabold text-2xl">$
                  {price}
                </div>
                <div className="text-xs text-slate-400">含稅，不含運</div>
              </div>

              {/* 數量步進器 */}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg text-slate-700 hover:bg-white hover:shadow-sm transition"
                  aria-label="decrease"
                >−</button>
                <span className="w-8 text-center tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-8 h-8 rounded-lg text-slate-700 hover:bg-white hover:shadow-sm transition"
                  aria-label="increase"
                >＋</button>
              </div>
            </div>

            <button
              onClick={addToCart}
              className="mt-4 w-full rounded-xl bg-slate-900 text-white py-3 font-semibold hover:opacity-90 transition"
            >
              加入購物車
            </button>
          </article>
        </div>
      </section>
    </main>
  );
}
