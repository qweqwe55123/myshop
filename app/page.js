"use client";

export default function Home() {
  const goProducts = () => location.assign("/products");

  return (
    <main>
      <section className="hero">
        <div className="container" style={{textAlign:"center"}}>
          <span className="badge">每日手工 · 低糖不膩</span>
          <h1>手工堅果塔｜新鮮出爐的好味道</h1>
          <p>嚴選天然堅果，低溫烘焙，焦糖香而不膩。精美包裝，送禮自用兩相宜。</p>
          <div style={{display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap"}}>
            <button className="btn btn-primary" onClick={goProducts}>逛逛商品</button>
            <a className="btn btn-ghost" href="#faq">看看常見問題</a>
          </div>
          <div style={{marginTop:24}}>
            <img className="hero-img" src="/nuts.jpg" alt="手工堅果塔" />
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container grid grid-2">
          <div className="card">
            <h3>保存方式</h3>
            <p>建議冷藏保存；常溫不超過 2 天。冷藏 7 天、冷凍 21 天。</p>
          </div>
          <div className="card">
            <h3>配送方式</h3>
            <p>黑貓低溫宅配。滿千免運。客服：example@gmail.com</p>
          </div>
        </div>
      </section>

      <footer className="center">
        <div className="container">
          <small>© {new Date().getFullYear()} Nuts Studio</small>
        </div>
      </footer>
    </main>
  );
}
