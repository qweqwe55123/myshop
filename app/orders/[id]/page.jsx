// app/orders/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
  const { id } = useParams(); // 取得路由參數
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) {
          setError(`找不到訂單（${res.status}）`);
          return;
        }
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError("伺服器錯誤，請稍後再試");
      }
    };

    fetchOrder();
  }, [id]);

  if (error)
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600">找不到訂單</h2>
        <p className="text-sm text-gray-500">訂單編號：{id}</p>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );

  if (!order)
    return (
      <div className="p-8 text-center text-gray-500">載入中...</div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">訂單成立成功 🎉</h1>
      <p className="mb-2">訂單編號：{order.orderNo}</p>
      <p className="mb-2">姓名：{order.customerName}</p>
      <p className="mb-2">電話：{order.customerPhone}</p>
      <p className="mb-2">取貨門市：{order.pickupStore}</p>
      <p className="mb-2">總金額：NT$ {order.total}</p>

      <hr className="my-4" />
      <h2 className="text-lg font-bold mb-2">訂購明細</h2>
      <ul className="divide-y">
        {order.items.map((it) => (
          <li key={it.id} className="flex justify-between py-2">
            <span>{it.name} × {it.qty}</span>
            <span>NT$ {it.price * it.qty}</span>
          </li>
        ))}
      </ul>

      <hr className="my-4" />
      <div className="text-sm text-gray-600">
        <p>付款方式：ATM 轉帳</p>
        <p>銀行代碼：008 華南銀行</p>
        <p>帳號：752100065001</p>
      </div>
    </div>
  );
}
