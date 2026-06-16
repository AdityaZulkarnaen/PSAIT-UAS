'use client'

import { Polyline, Popup, Tooltip } from 'react-leaflet'
import type { Polyline as LeafletPolyline } from 'leaflet'
import { STATUS_COLORS, type Pipa } from '@/types'
import PipePopup from '@/components/PopupDetail/PipePopup'

const BASE_WEIGHT = 4
const HOVER_WEIGHT = 6

interface Props {
  pipes: Pipa[]
  registerRef: (id: string, layer: LeafletPolyline | null) => void
}

export default function PipeLayer({ pipes, registerRef }: Props) {
  return (
    <>
      {pipes.map((pipa) => (
        <Polyline
          key={pipa.id}
          positions={pipa.koordinat}
          pathOptions={{
            color: STATUS_COLORS[pipa.status],
            weight: BASE_WEIGHT,
            opacity: 0.85,
          }}
          ref={(layer) => registerRef(pipa.id, layer)}
          eventHandlers={{
            mouseover: (e) => e.target.setStyle({ weight: HOVER_WEIGHT }),
            mouseout: (e) => e.target.setStyle({ weight: BASE_WEIGHT }),
          }}
        >
          <Tooltip sticky>{pipa.id}</Tooltip>
          <Popup>
            <PipePopup pipa={pipa} />
          </Popup>
        </Polyline>
      ))}
    </>
  )
}
