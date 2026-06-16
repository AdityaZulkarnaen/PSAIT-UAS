'use client'

import { useState } from 'react'
import { ALL_STATUS, STATUS_COLORS } from '@/types'

export default function LegendaPeta() {
  const [open, setOpen] = useState(true)

  return (
    <div className="absolute right-4 top-4 z-[500] w-44 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
          Legenda Peta
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle legenda"
          className="text-slate-400 hover:text-slate-600"
        >
          {open ? '▾' : '▸'}
        </button>
      </div>

      {open && (
        <div className="mt-2.5 space-y-2">
          {ALL_STATUS.map((status) => (
            <div key={status} className="flex items-center gap-2.5">
              <span
                className="block h-0.5 w-6 rounded"
                style={{ backgroundColor: STATUS_COLORS[status] }}
              />
              <span className="text-xs text-slate-600">{status}</span>
            </div>
          ))}
          <div className="mt-1.5 flex items-center gap-2.5 border-t border-slate-100 pt-2">
            <span className="block h-3 w-3 rounded-full border-2 border-white bg-blue-600 shadow" />
            <span className="text-xs text-slate-600">Manhole</span>
          </div>
        </div>
      )}
    </div>
  )
}
