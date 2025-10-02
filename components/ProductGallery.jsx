"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-full flex flex-col items-center">
      {/* 主圖 */}
      <div className="relative w-full max-w-md h-96">
        <Image
          src={images[current]}
          alt={`圖片 ${current + 1}`}
          fill
          className="object-contain rounded-lg cursor-pointer"
          onClick={() => {
            setCurrent((current + 1) % images.length);
          }}
        />
      </div>

      {/* 縮圖 */}
      <div className="flex gap-2 mt-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`border-2 rounded-md overflow-hidden ${
              current === idx ? "border-black" : "border-gray-300"
            }`}
          >
            <Image src={img} alt={`縮圖 ${idx + 1}`} width={60} height={60} />
          </button>
        ))}
      </div>
    </div>
  );
}
