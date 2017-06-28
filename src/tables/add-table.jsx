import React from 'react'
import { connect } from 'react-redux'
import Field, * as F from './../form/field'
import { Card } from 'semantic-react'
import { AcceptButton, CancelButton } from '../components/buttons'
import { HotKeys } from 'react-hotkeys'
import * as M from './meta'
import * as R from 'ramda'

class AddTable extends React.Component {
  state = {
    name: {value: '', validation: {isValid: true }},
    length: {value: undefined, validation: {isValid: true }},
    width: {value: undefined, validation: {isValid: true }},
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
      validation: M.validateName({id: undefined, name: value}, this.props.tables),
    }
  })
  updateDimension = (value, dimension) => ({
    [dimension]: {
      value,
      validation: M.validateDimension(value),
    }
  })
  render() {
    const { name, length, width } = this.state
    return (
      <HotKeys handlers={{
        acceptForm: this.create,
        cancelFrom: this.props.cancel,
      }}>
        <Card
          fluid
          style={{display: 'flex', flexDirection: 'column', margin: '0 0 5px 0'}}
        >
          <Field
            header="Nazwa"
            type="text"
            editing
            autoFocus
            withButtons={false}
            {...name}
            onChange={x => this.setState(this.updateName(x))}
          />
          <Field
            header="Długość"
            type="number"
            label="m"
            labelPosition="right"
            withButtons={false}
            editing
            {...length}
            onChange={x => this.setState(this.updateDimension(x, 'length'))}
          />
          <Field
            header="Szerokość"
            type="number"
            label="m"
            labelPosition="right"
            withButtons={false}
            editing
            {...width}
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
    tables: M.all(state)
  }), {
    create: M.addTable,
  }
)(AddTable)
