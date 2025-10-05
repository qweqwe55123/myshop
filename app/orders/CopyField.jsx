"use client";

export default function CopyField({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-20 shrink-0 text-sm text-slate-500">{label}</span>
      <div className="flex-1 rounded-md border px-3 py-2 text-sm bg-slate-50">
        {value}
      </div>
      <button
        className="ml-2 shrink-0 rounded-md border px-3 py-1 text-xs hover:bg-slate-50"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(String(value));
          } catch {}
        }}
      >
        複製
      </button>
    </div>
  );
}
