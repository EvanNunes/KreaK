import type { Metadata } from 'next'
import './globals.scss'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'KreaK — Créations artistiques',
  description: 'Tasses, t-shirts et objets du quotidien illustrés à la main par Léa.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
