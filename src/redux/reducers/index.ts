import { combineReducers } from 'redux'
import user from './user'
import cart from './cart'

export default combineReducers({
  ...user,
  ...cart,
})

