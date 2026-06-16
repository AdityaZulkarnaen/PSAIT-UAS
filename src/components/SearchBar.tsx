'use client'

import { useState } from 'react'
import { useMapContext } from '@/context/MapContext'

export default function SearchBar() {
  const { search } = useMapContext()
  const [query, setQuery] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    search(query)
  }

  return (
    <form
      onSubmit={submit}
      className="absolute bottom-20 left-1/2 z-[600] flex w-[92vw] max-w-lg -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white/95 p-1.5 pl-4 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur-md"
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari ID aset (MH-001 / PP-001) atau lat,lng"
        className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-600"
      >
        Cari Data
      </button>
    </form>
  )
}
