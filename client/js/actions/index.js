import axios from 'axios'
import { browserHistory } from 'react-router'
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types'

const ROOT_URL = 'http://127.0.0.1:8000'

export function signinUser({ username, email, password }) {
  return function(dispatch) {
    // same mean { email: email, password: password }
    axios.post(ROOT_URL + '/rest-auth/login/', {
      username: username,
      email: email,
      password: password
    })
      .then(response => {
        // update auth true or false
        dispatch({ type: AUTH_USER })
        // JWT save localStorage React
        localStorage.setItem('token', response.data.token)
        browserHistory.push('/feature')
      })
      .catch(() => {
        dispatch( authError('Bad Login Info') )
      })
  }
}

export function signupUser({ username, email, password, passwordConfirm }) {
  return function(dispatch) {
    axios.post(ROOT_URL + '/rest-auth/registration/', {
      username: username,
      email: email,
      password1: password,
      password2: passwordConfirm
    })
    .then(response => {
      dispatch({ type: AUTH_USER })
      localStorage.setItem('token', response.data.token)
      browserHistory.push('/feature')
    })
    .catch(() => {
      dispatch( authError('Bad Signup Info') )
    })
  }
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  axios.post(ROOT_URL + '/rest-auth/logout/')
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

// USE JWT
export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          // payload: response.data.message
          payload: '↑のコメントでfetchする'
        })
      })
  }
}
