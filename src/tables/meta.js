import uuid from 'uuid'
import * as R from 'ramda'
import * as Num from '../utils/number'
import * as Str from '../utils/string'
import * as Obj from '../utils/object'

const ADD_TABLE = "ADD_TABLE"
const REMOVE_TABLE = "REMOVE_TABLE"
const CHANGE_TABLE_NAME = 'CHANGE_TABLE_NAME'
const CHANGE_TABLE_DIMENSIONS = 'CHANGE_TABLE_DIMENSIONS'
const MOUSEUP = 'MOUSEUP'
const MOUSEDOWN = 'MOUSEDOWN'
const MOUSEMOVE = 'MOUSEMOVE'

export const addTable = ({name, length, width}) => ({
  type: ADD_TABLE,
  id: uuid.v4(),
  table: { name, length, width },
})
export const removeTable = (id) => ({
  type: REMOVE_TABLE,
  id,
})
export const changeTableName = ({id, name}) => ({
  type: CHANGE_TABLE_NAME,
  id, name,
})
export const changeTableDimensions = ({id, length, width}) => ({
  type: CHANGE_TABLE_DIMENSIONS,
  id, length, width,
})
export const mouseDown = (roomId,coordinates) => ({
  type: MOUSEDOWN,
  roomId, coordinates,
})
export const mouseUp = (roomId, coordinates) => ({
  type: MOUSEUP,
   roomId, coordinates,
})
export const mouseMove = (roomId, coordinates) => ({
  type: MOUSEMOVE,
  roomId, coordinates,
})

export const tablesReducer = (state = {}, action) => ({
  all: allReducer(state.all, action),
  selectedId: selectedIdReducer(state.selectedId, action, state.all),
})

export const selectedIdReducer = (state = undefined, action, all) => {
  switch(action.type) {
    case MOUSEUP: {
      const { roomId, coordinates } = action
      const clickedTableId = R.pipe(
          tableInRoomOnCoordinates(roomId, coordinates),
          R.keys,
          R.head,
        )(all)
      return clickedTableId
    }
    default:
      return state
  }
}

export const allReducer = (state = {}, action) => {
  switch(action.type) {
    case ADD_TABLE: {
      const { id, table } = action
      return {
        ...state,
        [id]: table,
      }
    }
    case REMOVE_TABLE: {
      const { id } = action
      return R.pickBy((value, key) => key != id, state)
    }
    case CHANGE_TABLE_NAME: {
      const { id, name } = action
      return {
        ...state,
        [id] : {
          ...state[id],
          name,
        }
      }
    }
    case CHANGE_TABLE_DIMENSIONS: {
      const { id, length, width } = action
      return {
        ...state,
        [id]: {
          ...state[id],
          length,
          width,
        }
      }
    }
    default:
      return state
  }
}

export const tabels => state.tabels
export const all = state => state.tables.all
export const ids = Object.keys
export const withId = R.curry((id, xs) => xs[id])
export const selected = state => state.tables.all[state.tables.selectedId]
export const inRoom = R.curry((roomId, tables) =>
  R.pickBy(R.pipe(
    R.path(['position','roomId']),
    R.equals(roomId)
  ))(tables))
export const onCoordinates = R.curry((coordinates, tables) =>
  R.pickBy(R.pipe(
    toRect,
    isPointInsideRect(coordinates),
  ))(tables))
export const toRect = table => ({
    x: table.position.x,
    y: table.position.y,
    width: table.length,
    height: table.width,
  })
const inRoomOnCoordinates = R.curry((roomId, coordinates, tables) =>
  R.pipe(
    inRoom(roomId),
    onCoordinates(coordinates)
  )(tables))
export const isPointInsideRect = R.curry(({x,y}, rect) => {
  return x > rect.x && x < rect.x + rect.width
    && y > rect.y && y < rect.y + rect.height
})

export const validateDimension = (value) => {
  return value == undefined  ? { isValid: false, msg: "Wymiar stołu nie może być pusty" } :
         Number.isNaN(value) ? { isValid: false, msg: "Wymiar stołu musi być prawidłową liczbą"} :
         value <= 0          ? { isValid: false, msg: "Wymiar stołu musi być większy od zera" } :
         value >= 10         ? { isValid: false, msg: "Wymier stołu jest musi być mniejszy niż 10 metrów" } :
                               { isValid: true }
}

export const validateName = ({id, name}, tables) => {
  return Str.isEmpty(name)                                                ? { isValid: false, msg: "Nazwa stołu nie może być pusty" } :
         Str.length(name) > 10                                            ? { isValid: false, msg: "Nazwa stołu nie może być dłuższy niż 10 znaków" } :
         R.pipe(Obj.withoutKey(id), Obj.any(x => x.name == name))(tables) ? { isValid: false, msg: "Nazwa stół jest już zajęta" } :
                                                                             { isValid: true }
}
