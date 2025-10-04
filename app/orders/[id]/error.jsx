"use client";

export default function Error({ error, reset }) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">頁面出錯了</h2>
      <pre className="whitespace-pre-wrap text-red-600">
        {error?.message || String(error)}
      </pre>
      <button
        onClick={() => reset()}
        className="rounded bg-black px-3 py-1 text-white"
      >
        重試
      </button>
    </div>
  );
}
