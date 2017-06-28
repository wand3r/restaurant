import * as M from './meta'
import {mockState} from '../store'
import * as R from 'ramda'

describe('get tables from room', () => {
  it('which has tables', () => {
    expect(M.inRoom('0',mockState.tables.all)).
    toEqual(R.pick(['0', '4', '6'],mockState.tables.all))
  })
  it('which has no tables', () => {
    expect(M.inRoom(3,mockState.tables.all)).
    toEqual({})
  })
})

it('Rectangle from table', () => {
  expect(M.toRect(mockState.tables.all[0])).
  toEqual({x:3,y:2,width:1.8,height:1})
})

describe('Point', () => {
  it('is inside rectangle', () => {
    expect(M.isPointInsideRect({x:20,y:10}, {x:15,y:8,width:7,height:4})).
    toBe(true)
  })
  it('is outside rectangle', () => {
    expect(M.isPointInsideRect({x:23,y:10}, {x:15,y:8,width:7,height:4})).
    toBe(false)
    expect(M.isPointInsideRect({x:20,y:6}, {x:15,y:8,width:7,height:4})).
    toBe(false)
  })
})

describe('Table on coordinates', () => {
  const tables = R.pick(['0','4','6'],mockState.tables.all)
  it('exist', () => {
    expect(M.onCoordinates({x:4,y:2.5}, tables)).
    toEqual(R.pick(['0'], tables))
  })
  it('dont exist', () => {
    expect(M.onCoordinates({x:4,y:4}, tables)).
    toEqual({})
  })
})
