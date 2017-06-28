import React from 'react'
import { Icon, Label, Input } from 'semantic-react'
import * as R from 'ramda'
import * as N from '../utils/number'
import * as Obj from '../utils/object'

export const initializeField = (field, value = undefined) => ({
  [field]: {
    editing: false,
    value,
    validation: { isValid: true },
  }
})
export const startEdition = field => (state, props) => ({
  [field]: {
    editing: true,
    value: props[field],
    validation: {
      isValid: true,
    }
  }
})
export const cancelEdition = field => (state, props) => ({
  [field]: {
    editing: false,
    validation: { isValid: true },
    value: props[field],
  }
})
export const onChange = (field, value, validation) => ({
  [field]: {
    editing: true,
    validation,
    value,
  }
})
export const onSave = (field, value, validation) =>
  validation.isValid ? { [field]: { editing: false, validation, value } } :
  { }

export const getValue = (field, state, props) =>
  state[field].editing ? state[field].value :
  props[field]

export const areAllValid = Obj.allValues(x => x.validation.isValid)

export class IndependentField extends React.Component {
  static defaultProps = {
    header: undefined,
    initialValue: undefined,
    type: undefined,
    validator: undefined,
    onSave: undefined,
  }
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      value: props.initialValue,
      validation: {
        isValid: true,
      },
    }
  }
  render() {
    const { validator, initialValue, onSave, ...props } = this.props
    return (
      <Field
        withButtons
        {...{...props, ...this.state}}
        onEdit={() => this.setState({ editing: true })}
        onChange={(value) => this.setState({
          value,
          validation: validator(value),
        })}
        onSave={(value) => {
          const validation = validator(value)
          this.setState({
            value,
            validation,
            editing: !validation.isValid,
          })
          validation.isValid && onSave(value)
        }}
        onCancel={() => this.setState({
          value: initialValue,
          editing: false,
          validation: {
            isValid: true,
          },
        })}
      />
    )
  }
}
export const Field = ({
  header,
  value,
  type,
  validation,
  editing,
  onChange,
  onEdit,
  onSave,
  onCancel,
  withButtons,
  ...props,
}) => (
  <div style={{display: 'flex', padding: '2px 5px'}}>
    <div style={{flex: '1', display: 'flex', alignItems: 'center', height: '35px'}}>
      {header}
    </div>
    <div style={{flex: '3', display: 'flex'}}>
    {
      editing
      ? <EditableInput {...{value, type, validation, onChange, onSave, onCancel, withButtons, ...props}} />
      : <ReadonlyInput {...{value, onEdit}} />
    }
    </div>
  </div>
)

const ReadonlyInput = ({
  value,
  onEdit,
}) => (
  <div style={{display: 'flex', flex: '1', alignItems: 'center', flexDirection: 'row', height: '35px'}}>
    <div
      style={{display: 'flex', flex: '1', paddingLeft: '1em'}}
      onDoubleClick={onEdit}
    >
      {value}
    </div>
    <div style={{width: '80px', display: 'flex', justifyContent: 'center'}}>
      <Icon
        name="edit"
        size="large"
        onClick={onEdit}
      />
    </div>
  </div>
)

const EditableInput = ({
  value,
  type,
  validation,
  onChange,
  onSave,
  onCancel,
  withButtons,
  ...props,
}) => (
  <div style={{display: 'flex', flexDirection: 'row', flex: '1'}}>
    <InputWithValidation {...{value, type, validation, onChange, onSave, onCancel, ...props}} />
    <InputButtons
      isValid={validation.isValid}
      onSave={() => onSave(value)}
      {...{onCancel, withButtons}}
    />
  </div>
)

const InputButtons = ({
  withButtons,
  isValid,
  onSave,
  onCancel,
}) => (withButtons && (onSave || onCancel)) &&
  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80px', height: '35px'}}>
  {
    onSave &&
    <Icon
      name="checkmark"
      size="large"
      color="green"
      state={!isValid && "disabled"}
      onClick={isValid && onSave}
    />
  }
  {
    onCancel &&
    <Icon
      name="remove"
      size="large"
      color="red"
      onClick={onCancel}
    />
  }
  </div>

export const InputWithValidation = ({
  value,
  type,
  validation,
  onChange,
  onSave,
  onCancel,
  ...props,
}) => {
  const convertValue =
    type == 'text' ? x => x :
    type == 'number' ? N.fromStr :
    undefined
  return (
    <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
      <Input
        value={value}
        type={type}
        style={{height: '35px'}}
        state={validation.isValid ? 'focus' : 'error'}
        onChange={R.pipe(x => x.target.value, convertValue, onChange)}
        onKeyDown={({keyCode}) =>
          keyCode == 13 && onSave ? onSave(value) :
          keyCode == 27 && onCancel ? onCancel() :
          undefined}
        {...props}
      />
      <ValidationMsg {...validation} />
    </div>
  )
}

const ValidationMsg = ({isValid, msg}) => !isValid && msg &&
 <Label
    basic
    color="red"
    pointing="top"
  >
    {msg}
  </Label>

export default Field
