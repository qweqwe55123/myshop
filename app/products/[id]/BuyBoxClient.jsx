// app/products/[id]/BuyBoxClient.jsx
"use client";

import { useState } from "react";
import { addToCart } from "../../../lib/cart";

export default function BuyBoxClient({ product }) {
  const [qty, setQty] = useState(1);

  const onAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      qty,
    });
    alert("已加入購物車");
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="mt-2 text-rose-600 text-3xl font-extrabold">
          ${product.price}
        </div>
        <p className="mt-4 text-slate-600 leading-7">{product.description}</p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="inline-flex items-center rounded-xl border px-3 py-2">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-2 text-lg"
            aria-label="decrement"
          >
            -
          </button>
          <span className="px-3">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-2 text-lg"
            aria-label="increment"
          >
            +
          </button>
        </div>

        <button
          onClick={onAdd}
          className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
        >
          加入購物車
        </button>
      </div>
    </div>
  );
}
