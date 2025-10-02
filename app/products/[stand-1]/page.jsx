"use client";
import { useState } from "react";

const productData = {
  id: "stand-1",
  name: "手機支架",
  price: "NT$399",
  description: "堅固耐用、可折疊攜帶的手機支架，支援多角度調整。",
  images: [
    "/products/stand-1/1.jpg",
    "/products/stand-1/2.jpg",
    "/products/stand-1/3.jpg",
    "/products/stand-1/4.jpg",
    "/products/stand-1/5.jpg",
    "/products/stand-1/6.jpg",
  ],
};

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 商品標題 */}
      <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
      <p className="text-gray-600 mb-2">{productData.price}</p>

      {/* 商品圖片列表 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {productData.images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`商品圖片 ${index + 1}`}
            className="rounded-lg cursor-pointer border hover:scale-105 transition"
            onClick={() => {
              setSelectedImage(index);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* 商品介紹 */}
      <p className="text-lg leading-relaxed">{productData.description}</p>

      {/* 圖片放大 Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          {/* 關閉按鈕 */}
          <button
            className="absolute top-4 right-6 text-white text-2xl"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>

          {/* 上一張 */}
          <button
            className="absolute left-4 text-white text-3xl"
            onClick={() =>
              setSelectedImage((prev) =>
                prev > 0 ? prev - 1 : productData.images.length - 1
              )
            }
          >
            ‹
          </button>

          {/* 顯示大圖 */}
          <img
            src={productData.images[selectedImage]}
            alt="放大圖片"
            className="max-h-[80%] max-w-[80%] rounded-lg shadow-lg"
          />

          {/* 下一張 */}
          <button
            className="absolute right-4 text-white text-3xl"
            onClick={() =>
              setSelectedImage((prev) =>
                prev < productData.images.length - 1 ? prev + 1 : 0
              )
            }
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
