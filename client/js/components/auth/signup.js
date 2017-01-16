import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'


class Signup extends Component {
  static get propTypes() {
    return {
      signupUser: PropTypes.func,
      handleSubmit: PropTypes.func,
      fields: PropTypes.any,
      errorMessage: PropTypes.any
    }
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!!</strong>
          {this.props.errorMessage}
        </div>
      )
    }
  }
  handleFormSubmit(formProps){
    this.props.signupUser(formProps)
  }
  render() {
    const { handleSubmit, fields: { username, email, password, passwordConfirm } } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <fieldset className="form-group">
        <label>Username:</label>
        <input className="form-control" {...username} />
        {username.touched && username.error && <div className="error">{username.error}</div>}
      </fieldset>
        <fieldset className="form-group">
          <label>Email:</label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" {...password} />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input type="password" className="form-control" {...passwordConfirm} />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    )
  }
}

function validate(formProps) {
  const errors = {}
  if (!formProps.username) {
    errors.username = 'Please enter an username'
  }
  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }
  if (!formProps.password) {
    errors.password = 'Please enter an password'
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter an password confirm'
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }
  return errors
}

function mapStateToProps(state){
  // {post: state.posts.post}
  return {errorMessage: state.auth.error}
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'email', 'password', 'passwordConfirm'],
  validate: validate
}, mapStateToProps, actions)(Signup)
