'use client'

import { useCallback, useState } from 'react'
import type { Map as LeafletMap } from 'leaflet'
import type { Manhole, Pipa } from '@/types'

export interface FocusTarget {
  type: 'manhole' | 'pipe'
  id: string
  /** Berubah tiap pencarian agar efek fokus/popup dapat dipicu ulang. */
  nonce: number
}

const COORD_RE = /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/

/**
 * Logic pencarian aset + fly-to.
 * - "lat,lng"          → terbang langsung ke koordinat.
 * - ID / kode manhole  → terbang ke manhole + buka popup + highlight.
 * - ID pipa            → fit ke bounds pipa + buka popup + highlight.
 * Tidak ketemu         → alert sederhana.
 */
export function useMapSearch(
  map: LeafletMap | null,
  manholes: Manhole[],
  pipes: Pipa[],
) {
  const [focusTarget, setFocusTarget] = useState<FocusTarget | null>(null)

  const search = useCallback(
    (rawQuery: string) => {
      const query = rawQuery.trim()
      if (!query) return

      const coord = query.match(COORD_RE)
      if (coord) {
        map?.flyTo([parseFloat(coord[1]), parseFloat(coord[2])], 17, {
          duration: 1,
        })
        return
      }

      const q = query.toLowerCase()

      const manhole = manholes.find(
        (m) => m.id.toLowerCase() === q || m.kode.toLowerCase() === q,
      )
      if (manhole) {
        map?.flyTo(manhole.koordinat, 17, { duration: 1 })
        setFocusTarget({ type: 'manhole', id: manhole.id, nonce: nextNonce() })
        return
      }

      const pipa = pipes.find((p) => p.id.toLowerCase() === q)
      if (pipa) {
        const lats = pipa.koordinat.map((c) => c[0])
        const lngs = pipa.koordinat.map((c) => c[1])
        const bounds: [[number, number], [number, number]] = [
          [Math.min(...lats), Math.min(...lngs)],
          [Math.max(...lats), Math.max(...lngs)],
        ]
        map?.flyToBounds(bounds, { maxZoom: 17, padding: [60, 60] })
        setFocusTarget({ type: 'pipe', id: pipa.id, nonce: nextNonce() })
        return
      }

      window.alert(`Data tidak ditemukan untuk: "${query}"`)
    },
    [map, manholes, pipes],
  )

  return { search, focusTarget }
}

let nonceCounter = 0
function nextNonce() {
  nonceCounter += 1
  return nonceCounter
}
