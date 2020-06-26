import { combineReducers } from 'redux'
import user from './user'
import filterShop from './filterShop'
import cart from './cart'

export default combineReducers({
  ...filterShop,
  ...user,
  ...cart,
})
