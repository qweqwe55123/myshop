"use client";
import { products } from "../../lib/products";

export default function ProductDetail({ params }) {
  const item = products.find(p => p.slug === params.slug);
  if (!item) return <main className="section"><div className="container">找不到商品。</div></main>;

  const buy = () => alert(`下一步會接綠界金流：下單 ${item.name}（NT$${item.price}）`);

  return (
    <main className="section">
      <div className="container">
        <h1>{item.name}</h1>
        <img src={item.image} alt={item.name} style={{maxWidth:400, borderRadius:12}} />
        <div className="price">NT${item.price}</div>
        <p>{item.desc}</p>
        <button className="btn btn-primary" onClick={buy}>立即購買</button>
      </div>
    </main>
  );
}
