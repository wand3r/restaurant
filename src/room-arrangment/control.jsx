import React from 'react'
import { Menu, MenuItem, Segment } from 'semantic-react'
import * as R from 'ramda'
import Tables from '../tables/tables'
import Rooms from '../rooms/rooms'
import Chairs from '../chairs/list'
import RoomLayout from '../rooms/layout-control'

const menuConfig = [
  { key: "rooms", header: "Sale", component: <Rooms /> },
  { key: "tables", header: "Stoły", component: <Tables /> },
  { key: "chairs", header: "Kszesła", component: <Chairs /> },
]

const Page = ({
  menuConfig = menuConfig
}) =>
  <div style={{display: 'flex', flexDirection: 'row'}}>
    <div style={{display: 'flex', flex: '1'}}>
      <RoomLayout />
    </div>
    <div style={{flex: '1'}}>
      <Tabs menuConfig={menuConfig}/>
    </div>
  </div>


class Tabs extends React.Component {
  static defaultProps = {
    menuConfig
  }
  state = {
    activeMenu: 'rooms',
  }
  render() {
    const { activeMenu } = this.state
    const { menuConfig } = this.props
    return (
      <div>
        <Menu
          pointing
          secondary
          even
          tabular
          menuValue={activeMenu}
          onMenuChange={activeMenu => this.setState({activeMenu})}
        >
          {menuConfig.map(x =>
            <MenuItem key={x.key} menuValue={x.key}>{x.header}</MenuItem>)}
        </Menu>
        <div style={{padding: '0px 5px'}}>
          {menuConfig.find(x => x.key == activeMenu).component}
        </div>
      </div>
    )
  }
}

export default Page
