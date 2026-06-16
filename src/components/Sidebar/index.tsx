'use client'

import { useMapContext } from '@/context/MapContext'
import FilterJaringan from './FilterJaringan'
import StatistikJaringan from './StatistikJaringan'

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useMapContext()

  return (
    <>
      {/* Backdrop saat sidebar terbuka di layar kecil */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="absolute inset-0 z-[800] bg-black/30 md:hidden"
        />
      )}

      <aside
        className={`absolute z-[850] h-full w-80 max-w-[85vw] shrink-0 space-y-4 overflow-y-auto border-r border-slate-200 bg-slate-50 p-4 transition-transform duration-300 ease-in-out md:relative md:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:hidden'
        }`}
      >
        <FilterJaringan />
        <StatistikJaringan />
      </aside>
    </>
  )
}
