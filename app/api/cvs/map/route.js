// app/api/cvs/map/route.js
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const subtype = searchParams.get("subtype") || "UNIMARTC2C"; // 7-11
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const returnUrl = `${proto}://${host}/api/cvs/return`;

  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
  <form id="f" method="POST" action="https://logistics-stage.ecpay.com.tw/Express/map">
    <input type="hidden" name="MerchantID" value="2000132"/>
    <input type="hidden" name="LogisticsType" value="CVS"/>
    <input type="hidden" name="LogisticsSubType" value="${subtype}"/>
    <input type="hidden" name="IsCollection" value="N"/>
    <input type="hidden" name="ServerReplyURL" value="${returnUrl}"/>
  </form>
  <script>document.getElementById('f').submit();</script>
  </body></html>`;

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
