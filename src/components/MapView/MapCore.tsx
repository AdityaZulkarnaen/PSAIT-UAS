'use client'

import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L, {
  type CircleMarker as LeafletCircleMarker,
  type Map as LeafletMap,
  type Polyline as LeafletPolyline,
} from 'leaflet'
import { useMapContext } from '@/context/MapContext'
import ManholeLayer from './ManholeLayer'
import PipeLayer from './PipeLayer'
import MapControls from './MapControls'

const CENTER: [number, number] = [-7.7956, 110.3695]
const DEFAULT_ZOOM = 14

// Fix ikon default Leaflet (path aset rusak saat di-bundle).
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

/** Mendaftarkan instance map ke context begitu peta siap. */
function MapBridge({ onReady }: { onReady: (map: LeafletMap) => void }) {
  const map = useMap()
  useEffect(() => {
    onReady(map)
  }, [map, onReady])
  return null
}

export default function MapCore() {
  const { filteredManholes, filteredPipes, setMap, focusTarget } =
    useMapContext()

  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null)

  const manholeRefs = useRef<Record<string, LeafletCircleMarker | null>>({})
  const pipeRefs = useRef<Record<string, LeafletPolyline | null>>({})

  // Buka popup + efek highlight saat hasil pencarian ditemukan.
  useEffect(() => {
    if (!focusTarget) return
    if (focusTarget.type === 'manhole') {
      const layer = manholeRefs.current[focusTarget.id]
      if (!layer) return
      layer.openPopup()
      const el = (layer as unknown as { _path?: SVGElement })._path
      if (el) {
        el.classList.remove('asset-bounce')
        // Reflow agar animasi dapat dipicu ulang.
        void el.getBoundingClientRect()
        el.classList.add('asset-bounce')
        window.setTimeout(() => el.classList.remove('asset-bounce'), 1400)
      }
    } else {
      pipeRefs.current[focusTarget.id]?.openPopup()
    }
  }, [focusTarget])

  const handleReady = (map: LeafletMap) => {
    setMapInstance(map)
    setMap(map)
  }

  const handleLocate = () => {
    if (!mapInstance) return
    mapInstance
      .locate({ setView: true, maxZoom: 16 })
      .once('locationerror', () =>
        window.alert('Tidak dapat mengakses lokasi Anda.'),
      )
  }

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={CENTER}
        zoom={DEFAULT_ZOOM}
        zoomControl={false}
        scrollWheelZoom
        className="h-full w-full"
      >
        <MapBridge onReady={handleReady} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PipeLayer
          pipes={filteredPipes}
          registerRef={(id, layer) => {
            pipeRefs.current[id] = layer
          }}
        />
        <ManholeLayer
          manholes={filteredManholes}
          registerRef={(id, layer) => {
            manholeRefs.current[id] = layer
          }}
        />
      </MapContainer>

      <MapControls
        onZoomIn={() => mapInstance?.zoomIn()}
        onZoomOut={() => mapInstance?.zoomOut()}
        onLocate={handleLocate}
      />
    </div>
  )
}
