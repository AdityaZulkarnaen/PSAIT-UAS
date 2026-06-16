import type { ReactNode } from 'react'
import type { Manhole } from '@/types'
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

export default function ManholePopup({ manhole }: { manhole: Manhole }) {
  const lapor = () =>
    window.alert(`Laporan untuk manhole ${manhole.kode} telah dikirim`)

  return (
    <div className="p-4 font-sans">
      <div className="mb-3.5 flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex flex-col">
          <p className="text-[11px] font-bold uppercase text-slate-400 mt-[0px]">
            Kode Manhole
          </p>
          <h3 className="mt-1 text-[20px] font-bold leading-none text-slate-800">
            {manhole.kode}
          </h3>
        </div>
        <StatusBadge status={manhole.status} />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <Field label="Kondisi" value={manhole.kondisi} />
        <Field label="Klasifikasi" value={manhole.klasifikasi} />
        <Field label="Desa" value={manhole.desa} />
        <Field label="Kecamatan" value={manhole.kecamatan} />
      </div>

      <div className="mt-3.5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
          Jumlah Aduan Masuk
        </span>
        <p className="mt-0.5 text-[16px] font-bold text-slate-700">
          {manhole.jumlah_aduan}{' '}
          <span className="">Aduan</span>
        </p>
      </div>

      

      <button
        onClick={lapor}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-100 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-200"
      >
        <span>Lapor Masalah</span>
      </button>
    </div>
  )
}
