export type StatusAset = 'Baik' | 'Perbaikan' | 'Rusak'
export type FungsiPipa = 'Pipa Servis' | 'Pipa Lateral' | 'Pipa Utama'

export interface Manhole {
  id: string
  kode: string
  /** [lat, lng] sesuai urutan Leaflet. */
  koordinat: [number, number]
  kondisi: string
  status: StatusAset
  klasifikasi: string
  desa: string
  kecamatan: string
  jumlah_aduan: number
  sektor?: number
  wilayah?: string
}

export interface Pipa {
  id: string
  /** MultiLineString: array garis berisi titik [lat, lng]. */
  koordinat: [number, number][][]
  status: StatusAset
  fungsi: FungsiPipa
  diameter_mm: number
  panjang_m: number
  tahun_pasang: number
  id_jalur?: string
  jumlah_aduan?: number
}

export interface FilterState {
  status: StatusAset[]
  fungsiPipa: FungsiPipa | 'Semua Fungsi Pipa'
}

/** Warna konsisten per status aset, dipakai layer, legenda, badge & statistik. */
export const STATUS_COLORS: Record<StatusAset, string> = {
  Baik: '#22c55e',
  Perbaikan: '#f59e0b',
  Rusak: '#ef4444',
}

export const ALL_STATUS: StatusAset[] = ['Baik', 'Perbaikan', 'Rusak']
