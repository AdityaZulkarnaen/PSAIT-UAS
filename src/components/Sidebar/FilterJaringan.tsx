'use client'

import { useMapContext } from '@/context/MapContext'
import Collapsible from '@/components/Collapsible'
import { ALL_STATUS, STATUS_COLORS, type FungsiPipa } from '@/types'

const FUNGSI_OPTIONS: Array<{
  value: FungsiPipa | 'Semua Fungsi Pipa'
  label: string
}> = [
  { value: 'Semua Fungsi Pipa', label: 'Semua Fungsi' },
  { value: 'Pipa Lateral', label: 'Lateral' },
  { value: 'Pipa Utama', label: 'Induk' },
  { value: 'Pipa Servis', label: 'Glontor' },
]

interface Props {
  open: boolean
  onToggle: () => void
}

export default function FilterJaringan({ open, onToggle }: Props) {
  const { filter, toggleStatus, setFungsiPipa } = useMapContext()

  return (
    <Collapsible title="Filter Jaringan" icon="☰" open={open} onToggle={onToggle}>
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            Status Jaringan
          </p>
          <div className="flex flex-wrap gap-2">
            {ALL_STATUS.map((status) => {
              const checked = filter.status.includes(status)
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => toggleStatus(status)}
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-semibold transition-colors"
                  style={{
                    borderColor: `${STATUS_COLORS[status]}55`,
                    backgroundColor: checked ? `${STATUS_COLORS[status]}10` : '#fff',
                    color: STATUS_COLORS[status],
                  }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[status] }}
                  />
                  {status}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
            Fungsi Pipa
          </p>
          <div className="relative">
            <select
              value={filter.fungsiPipa}
              onChange={(e) =>
                setFungsiPipa(e.target.value as FungsiPipa | 'Semua Fungsi Pipa')
              }
              className="w-full appearance-none rounded-xl border border-blue-500/80 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition-colors focus:border-blue-500"
            >
              {FUNGSI_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              ▾
            </span>
          </div>
        </div>
      </div>
    </Collapsible>
  )
}
