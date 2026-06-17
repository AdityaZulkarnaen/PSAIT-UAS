'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Map as LeafletMap } from 'leaflet'
import { useMapFilter, type NetworkStats } from '@/hooks/useMapFilter'
import { useMapSearch, type FocusTarget } from '@/hooks/useMapSearch'
import type { FilterState, Manhole, Pipa, StatusAset } from '@/types'

interface MapContextValue {
  // Filter
  filter: FilterState
  toggleStatus: (status: StatusAset) => void
  setFungsiPipa: (fungsi: FilterState['fungsiPipa']) => void
  filteredManholes: Manhole[]
  filteredPipes: Pipa[]
  stats: NetworkStats
  loading: boolean
  error: string | null
  // Map instance
  setMap: (map: LeafletMap | null) => void
  // Search
  search: (query: string) => void
  focusTarget: FocusTarget | null
  // Sidebar
  sidebarOpen: boolean
  toggleSidebar: () => void
}

const MapContext = createContext<MapContextValue | null>(null)

export function MapProvider({ children }: { children: ReactNode }) {
  const {
    filter,
    toggleStatus,
    setFungsiPipa,
    filteredManholes,
    filteredPipes,
    stats,
    loading,
    error,
  } = useMapFilter()

  const [map, setMap] = useState<LeafletMap | null>(null)
  const { search, focusTarget } = useMapSearch(
    map,
    filteredManholes,
    filteredPipes,
  )

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const toggleSidebar = () => setSidebarOpen((prev) => !prev)

  const value = useMemo<MapContextValue>(
    () => ({
      filter,
      toggleStatus,
      setFungsiPipa,
      filteredManholes,
      filteredPipes,
      stats,
      loading,
      error,
      setMap,
      search,
      focusTarget,
      sidebarOpen,
      toggleSidebar,
    }),
    [
      filter,
      filteredManholes,
      filteredPipes,
      stats,
      loading,
      error,
      search,
      focusTarget,
      sidebarOpen,
    ],
  )

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}

export function useMapContext() {
  const ctx = useContext(MapContext)
  if (!ctx) {
    throw new Error('useMapContext harus dipakai di dalam <MapProvider>')
  }
  return ctx
}
