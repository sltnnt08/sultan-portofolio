// Re-export testable values from app/layout.tsx
// We duplicate the data here to avoid pulling in Next.js font/runtime modules
// that aren't available in the Vitest (Node) environment.

import type { Metadata } from 'next'

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

export const jsonLd = {
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
