import "./globals.css";
export const metadata = { title: "Nuts Studio", description: "手工堅果塔商店" };

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body>
        <header style={{borderBottom:"1px solid #e2e8f0", background:"#fff"}}>
          <nav style={{maxWidth:1100, margin:"0 auto", padding:"14px 16px", display:"flex", gap:16, alignItems:"center"}}>
            <a href="/" style={{fontWeight:800, color:"#0f172a", textDecoration:"none"}}>Nuts Studio</a>
            <a href="/products" style={{color:"#0f172a", textDecoration:"none"}}>商品目錄</a>
            <a href="/#faq" style={{marginLeft:"auto", color:"#0f172a", textDecoration:"none"}}>常見問題</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
