import React from 'react'
import { IconButton, Button } from 'semantic-react'

export const AddButton = props =>
  <IconButton
    name="add"
    size="big"
    color="green"
    {...props}
  />

export const AcceptButton = props =>
  <Button emphasis="positive" {...props} />

export const CancelButton = props =>
  <Button emphasis="secondary" {...props} />

export const RemoveButton = props =>
  <IconButton
    emphasis="negative"
    name="remove"
    size="big"
    {...props}
  />

export const SelectButton = props =>
  <IconButton
    emphasis="positive"
    name="map outline"
    size="big"
    {...props}
  />
