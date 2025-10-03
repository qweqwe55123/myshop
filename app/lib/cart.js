// app/lib/cart.js
export function addToCart(item) {
  if (typeof window === "undefined") return;

  const KEY = "cart";
  const cart = JSON.parse(localStorage.getItem(KEY) || "[]");

  const idx = cart.findIndex((i) => i.id === item.id);
  if (idx > -1) {
    cart[idx].qty += item.qty;
  } else {
    cart.push(item);
  }
  localStorage.setItem(KEY, JSON.stringify(cart));
}
