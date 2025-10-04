"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * 極簡門市選擇器（只示範 7-ELEVEN）
 * props:
 *  - open: boolean
 *  - onClose: () => void
 *  - onSelect: (storeName: string) => void
 */
export default function StorePicker({ open, onClose, onSelect }) {
  const [q, setQ] = useState("");

  // 你可以改成打 API 取得門市；這裡先做一些示範門市
  const stores = useMemo(
    () => [
      "7-ELEVEN 台北車站門市",
      "7-ELEVEN 西門町武昌門市",
      "7-ELEVEN 信義威秀門市",
      "7-ELEVEN 板橋車站門市",
      "7-ELEVEN 台中車站門市",
      "7-ELEVEN 高雄夢時代門市",
    ],
    []
  );

  const filtered = useMemo(() => {
    const k = q.trim();
    if (!k) return stores;
    return stores.filter((s) => s.toLowerCase().includes(k.toLowerCase()));
  }, [q, stores]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      {/* 面板 */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">選擇 7-ELEVEN 門市</h3>
          <button
            className="rounded-md border px-3 py-1 text-sm hover:bg-slate-50"
            onClick={onClose}
          >
            關閉
          </button>
        </div>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="輸入區域 / 門市關鍵字"
          className="mb-4 w-full rounded-md border p-2"
        />

        <div className="max-h-72 overflow-auto rounded-lg border">
          {filtered.length === 0 ? (
            <div className="p-4 text-sm text-slate-500">查無符合門市</div>
          ) : (
            <ul className="divide-y">
              {filtered.map((s) => (
                <li
                  key={s}
                  className="flex items-center justify-between px-4 py-3 hover:bg-slate-50"
                >
                  <span className="truncate">{s}</span>
                  <button
                    className="rounded-md border px-3 py-1 text-sm hover:bg-slate-100"
                    onClick={() => {
                      onSelect?.(s);
                      onClose?.();
                    }}
                  >
                    使用此門市
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
