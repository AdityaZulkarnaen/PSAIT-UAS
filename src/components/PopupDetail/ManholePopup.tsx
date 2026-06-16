import type { Manhole } from '@/types'
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

export default function ManholePopup({ manhole }: { manhole: Manhole }) {
  const lapor = () =>
    window.alert(`Laporan untuk manhole ${manhole.kode} telah dikirim`)

  return (
    <div className="p-3.5 font-sans">
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
        <h3 className="text-base font-bold text-slate-800">{manhole.kode}</h3>
        <StatusBadge status={manhole.status} />
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
        <Field label="Kondisi" value={manhole.kondisi} />
        <Field label="Klasifikasi" value={manhole.klasifikasi} />
        <Field label="Desa" value={manhole.desa} />
        <Field label="Kecamatan" value={manhole.kecamatan} />
      </div>

      <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2">
        <span className="text-[10px] uppercase tracking-wide text-slate-400">
          Jumlah Aduan Masuk
        </span>
        <p className="text-lg font-bold text-slate-800">
          {manhole.jumlah_aduan}{' '}
          <span className="text-xs font-normal text-slate-500">aduan</span>
        </p>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-slate-100 py-1.5">
          <p className="text-[10px] text-slate-400">Kedalaman</p>
          <p className="text-sm font-semibold text-slate-700">
            {manhole.kedalaman_cm} cm
          </p>
        </div>
        <div className="rounded-lg border border-slate-100 py-1.5">
          <p className="text-[10px] text-slate-400">Diameter</p>
          <p className="text-sm font-semibold text-slate-700">
            {manhole.diameter_cm} cm
          </p>
        </div>
        <div className="rounded-lg border border-slate-100 py-1.5">
          <p className="text-[10px] text-slate-400">Th. Pasang</p>
          <p className="text-sm font-semibold text-slate-700">
            {manhole.tahun_pasang}
          </p>
        </div>
      </div>

      <button
        onClick={lapor}
        className="mt-3.5 w-full rounded-lg bg-red-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
      >
        ⚠ Lapor Masalah
      </button>
    </div>
  )
}
