import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'
import uuid from 'uuid'
import * as R from 'ramda'

export const mockState =  {
  tables: {
    all: {
      '0': {
        name: '1',
        length: 1.8,
        width: 1,
        position: {
          roomId: '0',
          x: 3, y: 2
        },
      },
      '1': {
        name: '2',
        length: 1.8,
        width: 1,
        position: {
          roomId: '1',
          x: 1, y: 1
        },
      },
      '2': {
        name: '3',
        length: 2.5,
        width: 1,
        position: {
          roomId: '1',
          x: 1, y: 5
        },
      },
      '3': {
        length: 2.5,
        name: '4',
        width: 1,
      },
      '4': {
        name: '5',
        length: 2.5,
        width: 1,
        position: {
          roomId: '0',
          x: 3, y: 5
        },
      },
      '5': {
        name: '6',
        length: 2,
        width: 2,
      },
      '6': {
        name: '7',
        length: 2,
        width: 2,
        position: {
          roomId: '0',
          x: 3, y: 8
        },
      },
    },
    selectedId: undefined,
  },
  rooms: {
    roomsById: {
      '0': {
        name: 'Górna sala',
        length: 8,
        width: 10,
      },
      '1': {
        name: 'Dolna sala 1',
        length: 5,
        width: 8,
      },
      '2': {
        name: 'Dolna sala 2',
        length: 5,
        width: 5,
      },
    },
    selectedRoomId: undefined,
  },
  chairsById: {
    '0': {},
    '1': {},
    '2': {},
    '3': {},
  },
}
const logger = createLogger()
export const store = createStore(
  reducer,
  mockState,
  applyMiddleware(thunk, logger),
)

export default store;
