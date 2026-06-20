import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Inter, Inter_Tight } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

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
    title: "Sultan's Portfolio — Full-Stack Developer",
    description:
        'Portfolio of Muhammad Sultan Nurulloh Telaumbanua — full-stack developer specialising in web apps, cloud-native systems, and applied AI.',
}

export const viewport: Viewport = {
    colorScheme: 'dark light',
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
        { media: '(prefers-color-scheme: light)', color: '#f5f5f0' },
    ],
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${interTight.variable} ${geistMono.variable} dark`}
        >
            <body className="font-sans antialiased overflow-x-hidden" style={{ background: 'var(--color-canvas)', color: 'var(--color-ink)' }}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
