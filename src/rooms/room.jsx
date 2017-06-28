import React from 'react'
import { connect } from 'react-redux'
import { ListItem, Card } from 'semantic-react'
import { RemoveButton, SelectButton } from '../components/buttons'
import Field, * as F from './../form/field'
import * as M from './meta'

const Room = ({
  id,
  room: {name, length, width, isSelected},
  rooms,
  changeName,
  changeDimensions,
  remove,
  select,
}) => (
  <ListItem style={{padding: '3px 0px'}}>
    <Card fluid
      style={{
        padding: '3px 5px',
        background: isSelected ? 'rgba(0,255,0,0.2 )' : 'white',
      }}
      color={isSelected ? 'green' : undefined}
    >
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{flex: '1'}}>
          <F.IndependentField
            header="Nazwa"
            type="text"
            autoFocus={true}
            initialValue={name}
            validator={name => M.validateName({id, name}, rooms)}
            onSave={name => changeName({id, name})}
          />
          <F.IndependentField
            header="Długość"
            type="number"
            label="m"
            labelPosition="right"
            autoFocus="true"
            initialValue={length}
            validator={M.validateDimension}
            onSave={length => changeDimensions({id, length, width})}
          />
          <F.IndependentField
            header="Szerokość"
            type="number"
            label="m"
            labelPosition="right"
            autoFocus="true"
            initialValue={width}
            validator={M.validateDimension}
            onSave={width => changeDimensions({id, length, width})}
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <RemoveButton
            onClick={() => remove({id})}
          />
          <SelectButton
            onClick={() => select({id})}
          />
        </div>
      </div>
    </Card>
  </ListItem>
)
export default connect(
  (state, {id}) => ({
    rooms: M.getRooms(state),
    room: M.getRoomById(id, state),
  }), {
    changeName: M.changeRoomName,
    changeDimensions: M.changeRoomDimensions,
    select: M.selectRoom,
    remove: M.removeRoom,
  }
)(Room)
