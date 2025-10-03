// app/products/[id]/BuyBoxClient.jsx
"use client";

import { useState } from "react";
import { addToCart } from "../../lib/cart"; // ← 放在 app/lib/cart.js 的寫法

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
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <div className="mt-2 text-rose-600 text-3xl font-bold">
        ${product.price}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="px-3 py-1 border rounded"
        >
          -
        </button>
        <span>{qty}</span>
        <button
          onClick={() => setQty(qty + 1)}
          className="px-3 py-1 border rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={onAdd}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        加入購物車
      </button>
    </div>
  );
}
