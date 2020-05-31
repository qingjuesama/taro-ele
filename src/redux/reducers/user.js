import {
  USER,
  USERADDRESS,
  SETUSERADDRESS,
  REMOVEUSERADDRESS,
} from '../action-types'

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
const initUserAddress = {
  id: 0,
  name: '',
  sex: 0,
  phone: '',
  address: '',
  address_detail: '',
  city: '',
  latitude: 0,
  longitude: 0,
}
export const userAddress = (state = initUserAddress, action) => {
  const { type, payload } = action
  switch (type) {
    case USERADDRESS:
      return payload
    case SETUSERADDRESS:
      return {
        ...state,
        ...payload,
      }
    case REMOVEUSERADDRESS:
      return initUserAddress
    default:
      return state
  }
}
