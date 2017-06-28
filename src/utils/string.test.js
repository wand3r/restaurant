import * as Str from './string'

describe('isEmpty', () => {
  it('with with only whitespaces', () => {
    expect(Str.isEmpty('')).toBe(true)
    expect(Str.isEmpty(' ')).toBe(true)
    expect(Str.isEmpty('  ')).toBe(true)
  })
  it('with text and whitespaces', () => {
    expect(Str.isEmpty('a')).toBe(false)
    expect(Str.isEmpty('aa')).toBe(false)
    expect(Str.isEmpty(' a')).toBe(false)
    expect(Str.isEmpty('a ')).toBe(false)
    expect(Str.isEmpty(' a ')).toBe(false)
    expect(Str.isEmpty('a a')).toBe(false)
  })
})
