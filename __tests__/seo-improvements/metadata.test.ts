import { describe, it, expect } from 'vitest'
import { metadata, jsonLd } from './helpers'

describe('metadata object shape', () => {
  it('has metadataBase pointing to the production domain', () => {
    expect(metadata.metadataBase?.toString()).toBe('https://sultannurulloh.tech/')
  })

  it('has canonical URL', () => {
    expect((metadata.alternates as { canonical?: string })?.canonical).toBe('https://sultannurulloh.tech')
  })

  it('has openGraph type website', () => {
    const og = metadata.openGraph as Record<string, unknown>
    expect(og?.type).toBe('website')
  })

  it('has openGraph images with correct dimensions', () => {
    const og = metadata.openGraph as Record<string, unknown>
    const images = og?.images as Array<{ url: string; width: number; height: number }>
    expect(images[0].url).toBe('/opengraph-image')
    expect(images[0].width).toBe(1200)
    expect(images[0].height).toBe(630)
  })

  it('has twitter card summary_large_image', () => {
    expect(metadata.twitter?.card).toBe('summary_large_image')
  })

  it('has authors array with expected name', () => {
    const authors = metadata.authors as Array<{ name: string; url: string }>
    expect(Array.isArray(authors)).toBe(true)
    expect(authors[0].name).toBe('Muhammad Sultan Nurulloh Telaumbanua')
  })

  it('has creator field', () => {
    expect(metadata.creator).toBe('Muhammad Sultan Nurulloh Telaumbanua')
  })

  it('has robots index and follow set to true', () => {
    const robots = metadata.robots as { index: boolean; follow: boolean }
    expect(robots.index).toBe(true)
    expect(robots.follow).toBe(true)
  })
})

describe('jsonLd Person schema', () => {
  it('has @type Person', () => {
    expect(jsonLd['@type']).toBe('Person')
  })

  it('has correct name', () => {
    expect(jsonLd.name).toBe('Muhammad Sultan Nurulloh Telaumbanua')
  })

  it('has correct url', () => {
    expect(jsonLd.url).toBe('https://sultannurulloh.tech')
  })

  it('has jobTitle Full-Stack Developer', () => {
    expect(jsonLd.jobTitle).toBe('Full-Stack Developer')
  })

  it('has sameAs array with two entries', () => {
    expect(Array.isArray(jsonLd.sameAs)).toBe(true)
    expect(jsonLd.sameAs.length).toBe(2)
  })
})
