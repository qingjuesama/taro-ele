import { combineReducers } from 'redux'

import address from './address'
import user from './user'

export default combineReducers({
  ...address,
  ...user,
})
