"use client";

import { useCart } from "../../components/CartProvider";

export default function BuyBoxClient({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="p-6 space-y-4 border rounded-xl">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg text-slate-600">NT$ {product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
      >
        加入購物車
      </button>
    </div>
  );
}
