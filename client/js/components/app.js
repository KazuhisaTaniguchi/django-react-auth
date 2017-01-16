import React, { Component, PropTypes } from 'react'
import Header from './header'

export default class App extends Component {
  static get propTypes() {
    return {
      children: PropTypes.any,
    }
  }
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}
