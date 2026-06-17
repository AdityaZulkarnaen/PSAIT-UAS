'use client'

import dynamic from 'next/dynamic'
import { useMapContext } from '@/context/MapContext'

// Leaflet butuh `window`, jadi MapCore di-load tanpa SSR.
const MapCore = dynamic(() => import('./MapCore'), {
  ssr: false,
  loading: () => <MapLoading label="Memuat peta…" />,
})

function MapLoading({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-500" />
        <span className="text-sm text-slate-500">{label}</span>
      </div>
    </div>
  )
}

export default function MapView() {
  const { loading, error } = useMapContext()

  return (
    <div className="relative h-full w-full">
      <MapCore />

      {loading && !error && (
        <div className="absolute inset-0 z-600 flex items-center justify-center bg-slate-100/80 backdrop-blur-sm">
          <MapLoading label="Memuat data jaringan…" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-600 flex items-center justify-center bg-slate-100/90 p-6 backdrop-blur-sm">
          <div className="max-w-sm rounded-2xl border border-red-200 bg-white px-5 py-4 text-center shadow-lg">
            <p className="text-sm font-semibold text-red-600">
              Gagal memuat data jaringan
            </p>
            <p className="mt-1 text-xs text-slate-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-200"
            >
              Muat ulang
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
