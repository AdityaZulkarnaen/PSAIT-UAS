'use client'

import { useMapContext } from '@/context/MapContext'
import Collapsible from '@/components/Collapsible'
import { ALL_STATUS, STATUS_COLORS, type FungsiPipa } from '@/types'

const FUNGSI_OPTIONS: (FungsiPipa | 'Semua Fungsi Pipa')[] = [
  'Semua Fungsi Pipa',
  'Pipa Servis',
  'Pipa Lateral',
  'Pipa Utama',
]

export default function FilterJaringan() {
  const { filter, toggleStatus, setFungsiPipa } = useMapContext()

  return (
    <Collapsible title="Filter Jaringan">
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold text-slate-500">
            Status Aset
          </p>
          <div className="space-y-2">
            {ALL_STATUS.map((status) => {
              const checked = filter.status.includes(status)
              return (
                <label
                  key={status}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleStatus(status)}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300"
                    style={{ accentColor: STATUS_COLORS[status] }}
                  />
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[status] }}
                  />
                  {status}
                </label>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold text-slate-500">
            Fungsi Pipa
          </p>
          <select
            value={filter.fungsiPipa}
            onChange={(e) =>
              setFungsiPipa(e.target.value as FungsiPipa | 'Semua Fungsi Pipa')
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-400"
          >
            {FUNGSI_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Collapsible>
  )
}
