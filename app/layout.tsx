import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Inter, Inter_Tight } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Dev's Portfolio — Full-Stack 3D Developer",
  description:
    'A 3D interactive portfolio showcasing full-stack web development, 3D experiences, and engineering craftsmanship.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${geistMono.variable} bg-[#000000]`}
    >
      <body className="font-sans antialiased bg-[#000000] text-[#fcfdff] overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
