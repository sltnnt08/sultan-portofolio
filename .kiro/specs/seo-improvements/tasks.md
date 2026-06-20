# Implementation Plan: SEO Improvements

## Overview

Implement comprehensive SEO support for the Next.js portfolio site by extending `app/layout.tsx`, creating `app/opengraph-image.tsx` and `app/robots.ts`, and setting up a test suite with Vitest and fast-check.

## Tasks

- [x] 1. Set up test framework
  - Install Vitest and fast-check: `pnpm add -D vitest @vitejs/plugin-react fast-check`
  - Add `vitest.config.ts` at the project root with `react` plugin and test include pattern for `__tests__/**`
  - Add `"test": "vitest --run"` script to `package.json`
  - Create empty `__tests__/seo-improvements/` directory with placeholder files
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1_

- [x] 2. Extend metadata in `app/layout.tsx`
  - [x] 2.1 Add `metadataBase`, `keywords`, `authors`, `creator`, `robots`, `alternates.canonical`, `openGraph`, and `twitter` fields to the existing `metadata` export
    - `metadataBase`: `new URL('https://sultannurulloh.tech')`
    - `alternates.canonical`: `'https://sultannurulloh.tech'`
    - `openGraph`: `{ type: 'website', url, siteName, title, description, images: [{ url: '/opengraph-image', width: 1200, height: 630 }] }`
    - `twitter`: `{ card: 'summary_large_image', title, description, images: ['/opengraph-image'] }`
    - `keywords`, `authors`, `creator`, `robots` per design data models
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 3.1, 3.2, 7.1, 7.2, 7.3, 7.4_

  - [ ]* 2.2 Write unit tests for metadata object shape in `__tests__/seo-improvements/metadata.test.ts`
    - Assert `metadataBase`, `alternates.canonical`, `openGraph.*`, `twitter.card`, `authors`, `creator`, `robots.index`, `robots.follow` match specified values
    - _Requirements: 1.1, 1.2, 2.1, 3.1, 7.2, 7.3, 7.4_

- [x] 3. Add JSON-LD structured data to `app/layout.tsx`
  - [x] 3.1 Define the `jsonLd` Person schema constant and render an inline `<script type="application/ld+json">` in the layout's `<head>` fragment using `dangerouslySetInnerHTML`
    - Schema fields: `@type: 'Person'`, `name`, `url`, `jobTitle: 'Full-Stack Developer'`, `sameAs: ['https://www.linkedin.com/in/muhammadsultannurulloh/', 'https://github.com/sltnnt08']`
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ]* 3.2 Write unit tests for JSON-LD in `__tests__/seo-improvements/metadata.test.ts`
    - Assert the `jsonLd` object has `@type: 'Person'`, correct `name`, `url`, `jobTitle`, and `sameAs` is an array with two entries
    - Render the layout with `@testing-library/react` and assert a `<script type="application/ld+json">` tag exists in the output
    - _Requirements: 4.1, 4.2, 4.3_

- [x] 4. Create `app/opengraph-image.tsx`
  - [x] 4.1 Create the file exporting `alt`, `size` (`{ width: 1200, height: 630 }`), `contentType` (`'image/png'`), and a default function returning an `ImageResponse` with a simple branded layout (name + job title)
    - _Requirements: 2.2, 2.3_

  - [ ]* 4.2 Write unit tests for OG image metadata in `__tests__/seo-improvements/metadata.test.ts`
    - Assert `size` equals `{ width: 1200, height: 630 }` and `contentType` equals `'image/png'`
    - _Requirements: 2.3_

- [x] 5. Create `app/robots.ts`
  - [x] 5.1 Create the file exporting a `robots()` function returning `{ rules: { userAgent: '*', allow: '/' }, sitemap: 'https://sultannurulloh.tech/sitemap.xml' }`
    - _Requirements: 5.1, 5.2_

  - [ ]* 5.2 Write unit tests for `robots()` in `__tests__/seo-improvements/robots.test.ts`
    - Assert `rules.userAgent === '*'`, `rules.allow === '/'`, and `sitemap` equals the expected URL
    - _Requirements: 5.1, 5.2_

- [x] 6. Checkpoint — Ensure all tests pass
  - Run `pnpm test` and confirm all unit tests pass. Ask the user if questions arise.

- [ ] 7. Write property-based tests
  - [ ]* 7.1 Write property test for OG and Twitter image consistency in `__tests__/seo-improvements/metadata.property.test.ts`
    - **Property 1: OG image and Twitter image are consistent**
    - **Validates: Requirements 3.2**
    - Use fast-check to generate arbitrary image path strings; assert `openGraph.images[0].url === twitter.images[0]` for the exported metadata
    - _Requirements: 3.2_

  - [ ]* 7.2 Write property test for required keywords membership in `__tests__/seo-improvements/metadata.property.test.ts`
    - **Property 2: Required keywords are present**
    - **Validates: Requirements 7.1**
    - Use fast-check to iterate over the required keywords set (`"full-stack developer"`, `"web development"`, `"Next.js"`, `"cloud-native"`, `"AI"`, `"portfolio"`) and assert each is contained in `metadata.keywords`
    - _Requirements: 7.1_

- [x] 8. Verify sitemap is complete
  - [x] 8.1 Write unit tests for `sitemap()` in `__tests__/seo-improvements/sitemap.test.ts`
    - Assert first entry has `url: 'https://sultannurulloh.tech'`, `priority: 1`, `changeFrequency: 'monthly'`, and `lastModified` is a `Date`
    - No code changes needed to `app/sitemap.ts` — it already satisfies Requirement 6.1
    - _Requirements: 6.1_

- [x] 9. Final checkpoint — Ensure all tests pass
  - Run `pnpm test` and confirm all tests pass. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- `app/sitemap.ts` already satisfies Requirement 6.1 — no edits required
- LinkedIn and GitHub URLs are set: `https://www.linkedin.com/in/muhammadsultannurulloh/` and `https://github.com/sltnnt08`
- Property tests use fast-check and run a minimum of 100 iterations each
