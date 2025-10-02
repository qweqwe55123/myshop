"use client";
import { useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm hover:shadow-md transition">
      {/* 圖片縮圖 */}
      <div
        className="aspect-[4/3] w-full overflow-hidden rounded-xl cursor-pointer"
        onClick={() => openModal(0)}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      {/* 商品資訊 */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="mt-2 text-pink-600 font-bold text-lg">${product.price}</p>
      </div>

      {/* 放大檢視 Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={closeModal}
          >
            ✕
          </button>

          {/* 切換圖片 */}
          <button
            className="absolute left-5 text-white text-3xl"
            onClick={prevImage}
          >
            ‹
          </button>
          <img
            src={product.images[currentIndex]}
            alt="zoom"
            className="max-h-[80%] max-w-[90%] rounded-xl shadow-lg"
          />
          <button
            className="absolute right-5 text-white text-3xl"
            onClick={nextImage}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
