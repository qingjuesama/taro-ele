import { combineReducers } from 'redux'

import address from './address'
import token from './token'
import { userAddress } from './user'

export default combineReducers({
  address,
  token,
  userAddress,
})
