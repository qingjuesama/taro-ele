import { USER, USERADDRESS } from '../action-types'

const initUser = {}
export const user = (state = initUser, action) => {
  const { type, payload } = action
  switch (type) {
    case USER:
      return state
    default:
      return state
  }
}

// 编辑收货地址
const initUserAddress = {}
export const userAddress = (state = initUserAddress, action) => {
  const { type, payload } = action
  switch (type) {
    case USERADDRESS:
      return payload
    default:
      return state
  }
}
