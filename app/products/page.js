// 假設 products 是你列表的陣列
{products.map((product) => {
  const cover =
    product.cover ||
    (product.images && product.images[2]) || // 第3張（純產品）
    (product.images && product.images[0]) || // 不在就用第1張
    "/placeholder.png";

  return (
    <div key={product.id} className="rounded-2xl border border-slate-200 overflow-hidden">
      {/* 圖片容器：固定比例 + 置中 + 不裁切 */}
      <div className="aspect-[4/3] w-full bg-white flex items-center justify-center p-3">
        <img
          src={cover}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* 下面維持你原本的標題、價格、按鈕 */}
      {/* ... */}
    </div>
  );
})}
