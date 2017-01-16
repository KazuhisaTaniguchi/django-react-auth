import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'


class Signout extends Component {
  static get propTypes() {
    return {
      signoutUser: PropTypes.func,
    }
  }
  componentWillMount(){
    this.props.signoutUser()
  }
  render() {
    return (
      <div>Sorry to see you go...</div>
    )
  }
}

export default connect(null, actions)(Signout)
