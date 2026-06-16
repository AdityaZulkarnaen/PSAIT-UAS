'use client'

import { useState } from 'react'
import FilterJaringan from './FilterJaringan'
import StatistikJaringan from './StatistikJaringan'

export default function Sidebar() {
  const [activePanel, setActivePanel] = useState<'filter' | 'statistik' | null>(
    'filter',
  )

  const openFilter = activePanel === 'filter'
  const openStatistik = activePanel === 'statistik'

  const toggleFilter = () =>
    setActivePanel((value) => (value === 'filter' ? null : 'filter'))

  const toggleStatistik = () =>
    setActivePanel((value) => (value === 'statistik' ? null : 'statistik'))

  return (
    <>
      <aside className="fixed left-4 top-16 z-950 w-85 max-w-[calc(100vw-2rem)] space-y-4 overflow-y-auto">
        <FilterJaringan open={openFilter} onToggle={toggleFilter} />
        <StatistikJaringan open={openStatistik} onToggle={toggleStatistik} />
      </aside>
    </>
  )
}
