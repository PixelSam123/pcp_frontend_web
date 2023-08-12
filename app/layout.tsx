import './globals.css'
import type { Metadata } from 'next'
import { JetBrains_Mono as JetbrainsMono } from 'next/font/google'
import Link from 'next/link'
import ProfileButton from './components/ProfileButton'

const jetbrainsMono = JetbrainsMono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'pcp',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.className} min-h-full bg-[#1e1e1e] text-white`}
      >
        <nav className="bg[#1e1e2e] sticky top-0 flex">
          <Link
            href="/"
            className="bg-white font-bold text-black hover:bg-sky-400"
          >
            pcp
          </Link>
          <Link href="/create" className="underline hover:text-sky-400">
            Creator Panel
          </Link>
          <ProfileButton />
        </nav>
        {children}
      </body>
    </html>
  )
}
