# Design Document: SEO Improvements

## Overview

This feature adds comprehensive SEO support to the Next.js 16 portfolio site at `https://sultannurulloh.tech`. The site uses the App Router, which provides first-class support for metadata via the exported `metadata` object in layout/page files, file-based conventions for `sitemap.ts`, `robots.ts`, and `opengraph-image.tsx`, and inline `<script>` injection for JSON-LD structured data.

All changes are confined to the `app/` directory. No third-party SEO libraries are required — everything is implemented through Next.js built-ins.

### Goals

- Canonical URL declared via `metadataBase` and `alternates.canonical`
- Open Graph and Twitter Card tags for rich social previews
- Dynamically generated OG image via `ImageResponse`
- JSON-LD Person schema for search engine rich results
- `/robots.txt` pointing crawlers to the sitemap
- Sitemap with correct priority and change frequency
- Full metadata completeness (keywords, authors, creator, robots)

---

## Architecture

The implementation follows the Next.js App Router's file-system conventions exclusively. There are no new dependencies, no API routes, and no client-side logic added.

```mermaid
graph TD
    A[app/layout.tsx] -->|exports metadata object| B[Next.js Metadata API]
    A -->|renders inline script| C[JSON-LD script tag in head]
    B --> D[Canonical URL / alternates]
    B --> E[Open Graph tags]
    B --> F[Twitter Card tags]
    B --> G[keywords / authors / creator / robots]
    B --> H[metadataBase]
    H --> I[app/opengraph-image.tsx]
    I -->|ImageResponse 1200x630| J[/opengraph-image route]
    E --> J
    F --> J
    K[app/robots.ts] -->|MetadataRoute.Robots| L[/robots.txt]
    M[app/sitemap.ts] -->|MetadataRoute.Sitemap| N[/sitemap.xml]
    L --> N
```

### Key Design Decisions

1. **`metadataBase` in layout** — Setting `metadataBase` to the production URL in `layout.tsx` means all relative image/URL references in the metadata object automatically resolve to absolute URLs. This is the idiomatic Next.js approach and avoids duplicating the base URL everywhere.

2. **`app/opengraph-image.tsx` file convention** — Next.js automatically wires up the `/opengraph-image` route and injects the `og:image` and `twitter:image` meta tags when this file exports an `ImageResponse`. This keeps the OG image co-located with the app and avoids a separate API route.

3. **Inline `<script>` for JSON-LD** — The Next.js `metadata` API does not support arbitrary `<script>` tags. The idiomatic approach is to render a `<script type="application/ld+json">` directly inside the layout JSX using `dangerouslySetInnerHTML`. This is safe because the content is developer-controlled, not user input. Using `next/script` with `strategy="beforeInteractive"` is an alternative but adds unnecessary complexity for a static JSON blob.

4. **No changes to `app/sitemap.ts`** — The existing sitemap already has the correct entry with `priority: 1`, `changeFrequency: "monthly"`, and `lastModified: new Date()`. Requirement 6.1 is already satisfied. Only `app/robots.ts` needs to be created.

---

## Components and Interfaces

### `app/layout.tsx` — Extended Metadata Export

The existing `metadata` export is extended in-place. No new components are created.

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://sultannurulloh.tech'),
  title: "Sultan's Portfolio — Full-Stack Developer",
  description: '...',
  keywords: ['full-stack developer', 'web development', 'Next.js', 'cloud-native', 'AI', 'portfolio'],
  authors: [{ name: 'Muhammad Sultan Nurulloh Telaumbanua', url: 'https://sultannurulloh.tech' }],
  creator: 'Muhammad Sultan Nurulloh Telaumbanua',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://sultannurulloh.tech' },
  openGraph: {
    type: 'website',
    url: 'https://sultannurulloh.tech',
    siteName: "Sultan's Portfolio",
    title: "Sultan's Portfolio — Full-Stack Developer",
    description: '...',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sultan's Portfolio — Full-Stack Developer",
    description: '...',
    images: ['/opengraph-image'],
  },
}
```

The layout's JSX `<head>` fragment gets an inline JSON-LD script:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### `app/opengraph-image.tsx` — Dynamic OG Image

Uses the Next.js `ImageResponse` API. Exports `alt`, `size`, and `contentType` alongside the default function.

```typescript
import { ImageResponse } from 'next/og'

export const alt = "Sultan's Portfolio — Full-Stack Developer"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(/* JSX */, { ...size })
}
```

### `app/robots.ts` — Robots.txt Route

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://sultannurulloh.tech/sitemap.xml',
  }
}
```

---

## Data Models

### JSON-LD Person Schema

```typescript
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
```

### OG Image Metadata Shape

| Field         | Value                          |
|---------------|--------------------------------|
| `url`         | `/opengraph-image`             |
| `width`       | 1200                           |
| `height`      | 630                            |
| `contentType` | `image/png`                    |
| `alt`         | Sultan's Portfolio — Full-Stack Developer |

### Metadata Object Shape (layout.tsx)

| Field              | Value / Source                                      |
|--------------------|-----------------------------------------------------|
| `metadataBase`     | `new URL('https://sultannurulloh.tech')`            |
| `title`            | `"Sultan's Portfolio — Full-Stack Developer"`       |
| `description`      | Existing description string                         |
| `keywords`         | `['full-stack developer', 'web development', ...]`  |
| `authors`          | `[{ name: '...', url: 'https://sultannurulloh.tech' }]` |
| `creator`          | `"Muhammad Sultan Nurulloh Telaumbanua"`            |
| `robots`           | `{ index: true, follow: true }`                     |
| `alternates`       | `{ canonical: 'https://sultannurulloh.tech' }`      |
| `openGraph.type`   | `"website"`                                         |
| `openGraph.url`    | `"https://sultannurulloh.tech"`                     |
| `openGraph.siteName` | `"Sultan's Portfolio"`                            |
| `openGraph.images` | `[{ url: '/opengraph-image', width: 1200, height: 630 }]` |
| `twitter.card`     | `"summary_large_image"`                             |
| `twitter.images`   | `['/opengraph-image']`                              |


---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Most acceptance criteria in this feature are concrete configuration assertions (specific field values on a specific exported object), so they are best validated as examples. Two criteria generalise to universal properties:

### Property 1: OG image and Twitter image are consistent

*For any* valid metadata configuration exported from the layout, the `twitter.images` array should reference the same image path as `openGraph.images[0].url`, so that social platforms and Twitter/X both render the same preview image.

**Validates: Requirements 3.2**

### Property 2: Required keywords are present

*For any* required SEO keyword from the specified set (`"full-stack developer"`, `"web development"`, `"Next.js"`, `"cloud-native"`, `"AI"`, `"portfolio"`), that keyword should appear in the exported `metadata.keywords` array.

**Validates: Requirements 7.1**

---

## Error Handling

| Scenario | Handling |
|---|---|
| `metadataBase` missing | Next.js warns at build time and relative `og:image` URLs will be broken. Mitigation: the `metadataBase` value is a hard-coded `new URL(...)` — no runtime failure path. |
| `ImageResponse` rendering error | Next.js returns a 500 for `/opengraph-image`. The rest of the page is unaffected. Mitigation: the OG image JSX is static and contains no async data fetching. |
| Invalid JSON-LD | Search engines silently ignore malformed structured data. Mitigation: the JSON-LD object is a static literal; `JSON.stringify` is deterministic. |
| `robots()` or `sitemap()` throw | Next.js returns a 500 for `/robots.txt` or `/sitemap.xml`. Mitigation: both functions return static literals with no I/O. |
| Placeholder `sameAs` URLs left unfilled | Search engines will follow broken links in `sameAs` without crawl errors. Owner should replace placeholders before deploying. This is documented as a TODO in the code. |

---

## Testing Strategy

### Dual Testing Approach

Unit tests cover specific examples and concrete field assertions. Property-based tests cover the two universal properties identified above.

### Unit Tests (examples and edge cases)

All tests import the exported values directly — no HTTP requests, no browser rendering needed for the metadata/robots/sitemap checks.

- **Metadata object shape**: assert `metadataBase`, `alternates.canonical`, `openGraph.*`, `twitter.card`, `authors`, `creator`, `robots.index`, `robots.follow` all match specified values (covers Requirements 1.1, 1.2, 2.1, 2.2, 3.1, 7.2, 7.3, 7.4)
- **OG image metadata**: assert `size` is `{ width: 1200, height: 630 }` and `contentType` is `"image/png"` (covers Requirement 2.3)
- **JSON-LD structure**: assert the JSON-LD object has `@type: "Person"`, correct `name`, `url`, `jobTitle`, and that `sameAs` is an array with two entries (covers Requirements 4.1, 4.2)
- **JSON-LD in head**: render the layout and assert a `<script type="application/ld+json">` exists (covers Requirement 4.3)
- **robots()**: assert `rules.userAgent === '*'`, `rules.allow === '/'`, and `sitemap` equals the expected URL (covers Requirements 5.1, 5.2)
- **sitemap()**: assert the first entry has `url`, `priority: 1`, `changeFrequency: "monthly"`, and `lastModified` is a Date within the current day (covers Requirement 6.1)

### Property-Based Tests

Use a property-based testing library appropriate for the TypeScript ecosystem. **[fast-check](https://github.com/dubzzz/fast-check)** is the standard choice for TypeScript/JavaScript projects.

Each property test runs a minimum of **100 iterations**.

**Property 1 test** — OG and Twitter image consistency  
Tag: `Feature: seo-improvements, Property 1: OG image and Twitter image are consistent`  
Generate arbitrary metadata-like objects with varying image path strings and assert that if `openGraph.images[0].url === x` then `twitter.images[0] === x`. In practice, since the layout exports a static object, this collapses to a single deterministic check — but the property framing ensures any future refactor that decouples the two values will be caught.

**Property 2 test** — Required keywords membership  
Tag: `Feature: seo-improvements, Property 2: Required keywords are present`  
For each string in the required keywords set, assert it is contained in `metadata.keywords`. fast-check can generate the required keywords as an arbitrary subset and verify membership.

### Test File Location

```
__tests__/
  seo-improvements/
    metadata.test.ts      # unit tests for metadata object, OG image, JSON-LD
    robots.test.ts        # unit tests for robots()
    sitemap.test.ts       # unit tests for sitemap()
    metadata.property.test.ts  # property-based tests (Properties 1 & 2)
```

No test framework is currently configured in the project. The recommended setup is **Vitest** (idiomatic for Next.js + TypeScript projects, fast, zero-config) with **fast-check** for property tests.

Install:
```
pnpm add -D vitest @vitejs/plugin-react fast-check
```
