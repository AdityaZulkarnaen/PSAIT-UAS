export type StatusAset = 'Baik' | 'Perbaikan' | 'Rusak'
export type KondisiManhole = 'Lancar' | 'Tersumbat' | 'Rusak'
export type KlasifikasiRisiko = 'Risiko Rendah' | 'Risiko Sedang' | 'Risiko Tinggi'
export type FungsiPipa = 'Pipa Servis' | 'Pipa Lateral' | 'Pipa Utama'
export type MaterialPipa = 'PVC' | 'GRP' | 'Beton'

export interface Manhole {
  id: string
  kode: string
  koordinat: [number, number]
  kondisi: KondisiManhole
  status: StatusAset
  klasifikasi: KlasifikasiRisiko
  desa: string
  kecamatan: string
  jumlah_aduan: number
  kedalaman_cm: number
  diameter_cm: number
  tahun_pasang: number
}

export interface Pipa {
  id: string
  koordinat: [number, number][]
  status: StatusAset
  fungsi: FungsiPipa
  material: MaterialPipa
  diameter_mm: number
  panjang_m: number
  tahun_pasang: number
  desa: string
  kecamatan: string
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
