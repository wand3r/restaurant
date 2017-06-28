import uuid from 'uuid'
import * as R from 'ramda'

const ADD_CHAIR = 'ADD_CHAIR'
const REMOVE_CHAIR = 'REMOVE_CHAIR'

export const add = () => ({
  type: ADD_CHAIR,
  id: uuid.v4(),
})

export const remove = ({id}) => ({
  type: REMOVE_CHAIR,
  id,
})

export const chairsById = (state = {}, action) => {
  switch (action.type) {
    case ADD_CHAIR: {
      return {
        ...state,
        [action.id]: { },
      }
    }
    case REMOVE_CHAIR: {
      return R.pickBy((v,k) => k != action.id, state)
    }
    default:
      return state
  }
}

export const getChairs = state => state.chairsById
