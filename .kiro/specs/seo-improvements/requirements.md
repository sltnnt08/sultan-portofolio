# Requirements Document

## Introduction

This feature improves the search engine optimisation (SEO) of Muhammad Sultan Nurulloh Telaumbanua's Next.js 16 portfolio site (https://sultannurulloh.tech). The site is a single-page app built with the App Router. Currently it has only a basic title/description metadata, a minimal sitemap, and no Open Graph tags, Twitter cards, structured data, robots.txt, or canonical URLs. The goal is to make the site fully discoverable by search engines and shareable on social platforms.

## Glossary

- **Layout**: `app/layout.tsx` — the root Next.js layout that exports `metadata` and `viewport` config.
- **Sitemap**: `app/sitemap.ts` — the Next.js route that generates `/sitemap.xml`.
- **Robots**: `app/robots.ts` — the Next.js route that generates `/robots.txt`.
- **Open_Graph**: The Open Graph protocol meta tags (`og:*`) used by social platforms to render link previews.
- **Twitter_Card**: Twitter/X-specific meta tags (`twitter:*`) used to render card previews when a URL is shared.
- **JSON_LD**: JSON-based structured data embedded in a `<script type="application/ld+json">` tag, consumed by search engines.
- **Canonical_URL**: The `<link rel="canonical">` tag that tells search engines the preferred URL for a page.
- **OG_Image**: A dynamically generated image (1200×630 px) created via Next.js `ImageResponse` at `app/opengraph-image.tsx`, served at `/opengraph-image` and referenced by Open Graph and Twitter Card tags.

---

## Requirements

### Requirement 1: Canonical URL

**User Story:** As a site owner, I want a canonical URL declared on every page, so that search engines index the correct URL and avoid duplicate-content penalties.

#### Acceptance Criteria

1. THE Layout SHALL export a `metadataBase` value set to `https://sultannurulloh.tech`.
2. THE Layout SHALL include a `canonical` alternate link pointing to `https://sultannurulloh.tech`.

---

### Requirement 2: Open Graph Metadata

**User Story:** As a site owner, I want Open Graph tags on every page, so that link previews on social platforms (Facebook, LinkedIn, etc.) display a title, description, and image.

#### Acceptance Criteria

1. THE Layout SHALL export `openGraph` metadata containing: `type` set to `"website"`, `url` set to `https://sultannurulloh.tech`, `siteName` set to `"Sultan's Portfolio"`, `title` set to `"Sultan's Portfolio — Full-Stack Developer"`, and `description` matching the existing site description.
2. THE Layout SHALL reference an OG_Image in the `openGraph.images` array with a width of 1200 px and height of 630 px.
3. THE OG_Image SHALL be dynamically generated using Next.js `ImageResponse` in `app/opengraph-image.tsx` so that Next.js serves it at `https://sultannurulloh.tech/opengraph-image`.

---

### Requirement 3: Twitter Card Metadata

**User Story:** As a site owner, I want Twitter Card tags on every page, so that shared links on Twitter/X render a large image card with the correct title and description.

#### Acceptance Criteria

1. THE Layout SHALL export `twitter` metadata with `card` set to `"summary_large_image"`, `title` matching the Open Graph title, and `description` matching the existing site description.
2. THE Layout SHALL include a `twitter.images` entry referencing the same OG_Image used by Open Graph.

---

### Requirement 4: Structured Data (JSON-LD)

**User Story:** As a site owner, I want structured data embedded in the page, so that search engines display rich results (e.g. sitelinks, person card) for the portfolio.

#### Acceptance Criteria

1. THE Layout SHALL render a `<script type="application/ld+json">` tag in the `<head>` containing a valid `Person` schema from schema.org.
2. THE Person schema SHALL include: `name` set to `"Muhammad Sultan Nurulloh Telaumbanua"`, `url` set to `https://sultannurulloh.tech`, `jobTitle` set to `"Full-Stack Developer"`, and `sameAs` containing the owner's LinkedIn and GitHub profile URLs.
3. WHEN the page is rendered, THE Layout SHALL place the JSON-LD `<script>` tag inside `<head>` using Next.js's `Script` component with `strategy="beforeInteractive"` or an inline `<script>` in the layout's `<head>` fragment.

---

### Requirement 5: Robots.txt

**User Story:** As a site owner, I want a `/robots.txt` file served by the site, so that crawlers know which paths to index and can locate the sitemap.

#### Acceptance Criteria

1. THE Robots SHALL allow all user agents to crawl all paths.
2. THE Robots SHALL include a `Sitemap` directive pointing to `https://sultannurulloh.tech/sitemap.xml`.

---

### Requirement 6: Sitemap Completeness

**User Story:** As a site owner, I want the sitemap to accurately reflect the site's content and crawl priority, so that search engines allocate crawl budget effectively.

#### Acceptance Criteria

1. THE Sitemap SHALL include an entry for `https://sultannurulloh.tech` with `priority` 1.0, `changeFrequency` `"monthly"`, and `lastModified` set to the current date.
2. WHEN new public routes are added to the site, THE Sitemap SHALL include a corresponding entry for each route.

---

### Requirement 7: Metadata Completeness and Accuracy

**User Story:** As a site owner, I want all metadata fields to be accurate and complete, so that search engine result pages display a correct and compelling listing.

#### Acceptance Criteria

1. THE Layout SHALL export a `keywords` array containing relevant terms such as `"full-stack developer"`, `"web development"`, `"Next.js"`, `"cloud-native"`, `"AI"`, and `"portfolio"`.
2. THE Layout SHALL export an `authors` array containing `{ name: "Muhammad Sultan Nurulloh Telaumbanua", url: "https://sultannurulloh.tech" }`.
3. THE Layout SHALL export a `creator` field set to `"Muhammad Sultan Nurulloh Telaumbanua"`.
4. THE Layout SHALL export a `robots` metadata object with `index` set to `true` and `follow` set to `true`.
