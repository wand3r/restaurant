import React from 'react'
import { Provider } from 'react-redux'
import { HotKeys } from 'react-hotkeys'
import { keyMap } from './hotkeys'
import RoomArrangment from './room-arrangment/control'

export default ({store}) => (
  <Provider store={store}>
    <div style={{height: '100%'}}>
      <HotKeys keyMap={keyMap}>
        <RoomArrangment />
      </HotKeys>
    </div>
  </Provider>
)
