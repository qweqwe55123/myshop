// lib/cart.js
export function getCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

export function setCart(cart) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(item) {
  // item: {id, name, price, qty}
  const cart = getCart();
  const i = cart.findIndex((x) => x.id === item.id);
  if (i >= 0) {
    cart[i].qty += item.qty;
  } else {
    cart.push(item);
  }
  setCart(cart);
  return cart;
}
