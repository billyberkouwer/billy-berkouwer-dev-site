"use client"

import '@/styles/global.scss';
import { Mondwest } from './font/font';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={Mondwest.className}>
      <body>
        {children}
      </body>
    </html>
  )
}
