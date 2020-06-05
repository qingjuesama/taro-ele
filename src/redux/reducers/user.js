import Taro from '@tarojs/taro'
import {
  USER,
  USERADDRESS,
  SETUSERADDRESS,
  REMOVEUSERADDRESS,
  GETUSERADDRESSLIST,
  SETTOKEN,
  REMOVETOKEN,
} from '../action-types'

// 用户token
const initToken = Taro.getStorageSync('token') || ''
 const token = (state = initToken, action) => {
  const { type, payload } = action
  switch (type) {
    case SETTOKEN:
      return payload
    case REMOVETOKEN:
      return ''
    default:
      return state
  }
}

const initUser = {}
 const user = (state = initUser, action) => {
  const { type, payload } = action
  switch (type) {
    case USER:
      return state
    default:
      return state
  }
}

// 收货地址列表
const initAddressList = []
 const userAddressList = (state = initAddressList, action) => {
  const { type, payload } = action
  switch (type) {
    case GETUSERADDRESSLIST:
      return payload
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
 const userAddress = (state = initUserAddress, action) => {
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

export default {
  token,
  user,
  userAddressList,
  userAddress,
}
