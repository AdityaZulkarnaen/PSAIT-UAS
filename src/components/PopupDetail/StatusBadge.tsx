import { STATUS_COLORS, type StatusAset } from '@/types'

/** Badge status berwarna yang dipakai di header popup manhole & pipa. */
export default function StatusBadge({ status }: { status: StatusAset }) {
  return (
    <span
      className="rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide"
      style={{
        color: STATUS_COLORS[status],
        borderColor: `${STATUS_COLORS[status]}35`,
        backgroundColor: `${STATUS_COLORS[status]}10`,
      }}
    >
      {status}
    </span>
  )
}
