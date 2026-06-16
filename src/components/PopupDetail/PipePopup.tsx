import type { ReactNode } from 'react'
import type { Pipa } from '@/types'
import StatusBadge from './StatusBadge'

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="text-[15px] font-semibold leading-tight text-slate-700">
        {value}
      </span>
    </div>
  )
}

export default function PipePopup({ pipa }: { pipa: Pipa }) {
  const [firstPoint] = pipa.koordinat
  const koordinat = firstPoint
    ? `${firstPoint[0].toFixed(6)}, ${firstPoint[1].toFixed(6)}`
    : '—'
  const fungsiDisplay =
    pipa.fungsi === 'Pipa Utama'
      ? 'Induk'
      : pipa.fungsi === 'Pipa Lateral'
        ? 'Lateral'
        : 'Glontor'

  return (
    <div className="p-3.5 font-sans">
      <div className="mb-3 flex items-start justify-between gap-3 border-b border-slate-100 pb-2.5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Kode Pipa
          </p>
          <h3 className="mt-1 text-[22px] font-bold leading-none text-slate-800">
            {pipa.id}
          </h3>
        </div>
        <StatusBadge status={pipa.status} />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        <Field label="Fungsi" value={fungsiDisplay} />
        <Field label="Diameter" value={`${pipa.diameter_mm} mm`} />
        <Field
          label="Panjang"
          value={`${(pipa.panjang_m / 1000).toFixed(3)} km`}
        />
        <Field label="Koordinat" value={koordinat} />
        <Field label="Wilayah" value="—" />
      </div>

       <div className="mt-3.5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
          Jumlah Aduan Masuk
        </span>
        <p className="mt-0.5 text-[16px] font-bold text-slate-700">0 Aduan</p>
      </div>

      <button className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-100 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-200">
        <span>Lapor Masalah</span>
      </button>
    </div>
  )
}
