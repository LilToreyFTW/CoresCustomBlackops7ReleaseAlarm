import type { Metadata } from 'next'
import { Orbitron, Rajdhani } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-rajdhani',
})

export const metadata: Metadata = {
  title: 'Call of Duty: Black Ops 7 - Launch Countdown',
  description: 'Countdown to Call of Duty: Black Ops 7 launch - Available November 14, 2025 at Midnight PST',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${rajdhani.variable}`}>
        {children}
      </body>
    </html>
  )
}

