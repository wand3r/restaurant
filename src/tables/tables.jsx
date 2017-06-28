import React from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-react'
import * as M from './meta'
import * as R from 'ramda'
import Table from './table'
import AddTable from './add-table'
import { Removable } from '../components/layout'
import { AddButton } from '../components/buttons'

export class TableList extends React.Component {
  state = {
    addingTable: false,
  }
  render() {
    return (
      <div>
        <List relaxed>
          {this.props.tablesIds.map(x =>
            <Table key={x} id={x} />
          )}
          <Removable show={this.state.addingTable}>
            <AddTable
              afterCreate={() => this.setState({addingTable: false})}
              cancel={() => this.setState({addingTable: false})}
            />
          </Removable>
        </List>
        <Removable show={!this.state.addingTable}>
          <AddButton
            fluid
            onClick={() => this.setState({addingTable: true})}
          />
        </Removable>
      </div>
    )
  }
}

export default connect(
  state => ({
    tablesIds: R.pipe(M.all, M.ids)(state)
  })
)(TableList)
