import React from 'react'

export class Removable extends React.Component {
  render() {
    const {show, children} = this.props
    return show ? children : <div></div>
  }
}
