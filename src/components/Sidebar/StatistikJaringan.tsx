'use client'

import { useMapContext } from '@/context/MapContext'
import Collapsible from '@/components/Collapsible'
import { ALL_STATUS, STATUS_COLORS, type StatusAset } from '@/types'

function StatusCard({
  status,
  count,
}: {
  status: StatusAset
  count: number
}) {
  return (
    <div
      className="flex flex-col items-center rounded-lg border py-2"
      style={{
        borderColor: `${STATUS_COLORS[status]}40`,
        backgroundColor: `${STATUS_COLORS[status]}12`,
      }}
    >
      <span
        className="text-xl font-bold"
        style={{ color: STATUS_COLORS[status] }}
      >
        {count}
      </span>
      <span className="text-[11px] text-slate-500">{status}</span>
    </div>
  )
}

export default function StatistikJaringan() {
  const { stats } = useMapContext()

  return (
    <Collapsible title="Statistik Jaringan">
      <div className="space-y-4">
        <div className="rounded-lg bg-cyan-50 px-3 py-2.5">
          <p className="text-xs text-slate-500">Total Panjang Jaringan</p>
          <p className="text-2xl font-bold text-cyan-700">
            {stats.totalPanjangKm.toFixed(2)}{' '}
            <span className="text-sm font-medium text-slate-500">km</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
            <span className="text-xs text-slate-500">Manhole</span>
            <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs font-bold text-white">
              {stats.jumlahManhole}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
            <span className="text-xs text-slate-500">Pipa</span>
            <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs font-bold text-white">
              {stats.jumlahPipa}
            </span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold text-slate-500">
            Status Manhole
          </p>
          <div className="grid grid-cols-3 gap-2">
            {ALL_STATUS.map((s) => (
              <StatusCard
                key={s}
                status={s}
                count={stats.manholeByStatus[s]}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold text-slate-500">
            Informasi Pipa
          </p>
          <div className="grid grid-cols-3 gap-2">
            {ALL_STATUS.map((s) => (
              <StatusCard key={s} status={s} count={stats.pipaByStatus[s]} />
            ))}
          </div>
        </div>
      </div>
    </Collapsible>
  )
}
