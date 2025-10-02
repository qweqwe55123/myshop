import ProductGallery from "@/components/ProductGallery";

export default function ProductPage() {
  const images = [
    "/products/1.jpg",
    "/products/2.jpg",
    "/products/3.jpg",
    "/products/4.jpg",
    "/products/5.jpg",
    "/products/6.jpg",
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">手機支架 Minimal Stand</h1>
      <ProductGallery images={images} />
      <div className="mt-6">
        <p>極簡設計，穩固不晃，適合各種使用場景。</p>
        <p className="text-xl font-semibold text-red-600 mt-2">$299</p>
      </div>
    </div>
  );
}
