'use client'

import dynamic from 'next/dynamic'
import { MapProvider } from '@/context/MapContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import LegendaPeta from '@/components/LegendaPeta'
import SearchBar from '@/components/SearchBar'

// MapView memuat Leaflet → harus client-only (tanpa SSR).
const MapView = dynamic(() => import('@/components/MapView'), { ssr: false })

export default function Home() {
  return (
    <MapProvider>
      <div className="relative h-dvh overflow-hidden bg-slate-100">
        <div className="absolute inset-0">
          <MapView />
        </div>
        <Header />
        <Sidebar />
        <LegendaPeta />
        <SearchBar />
        <Footer />
      </div>
    </MapProvider>
  )
}
