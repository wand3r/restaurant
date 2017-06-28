import React from 'react'
import { connect } from 'react-redux'
import { Card, Cards, Content } from 'semantic-react'
import { AddButton, RemoveButton } from '../components/buttons'
import * as M from './meta'
import * as Obj from '../utils/object'

const List = ({chairs, add, remove}) =>
  <div>
    <Cards style={{margin: '0 0 14px 0'}}>
      {Obj.mapToArray((v,id) =>
        <Card key={id} style={{width: 'auto'}}>
          <Content>
            <RemoveButton onClick={() => remove({id})} />
          </Content>
        </Card>
      )(chairs)}
    </Cards>
    <div>
      <AddButton fluid onClick={add} />
    </div>
  </div>

export default connect(
  state => ({
    chairs: M.getChairs(state)
  }),
  {
    add: M.add,
    remove: M.remove,
  }
)(List)
