import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next-FWSH',
  description: 'Format with syntax highlighter in Your Next.js TS app',
  viewport:'width=device-width, initial-scale=1.0'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
       
      </head>
      <body className={`${inter.className} bg-gray-950 flex w-full h-full`}
      >{children}
      </body>
    </html>
  )
}
