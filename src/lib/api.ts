import type { FungsiPipa, Manhole, Pipa, StatusAset } from '@/types'

/**
 * Klien untuk IPAL Public API (read-only) — data manhole & jaringan pipa
 * jaringan IPAL Kota Yogyakarta.
 *
 * Dok: https://psait-x-pad.onrender.com/docs
 *
 * Base URL bisa di-override lewat env `NEXT_PUBLIC_API_BASE_URL`.
 */
const BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://psait-x-pad.onrender.com'
).replace(/\/$/, '')

/** API memakai status lowercase; UI memakai bentuk berhuruf kapital. */
const STATUS_MAP: Record<string, StatusAset> = {
  baik: 'Baik',
  perbaikan: 'Perbaikan',
  rusak: 'Rusak',
}

/** API memakai label singkat; internal aplikasi memakai label panjang. */
const FUNGSI_MAP: Record<string, FungsiPipa> = {
  Lateral: 'Pipa Lateral',
  Induk: 'Pipa Utama',
  Glontor: 'Pipa Servis',
}

function mapStatus(status: string | null | undefined): StatusAset {
  return STATUS_MAP[(status ?? '').toLowerCase()] ?? 'Baik'
}

// --- Bentuk respons mentah dari API ----------------------------------------

interface RawManhole {
  id: number
  kode_manhole: string
  kondisi_mh: string
  klasifikasi: string
  status: string
  desa: string
  kecamatan: string
  wilayah: string
  longitude: number
  latitude: number
  sektor: number
  aduan_count: number
}

interface RawPipe {
  id: number
  id_jalur: string
  kode_pipa: string
  pipe_dia: number
  fungsi: string
  length_km: number
  tahun: number
  status: string
  aduan_count: number
  geometry: { type: string; coordinates: number[][][] } | null
}

interface Paginated<T> {
  current_page: number
  data: T[]
  last_page: number
}

interface ApiEnvelope<T> {
  success: boolean
  data: T
}

// --- Pengambilan data -------------------------------------------------------

async function fetchPage<T>(
  path: string,
  page: number,
  perPage: number,
): Promise<Paginated<T>> {
  const res = await fetch(`${BASE_URL}${path}?page=${page}&per_page=${perPage}`)
  if (!res.ok) {
    throw new Error(`Gagal memuat data (HTTP ${res.status}) dari ${path}`)
  }
  const json: ApiEnvelope<Paginated<T>> = await res.json()
  return json.data
}

/**
 * Ambil seluruh data dari endpoint berpaginasi. Halaman pertama diambil
 * untuk mengetahui `last_page`, sisanya diambil paralel.
 */
async function fetchAll<T>(path: string, perPage = 500): Promise<T[]> {
  const first = await fetchPage<T>(path, 1, perPage)
  const items = [...first.data]

  if (first.last_page > 1) {
    const rest = await Promise.all(
      Array.from({ length: first.last_page - 1 }, (_, i) =>
        fetchPage<T>(path, i + 2, perPage),
      ),
    )
    for (const page of rest) items.push(...page.data)
  }

  return items
}

// --- Mapping ke tipe internal aplikasi -------------------------------------

function mapManhole(m: RawManhole): Manhole {
  return {
    // Leaflet memakai urutan [lat, lng].
    id: String(m.id),
    kode: m.kode_manhole,
    koordinat: [m.latitude, m.longitude],
    kondisi: m.kondisi_mh,
    status: mapStatus(m.status),
    klasifikasi: m.klasifikasi,
    desa: m.desa,
    kecamatan: m.kecamatan,
    jumlah_aduan: m.aduan_count ?? 0,
    sektor: m.sektor,
    wilayah: m.wilayah,
  }
}

function mapPipe(p: RawPipe): Pipa {
  // Geometry API: MultiLineString [lng, lat]; Leaflet butuh [lat, lng].
  const koordinat = (p.geometry?.coordinates ?? []).map((line) =>
    line.map(([lng, lat]) => [lat, lng] as [number, number]),
  )

  return {
    id: p.kode_pipa,
    koordinat,
    status: mapStatus(p.status),
    fungsi: FUNGSI_MAP[p.fungsi] ?? 'Pipa Lateral',
    diameter_mm: p.pipe_dia,
    panjang_m: p.length_km * 1000,
    tahun_pasang: p.tahun,
    id_jalur: p.id_jalur,
    jumlah_aduan: p.aduan_count ?? 0,
  }
}

export async function fetchManholes(): Promise<Manhole[]> {
  const raw = await fetchAll<RawManhole>('/api/ipal/manholes')
  return raw.map(mapManhole)
}

export async function fetchPipes(): Promise<Pipa[]> {
  const raw = await fetchAll<RawPipe>('/api/ipal/pipes')
  return raw.map(mapPipe)
}
