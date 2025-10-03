"use client";
import { CartProvider } from "./components/CartProvider";

export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
