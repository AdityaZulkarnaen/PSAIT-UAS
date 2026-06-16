import { STATUS_COLORS, type StatusAset } from '@/types'

/** Badge status berwarna yang dipakai di header popup manhole & pipa. */
export default function StatusBadge({ status }: { status: StatusAset }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white"
      style={{ backgroundColor: STATUS_COLORS[status] }}
    >
      {status}
    </span>
  )
}
