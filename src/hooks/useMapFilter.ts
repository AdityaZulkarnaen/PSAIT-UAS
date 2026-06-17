'use client'

import { useEffect, useMemo, useState } from 'react'
import { fetchManholes, fetchPipes } from '@/lib/api'
import {
  ALL_STATUS,
  type FilterState,
  type FungsiPipa,
  type Manhole,
  type Pipa,
  type StatusAset,
} from '@/types'

export interface NetworkStats {
  totalPanjangKm: number
  jumlahManhole: number
  jumlahPipa: number
  manholeByStatus: Record<StatusAset, number>
  pipaByStatus: Record<StatusAset, number>
}

function countByStatus<T extends { status: StatusAset }>(
  items: T[],
): Record<StatusAset, number> {
  return items.reduce(
    (acc, item) => {
      acc[item.status] += 1
      return acc
    },
    { Baik: 0, Perbaikan: 0, Rusak: 0 } as Record<StatusAset, number>,
  )
}

/**
 * Mengelola state filter jaringan dan menyediakan dataset yang sudah difilter
 * secara reaktif. Statistik dihitung dari keseluruhan jaringan (bukan hasil filter).
 */
export function useMapFilter() {
  const [manholes, setManholes] = useState<Manhole[]>([])
  const [pipes, setPipes] = useState<Pipa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filter, setFilter] = useState<FilterState>({
    status: [...ALL_STATUS],
    fungsiPipa: 'Semua Fungsi Pipa',
  })

  useEffect(() => {
    let cancelled = false

    Promise.all([fetchManholes(), fetchPipes()])
      .then(([mh, pp]) => {
        if (cancelled) return
        setManholes(mh)
        setPipes(pp)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(
          err instanceof Error ? err.message : 'Gagal memuat data jaringan.',
        )
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const toggleStatus = (status: StatusAset) =>
    setFilter((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }))

  const setFungsiPipa = (fungsiPipa: FilterState['fungsiPipa']) =>
    setFilter((prev) => ({ ...prev, fungsiPipa }))

  const filteredManholes = useMemo(
    () => manholes.filter((m) => filter.status.includes(m.status)),
    [manholes, filter.status],
  )

  const filteredPipes = useMemo(
    () =>
      pipes.filter(
        (p) =>
          filter.status.includes(p.status) &&
          (filter.fungsiPipa === 'Semua Fungsi Pipa' ||
            p.fungsi === (filter.fungsiPipa as FungsiPipa)),
      ),
    [pipes, filter.status, filter.fungsiPipa],
  )

  const stats = useMemo<NetworkStats>(
    () => ({
      totalPanjangKm: pipes.reduce((sum, p) => sum + p.panjang_m, 0) / 1000,
      jumlahManhole: manholes.length,
      jumlahPipa: pipes.length,
      manholeByStatus: countByStatus(manholes),
      pipaByStatus: countByStatus(pipes),
    }),
    [manholes, pipes],
  )

  return {
    filter,
    toggleStatus,
    setFungsiPipa,
    filteredManholes,
    filteredPipes,
    stats,
    loading,
    error,
  }
}
