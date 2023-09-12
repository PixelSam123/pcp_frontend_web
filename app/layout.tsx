import type { Metadata } from 'next'
import { JetBrains_Mono as JetbrainsMono } from 'next/font/google'
import Link from 'next/link'
import ProfileButton from './components/ProfileButton'
import './globals.css'

const jetbrainsMono = JetbrainsMono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'pcp',
  description: 'Pixel Code Platform - coding challenges',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.className} min-h-full bg-[#1e1e1e] px-3 text-white`}
      >
        <nav className="sticky top-0 z-10 flex justify-between bg-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="the-btn flex items-center self-stretch font-bold"
            >
              pcp
            </Link>
            <Link href="/create" className="underline hover:text-sky-400">
              Creator Panel
            </Link>
          </div>

          <ProfileButton />
        </nav>

        <div className="h-3" />
        {children}
      </body>
    </html>
  )
}
