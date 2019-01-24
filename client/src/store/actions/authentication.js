import AxiosInstance from '../../services/Axios'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../../services/SetAuthToken'
import jwt_decode from 'jwt-decode'


export const registerUser = (user, history) => dispatch => {
  AxiosInstance.post('/v1/register', user)
  .then(res => history.push('/login'))
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
}

export const loginUser = (user) => dispatch => {
  AxiosInstance.post('/v1/login', user)
  .then(res => {
    const {token} = res.data
    localStorage.setItem('jwtToken', token)
    setAuthToken(token)
    const decoded = jwt_decode(token)
    dispatch(setCurrentUser(decoded))
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
  history.push('/signin')
}