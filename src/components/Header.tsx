'use client'

import Image from 'next/image'
import logo from '../../public/images/Yogyakarta_Logo1.png'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-1100 border-b border-slate-200 bg-white px-3 py-2 sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-8 rounded-full"
          />
          <h1 className="max-w-55 text-sm font-bold leading-tight text-slate-800 sm:max-w-md">
            Balai Pengelolaan Air Limbah dan Pengembangan Jasa Konstruksi
          </h1>
        </div>

        <nav className="flex items-center gap-2.5 sm:gap-4">
          <a
            href="#"
            className="hidden text-sm font-medium text-red-600 underline underline-offset-4 sm:inline"
          >
            Beranda
          </a>
          <a
            href="#"
            className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 sm:inline"
          >
            Lapor Masalah
          </a>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Admin Login
          </button>
        </nav>
      </div>
    </header>
  )
}
