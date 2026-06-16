'use client'

interface Props {
  onZoomIn: () => void
  onZoomOut: () => void
  onLocate: () => void
  onToggleLayers: () => void
  layersVisible: boolean
}

function ControlButton({
  label,
  title,
  onClick,
  active,
}: {
  label: string
  title: string
  onClick: () => void
  active?: boolean
}) {
  return (
    <button
      title={title}
      aria-label={title}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg shadow-md transition-colors hover:bg-slate-100 ${
        active === false ? 'text-slate-300' : 'text-slate-700'
      }`}
    >
      {label}
    </button>
  )
}

export default function MapControls({
  onZoomIn,
  onZoomOut,
  onLocate,
  onToggleLayers,
  layersVisible,
}: Props) {
  return (
    <div className="absolute bottom-10 right-4 z-[500] flex flex-col gap-2">
      <ControlButton label="＋" title="Perbesar" onClick={onZoomIn} />
      <ControlButton label="－" title="Perkecil" onClick={onZoomOut} />
      <ControlButton label="◎" title="Lokasi saya" onClick={onLocate} />
      {/* <ControlButton
        label="▦"
        title={layersVisible ? 'Sembunyikan layer' : 'Tampilkan layer'}
        onClick={onToggleLayers}
        active={layersVisible}
      /> */}
    </div>
  )
}
