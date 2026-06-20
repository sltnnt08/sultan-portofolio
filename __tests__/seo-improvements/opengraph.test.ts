import { describe, it, expect } from 'vitest'
import { size, contentType, alt } from '../../app/opengraph-image'

describe('opengraph-image metadata exports', () => {
  it('size is 1200×630', () => {
    expect(size).toEqual({ width: 1200, height: 630 })
  })

  it('contentType is image/png', () => {
    expect(contentType).toBe('image/png')
  })

  it('alt text is defined', () => {
    expect(typeof alt).toBe('string')
    expect(alt.length).toBeGreaterThan(0)
  })
})
