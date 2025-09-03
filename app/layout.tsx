import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sprint Story Points Calculator',
  description: 'Calculate story points for your sprint based on team capacity, leaves, and holidays',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
