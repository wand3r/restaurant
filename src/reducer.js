import { tablesReducer } from './tables/meta'
import { rooms } from './rooms/meta'
import { chairsById } from './chairs/meta'

export const reducer = (state = {}, action) => ({
  tables: tablesReducer(state.tables, action),
  rooms: rooms(state.rooms, action),
  chairsById: chairsById(state.chairsById, action),
})

export default reducer
