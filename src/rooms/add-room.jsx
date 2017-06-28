import React from 'react'
import { connect } from 'react-redux'
import * as M from './meta'
import * as R from 'ramda'
import Field, * as F from '../form/field'
import { Card } from 'semantic-react'
import { AcceptButton, CancelButton } from '../components/buttons'
import { HotKeys } from 'react-hotkeys'

class AddRoom extends React.Component {
  state = {
    name: {value: '', validation: {isValid: true}},
    length: {value: undefined, validation: {isValid: true}},
    width: {value: undefined, validation: {isValid: true}},
  }
  create = () => {
    const state = {
      ...this.updateName(this.state.name.value),
      ...this.updateDimension(this.state.length.value, 'length'),
      ...this.updateDimension(this.state.width.value, 'width'),
    }
    this.setState(state)
    if (F.areAllValid(state)) {
      this.props.create(R.map(x => x.value, state))
      this.props.afterCreate()
    }
  }
  updateName = value => ({
    name: {
      value,
      validation: M.validateName({id: undefined, name: value}, this.props.rooms),
    }
  })
  updateDimension = (value, dimension) => ({
    [dimension]: {
      value,
      validation: M.validateDimension(value),
    }
  })
  render() {
    return (
      <HotKeys handlers={{
        acceptForm: this.create,
        cancelForm: this.props.cancel,
      }}>
        <Card
          fluid
          style={{display: 'flex', flexDirection: 'column',margin: '0 0 5px 0'}}
        >
          <Field
            header="Nazwa"
            type="text"
            editing={true}
            withButtons={false}
            {...this.state.name}
            onChange={v => this.setState(this.updateName(v))}
            autoFocus
          />
          <Field
            header="Długość"
            type="number"
            label="m"
            labelPosition="right"
            editing={true}
            withButtons={false}
            {...this.state.length}
            onChange={x => this.setState(this.updateDimension(x, 'length'))}
          />
          <Field
            header="Szerokość"
            type="number"
            label="m"
            labelPosition="right"
            editing={true}
            withButtons={false}
            {...this.state.width}
            onChange={x => this.setState(this.updateDimension(x, 'width'))}
          />
        </Card>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <AcceptButton
            fluid
            onClick={this.create}
            state={F.areAllValid(this.state) ? undefined : 'disabled'}
          >
            Dodaj
          </AcceptButton>
          <CancelButton
            fluid
            onClick={this.props.cancel}
          >
            Anuluj
          </CancelButton>
        </div>
      </HotKeys>
    )
  }
}
export default connect(
  state => ({
    rooms: M.getRooms(state)
  }), {
    create: M.addRoom
  }
)(AddRoom)
