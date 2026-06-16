'use client'

import { useState, type ReactNode } from 'react'

interface Props {
  title: string
  defaultOpen?: boolean
  open?: boolean
  onToggle?: () => void
  children: ReactNode
  icon?: ReactNode
  iconClassName?: string
}

/** Section collapsible dengan animasi tinggi (grid-rows trick) + ikon chevron. */
export default function Collapsible({
  title,
  defaultOpen = true,
  open,
  onToggle,
  children,
  icon,
  iconClassName = 'bg-cyan-100 text-cyan-500',
}: Props) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = open ?? internalOpen
  const handleToggle = onToggle ?? (() => setInternalOpen((value) => !value))

  return (
    <section className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
      <button
        onClick={handleToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="flex min-w-0 items-center gap-3">
          {icon ? (
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold ${iconClassName}`}
            >
              {icon}
            </span>
          ) : null}
          <span className="text-sm font-bold text-slate-800">{title}</span>
        </span>
        <span
          className={`text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▾
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-0">{children}</div>
        </div>
      </div>
    </section>
  )
}
