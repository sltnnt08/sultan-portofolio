import { describe, it, expect } from 'vitest'

// Import the robots function directly — it has no Next.js runtime dependencies
// app/robots.ts only imports a type, so it's safe to import in Node/Vitest.
import robots from '../../app/robots'

describe('robots()', () => {
  const result = robots()

  it('allows all user agents', () => {
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules
    expect(rules.userAgent).toBe('*')
  })

  it('allows the root path', () => {
    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules
    expect(rules.allow).toBe('/')
  })

  it('points to the correct sitemap URL', () => {
    expect(result.sitemap).toBe('https://sultannurulloh.tech/sitemap.xml')
  })
})
