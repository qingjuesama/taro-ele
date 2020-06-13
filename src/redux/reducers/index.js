import { combineReducers } from 'redux'
import user from './user'
import filterShop from './filterShop'

export default combineReducers({
  ...filterShop,
  ...user,
})
