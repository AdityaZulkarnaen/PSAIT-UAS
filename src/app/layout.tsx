import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MapView Jaringan Air Limbah | BPALPJK DIY',
  description:
    'Sistem informasi geografis pemetaan jaringan air limbah — Balai Pengelolaan Air Limbah dan Pengembangan Jasa Konstruksi DIY.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  )
}
