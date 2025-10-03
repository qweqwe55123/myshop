// lib/cart.js
export function addToCart(product) {
  // 先從 localStorage 抓現有的購物車
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 檢查是否已經存在相同商品
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // 存回 localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("已加入購物車！");
}
