"use client";
import { useState } from "react";

export default function Home() {
  const [qty, setQty] = useState(1);
  const price = 299;

  const addToCart = () => {
    alert(`已加入購物車：手機支架 x ${qty}（小計 $${price * qty}）\n（之後會改為真正購物車＋付款）`);
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-gray-100 border-b border-slate-200">
        <div className="max-w-[1100px] mx-auto px-4 py-14 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              每天的小日子，也值得好好被支撐。
            </h1>
            <p className="mt-3 text-slate-600">
              手機支架，穩固不晃，陪你滑劇、追片、視訊不費力。
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 font-semibold text-white hover:opacity-90"
              >
                逛逛商品
              </a>
              <a
                href="/products"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-gray-50"
              >
                查看全部
              </a>
            </div>
          </div>
          <div className="text-center">
            {/* 先放佔位圖；之後把 /placeholder.jpg 換成你的產品圖 */}
            <img
              src="/placeholder.jpg"
              alt="手機支架"
              className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* 商品卡片（手機支架） */}
      <section id="products" className="max-w-[1100px] mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-4">精選商品</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
            <img
              src="/placeholder.jpg"
              alt="手機支架"
              className="w-full h-56 object-cover rounded-xl border border-slate-100"
            />
            <h3 className="mt-3 text-lg font-semibold">手機支架</h3>
            <p className="text-slate-500 text-sm">穩固不晃｜可調視角｜小巧易收納</p>

            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-rose-600 font-extrabold text-2xl">${price}</div>
                <div className="text-xs text-slate-400">含稅，不含運費</div>
              </div>

              {/* 數量 */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg border border-slate-200 text-slate-700 hover:bg-gray-50"
                >−</button>
                <span className="min-w-6 text-center">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-9 h-9 rounded-lg border border-slate-200 text-slate-700 hover:bg-gray-50"
                >＋</button>
              </div>
            </div>

            <button
              onClick={addToCart}
              className="mt-4 w-full rounded-xl bg-black text-white py-3 font-semibold hover:opacity-90"
            >
              加入購物車
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
