export default function Home() {
  return (
    <main>
      <section className="relative border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-100" />
        <div className="relative max-w-[1200px] mx-auto px-4 py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Less is more.
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              留白，讓生活更專注；簡約，讓質感自己說話。
            </p>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <img
                src="/logo-yunho-studio.png"
                alt="Yunho Studio"
                className="mx-auto w-full max-w-md h-auto"
              />
            </div>
            <div className="pointer-events-none absolute -inset-x-8 -bottom-8 h-24 bg-gradient-to-t from-slate-100 to-transparent blur-xl opacity-70" />
          </div>
        </div>
      </section>
    </main>
  );
}
