'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Leaflet butuh `window`, jadi MapCore di-load tanpa SSR.
const MapCore = dynamic(() => import('./MapCore'), {
  ssr: false,
  loading: () => <MapLoading />,
})

function MapLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-500" />
        <span className="text-sm text-slate-500">Memuat peta…</span>
      </div>
    </div>
  )
}

export default function MapView() {
  // Loading overlay singkat saat peta pertama mount.
  const [booting, setBooting] = useState(true)
  useEffect(() => {
    const t = window.setTimeout(() => setBooting(false), 500)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className="relative h-full w-full">
      <MapCore />
      {booting && (
        <div className="absolute inset-0 z-[600] flex items-center justify-center bg-slate-100/80 backdrop-blur-sm">
          <MapLoading />
        </div>
      )}
    </div>
  )
}
