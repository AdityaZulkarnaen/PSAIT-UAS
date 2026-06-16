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
      className="flex flex-col items-center rounded-2xl border px-2.5 py-2.5"
      style={{
        borderColor: `${STATUS_COLORS[status]}40`,
        backgroundColor: `${STATUS_COLORS[status]}10`,
      }}
    >
      <span className="text-base font-bold leading-none" style={{ color: STATUS_COLORS[status] }}>
        {count.toLocaleString('id-ID')}
      </span>
      <span
        className="mt-1 text-[11px] font-medium uppercase tracking-wide"
        style={{ color: STATUS_COLORS[status] }}
      >
        {status}
      </span>
    </div>
  )
}

interface Props {
  open: boolean
  onToggle: () => void
}

export default function StatistikJaringan({ open, onToggle }: Props) {
  const { stats } = useMapContext()

  return (
    <Collapsible
      title="Statistik Jaringan"
      open={open}
      onToggle={onToggle}
      icon="▥"
      iconClassName="bg-cyan-100 text-cyan-500"
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white px-3 py-3 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
            Total Panjang Jaringan
          </p>
          <p className="mt-1 text-[28px] font-bold leading-none text-slate-900">
            {stats.totalPanjangKm.toLocaleString('id-ID', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}{' '}
            <span className="text-sm font-medium text-slate-500">km</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Jumlah Manhole
            </span>
            <span className="mt-1 block text-[26px] font-bold leading-none text-slate-900">
              {stats.jumlahManhole.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Jumlah Pipa
            </span>
            <span className="mt-1 block text-[26px] font-bold leading-none text-slate-900">
              {stats.jumlahPipa.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
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
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
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
