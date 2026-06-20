import { describe, it, expect } from 'vitest'
import sitemap from '../../app/sitemap'

describe('sitemap()', () => {
  const result = sitemap()

  it('returns at least one entry', () => {
    expect(result.length).toBeGreaterThan(0)
  })

  it('first entry has the correct URL', () => {
    expect(result[0].url).toBe('https://sultannurulloh.tech')
  })

  it('first entry has priority 1', () => {
    expect(result[0].priority).toBe(1)
  })

  it('first entry has changeFrequency monthly', () => {
    expect(result[0].changeFrequency).toBe('monthly')
  })

  it('first entry has a Date for lastModified', () => {
    expect(result[0].lastModified).toBeInstanceOf(Date)
  })
})
