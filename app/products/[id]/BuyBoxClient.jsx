"use client";

import { useState } from "react";
import { addToCart } from "../../lib/cart";

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
      <button
        onClick={onAdd}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        加入購物車
      </button>
    </div>
  );
}
