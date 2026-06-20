import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Inter, Inter_Tight } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
    metadataBase: new URL('https://sultannurulloh.tech'),
    title: "Sultan's Portfolio — Full-Stack Developer",
    description:
        'Portfolio of Muhammad Sultan Nurulloh Telaumbanua — full-stack developer specialising in web apps, cloud-native systems, and applied AI.',
    keywords: ['full-stack developer', 'web development', 'Next.js', 'cloud-native', 'AI', 'portfolio'],
    authors: [{ name: 'Muhammad Sultan Nurulloh Telaumbanua', url: 'https://sultannurulloh.tech' }],
    creator: 'Muhammad Sultan Nurulloh Telaumbanua',
    robots: { index: true, follow: true },
    alternates: {
        canonical: 'https://sultannurulloh.tech',
    },
    openGraph: {
        type: 'website',
        url: 'https://sultannurulloh.tech',
        siteName: "Sultan's Portfolio",
        title: "Sultan's Portfolio — Full-Stack Developer",
        description:
            'Portfolio of Muhammad Sultan Nurulloh Telaumbanua — full-stack developer specialising in web apps, cloud-native systems, and applied AI.',
        images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Sultan's Portfolio — Full-Stack Developer",
        description:
            'Portfolio of Muhammad Sultan Nurulloh Telaumbanua — full-stack developer specialising in web apps, cloud-native systems, and applied AI.',
        images: ['/opengraph-image'],
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Muhammad Sultan Nurulloh Telaumbanua',
    url: 'https://sultannurulloh.tech',
    jobTitle: 'Full-Stack Developer',
    sameAs: [
        'https://www.linkedin.com/in/muhammadsultannurulloh/',
        'https://github.com/sltnnt08',
    ],
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
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="font-sans antialiased overflow-x-hidden" style={{ background: 'var(--color-canvas)', color: 'var(--color-ink)' }}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}
