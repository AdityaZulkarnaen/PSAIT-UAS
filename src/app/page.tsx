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
      <div className="flex h-screen flex-col">
        <Header />
        <div className="relative flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="relative flex-1">
            <MapView />
            <LegendaPeta />
            <SearchBar />
          </main>
        </div>
        <Footer />
      </div>
    </MapProvider>
  )
}
