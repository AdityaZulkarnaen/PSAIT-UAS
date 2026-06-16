'use client'

import { CircleMarker, Popup, Tooltip } from 'react-leaflet'
import type { CircleMarker as LeafletCircleMarker } from 'leaflet'
import { STATUS_COLORS, type Manhole } from '@/types'
import ManholePopup from '@/components/PopupDetail/ManholePopup'

const BASE_RADIUS = 7
const HOVER_RADIUS = 10

interface Props {
  manholes: Manhole[]
  registerRef: (id: string, layer: LeafletCircleMarker | null) => void
}

export default function ManholeLayer({ manholes, registerRef }: Props) {
  return (
    <>
      {manholes.map((manhole) => (
        <CircleMarker
          key={manhole.id}
          center={manhole.koordinat}
          radius={BASE_RADIUS}
          pathOptions={{
            color: '#ffffff',
            weight: 2,
            fillColor: STATUS_COLORS[manhole.status],
            fillOpacity: 1,
          }}
          ref={(layer) => registerRef(manhole.id, layer)}
          eventHandlers={{
            mouseover: (e) => e.target.setRadius(HOVER_RADIUS),
            mouseout: (e) => e.target.setRadius(BASE_RADIUS),
          }}
        >
          <Tooltip direction="top" offset={[0, -6]}>
            {manhole.kode}
          </Tooltip>
          <Popup>
            <ManholePopup manhole={manhole} />
          </Popup>
        </CircleMarker>
      ))}
    </>
  )
}
