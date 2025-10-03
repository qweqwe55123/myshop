import GalleryClient from "./GalleryClient";
import BuyBoxClient from "./BuyBoxClient";
import { products } from "../../data/products";
import { CartProvider } from "../../components/CartProvider";

export default function Page({ params }) {
  const id = params.id;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="p-8">找不到商品</div>;
  }

  return (
    <CartProvider>
      <div className="grid md:grid-cols-2 gap-8">
        <GalleryClient images={product.images} />
        <BuyBoxClient product={product} />
      </div>
    </CartProvider>
  );
}
