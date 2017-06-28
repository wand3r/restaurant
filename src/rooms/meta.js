import uuid from 'uuid'
import * as R from 'ramda'
import * as Str from '../utils/string'
import * as Obj from '../utils/object'

const ADD_ROOM = 'ADD_ROOM'
const REMOVE_ROOM = 'REMOVE_ROOM'
const CHANGE_ROOM_NAME = 'CHANGE_ROOM_NAME'
const CHANGE_ROOM_DIMENSIONS = 'CHANGE_ROOM_DIMENSIONS'
const SELECT_ROOM = 'SELECT_ROOM'

export const addRoom = ({name, length, width}) => ({
  type: ADD_ROOM,
  id: uuid.v4(),
  room: { name, length, width },
})
export const removeRoom = ({id}) => ({
  type: REMOVE_ROOM,
  id,
})
export const changeRoomName = ({id, name}) => ({
  type: CHANGE_ROOM_NAME,
  id, name,
})
export const changeRoomDimensions = ({id, length, width}) => ({
  type: CHANGE_ROOM_DIMENSIONS,
  id, length, width,
})
export const selectRoom = ({id}) => ({
  type: SELECT_ROOM,
  id,
})

export const rooms = (state = {}, action) => {
  return {
    roomsById: roomsById(state.roomsById, action),
    selectedRoomId: selectedRoomId(state.selectedRoomId, action),
  }
}

const selectedRoomId = (state = undefined, action) => {
  switch (action.type) {
    case SELECT_ROOM:
      return action.id
    case REMOVE_ROOM:
      return action.id != state ? state : undefined
    default:
      return state
  }
}

const roomsById = (state = {}, action) => {
  switch(action.type) {
    case ADD_ROOM: {
      const { id, room } = action
      return {
        ...state,
        [id] : room,
      }
    }
    case REMOVE_ROOM: {
      const { id } = action
      return R.pickBy((value,key) => key != id, state)
    }
    case CHANGE_ROOM_NAME: {
      const { id, name } = action
      return {
        ...state,
        [id]: {
          ...state[id],
          name,
        }
      }
    }
    case CHANGE_ROOM_DIMENSIONS: {
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
      return state;
  }
}

export const getRooms = state => state.rooms.roomsById
export const getRoomById = (id, state) => ({
  ...state.rooms.roomsById[id],
  isSelected: id == state.rooms.selectedRoomId,
})
export const getRoomsIds = state => Object.keys(state.rooms.roomsById)
export const getSelectedRoom = state => {
  const id = state.rooms.selectedRoomId
  return id
    ? {
        id,
        ...state.rooms.roomsById[state.rooms.selectedRoomId],
      }
    : undefined
}

export const validateName = ({id,name}, rooms) =>
    Str.isEmpty(name) ? { isValid: false, msg: 'Nazwa sali nie może być pusta' } :
    Str.length(name) > 20 ? { isValid: false, msg: 'Nazwa sali nie może być dłuższa niż 20 znaków' } :
    R.pipe(Obj.withoutKey(id), Obj.any(x => x.name == name))(rooms) ? { isValid: false, msg: 'Nazwa sali jest już zajęta' } :
    { isValid: true }

export const validateDimension = (dimension) =>
  dimension == undefined ? { isValid: false, msg: "Wymiar sali nie może być pusty" } :
  Number.isNaN(dimension) ? { isValid: false, msg: "Wymiar sali musi być prawidłową liczbę" } :
  dimension <= 0 ? { isValid: false, msg: "Wymiar sali musi być większy od zera" } :
  dimension >= 100 ? { isValid: false, msg: "Wymiar sali musi być mniejszy niż 100 metrów" } :
  { isValid: true }
