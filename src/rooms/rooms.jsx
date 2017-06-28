import React from 'react'
import { connect } from 'react-redux'
import * as M from './meta'
import * as Obj from '../utils/object'
import { List } from 'semantic-react'
import Room from './room'
import AddRoom from './add-room'
import { AddButton } from '../components/buttons'
import { Removable } from '../components/layout'

export class RoomList extends React.Component {
  state = {
    addingRoom: false,
  }
  render() {
    return (
      <div>
        <List relaxed>
          {this.props.roomsIds.map(id =>
            <Room key={id} id={id} />
          )}
          <Removable show={this.state.addingRoom}>
            <AddRoom
              cancel={() => this.setState({addingRoom: false})}
              afterCreate={() => this.setState({addingRoom: false})}
            />
          </Removable>
        </List>
        <Removable show={!this.state.addingRoom}>
          <AddButton
            fluid
            onClick={() => this.setState({addingRoom: true})}
          />
        </Removable>
      </div>
    )
  }
}
export default connect(
  state => ({
    roomsIds: M.getRoomsIds(state),
  }),
)(RoomList)
