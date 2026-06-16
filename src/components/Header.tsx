'use client'

import { useMapContext } from '@/context/MapContext'

export default function Header() {
  const { toggleSidebar } = useMapContext()

  return (
    <header className="fixed inset-x-0 top-0 z-[1100] border-b border-slate-200 bg-white px-3 py-2 sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100"
          >
            ☰
          </button>
          <span className="text-2xl">🏛️</span>
          <h1 className="max-w-[220px] text-sm font-bold leading-tight text-slate-800 sm:max-w-md">
            Balai Pengelolaan Air Limbah dan Pengembangan Jasa Konstruksi
          </h1>
        </div>

        <nav className="flex items-center gap-2.5 sm:gap-4">
          <a
            href="#"
            className="hidden text-sm font-medium text-red-600 underline underline-offset-4 sm:inline"
          >
            Beranda
          </a>
          <a
            href="#"
            className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 sm:inline"
          >
            Lapor Masalah
          </a>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Admin Login
          </button>
        </nav>
      </div>
    </header>
  )
}
