import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Poppins } from 'next/font/google'
import './globals.css'

const playfair  = Playfair_Display({ subsets: ['latin'], weight: ['400','500','600','700'], style: ['normal','italic'], variable: '--font-playfair',  display: 'swap' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','500','600'], style: ['normal','italic'], variable: '--font-cormorant', display: 'swap' })
const poppins   = Poppins({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-poppins', display: 'swap' })

export const metadata: Metadata = {
  title: 'Isuru & Sandali — Wedding Invitation',
  description: 'Join us as we celebrate the union of Isuru and Sandali on September 12, 2026 in Napa Valley, California.',
  keywords: ['wedding', 'invitation', 'Isuru', 'Sandali'],
  openGraph: {
    title: 'Isuru & Sandali — Wedding Invitation',
    description: 'You are cordially invited to our special day.',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  )
}
