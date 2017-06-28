import * as N from './number'

describe('fromStr', () => {
  it('with empty string', () => {
    expect(N.fromStr('')).toBeUndefined()
    expect(N.fromStr(' ')).toBeUndefined()
    expect(N.fromStr('  ')).toBeUndefined()
  })
  it('with invalid string', () => {
    expect(N.fromStr('a')).toBeNaN()
    expect(N.fromStr('1a')).toBeNaN()
    expect(N.fromStr('a1')).toBeNaN()
    expect(N.fromStr('1 1')).toBeNaN()
  })
  it('with valid string', () => {
    expect(N.fromStr('10')).toBe(10)
    expect(N.fromStr(' 10')).toBe(10)
    expect(N.fromStr('10 ')).toBe(10)
    expect(N.fromStr(' 10 ')).toBe(10)
    expect(N.fromStr('10.5')).toBe(10.5)
    expect(N.fromStr('-10.25')).toBe(-10.25)
  })
})
