export default function BottomStatusBar() {
  return (
    <div className="fixed bottom-5 left-1/2 z-20 w-[92%] max-w-3xl -translate-x-1/2 rounded-full border border-slate-200 bg-white/95 px-4 py-2 shadow-sm backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div>
          Copyright © 2026 NZSME. All rights reserved.
        </div>

        <button
          type="button"
          className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700 hover:bg-emerald-200 transition"
        >
          Powered by webfitt.com
        </button>
      </div>
    </div>
  );
}