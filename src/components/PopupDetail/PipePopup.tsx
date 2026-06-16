import type { Pipa } from '@/types'
import StatusBadge from './StatusBadge'

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-700">{value}</span>
    </div>
  )
}

export default function PipePopup({ pipa }: { pipa: Pipa }) {
  return (
    <div className="p-3.5 font-sans">
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
        <h3 className="text-base font-bold text-slate-800">Pipa {pipa.id}</h3>
        <StatusBadge status={pipa.status} />
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
        <Field label="Fungsi" value={pipa.fungsi} />
        <Field label="Material" value={pipa.material} />
        <Field label="Diameter" value={`${pipa.diameter_mm} mm`} />
        <Field label="Panjang" value={`${pipa.panjang_m} m`} />
        <Field label="Desa" value={pipa.desa} />
        <Field label="Kecamatan" value={pipa.kecamatan} />
        <Field label="Tahun Pasang" value={pipa.tahun_pasang} />
      </div>
    </div>
  )
}
