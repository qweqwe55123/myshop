import { products } from "../lib/products";

export default function ProductsPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>商品目錄</h1>
        <div className="grid grid-2" style={{marginTop:16}}>
          {products.map(p => (
            <a key={p.slug} href={`/products/${p.slug}`} className="card" style={{textDecoration:"none", color:"inherit"}}>
              <img src={p.image} alt={p.name} style={{width:"100%", borderRadius:12}} />
              <h3>{p.name}</h3>
              <div className="price">NT${p.price}</div>
              <p>{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
