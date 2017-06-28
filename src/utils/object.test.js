import * as Obj from './object'

describe('withoutKey', () => {
  it('with empty object', () => {
    expect(Obj.withoutKey('foo')({})).toEqual({})
  })
  it('with object with key', () => {
    expect(Obj.withoutKey('foo')({ foo: 1, bar: 2 })).toEqual({ bar: 2})
  })
  it('with object withoutKey', () => {
    expect(Obj.withoutKey('foo')({ bar: 2 })).toEqual({ bar: 2 })
  })
})

describe('any', () => {
  it('empty object', () => {
    expect(Obj.any(x => x.name == 'Foo')({})).toBe(false)
  })
  const o = {
    '1': {
      name: 'Bar',
    },
    '2': {
      name: 'Foo',
    },
  }
  it('with true predicate', () => {
    expect(Obj.any(x => x.name == 'Foo')(o)).toBe(true)
  })
  it('with false predicate', () => {
    expect(Obj.any(x => x.name == 'foo')(o)).toBe(false)
  })
})
