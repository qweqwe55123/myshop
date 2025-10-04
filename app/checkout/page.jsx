// app/checkout/page.jsx
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import CheckoutForm from "../components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">填寫訂購資訊</h1>
      <CheckoutForm />
    </main>
  );
}
