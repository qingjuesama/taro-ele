import Taro from '@tarojs/taro'
import {
  USER,
  USERADDRESS,
  SETUSERADDRESS,
  REMOVEUSERADDRESS,
  GETUSERADDRESSLIST,
  SETTOKEN,
  REMOVETOKEN,
  CURRENTADDRESS,
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

// 当前收货地址
const initCurrentAddress = {
  id: '',
  city: '', // 城市名称
  address: '', //详细地址
  address_detail: '', // 门牌号
  latitude: '', // 纬度
  longitude: '', // 经度
  name: '', // 收货人
  phone: '', // 收货人手机
  sex: '', // 性别
}
const currentAddress = (state = initCurrentAddress, action) => {
  const { type, payload } = action
  switch (type) {
    case CURRENTADDRESS:
      return { ...state, ...payload }
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
  id: '',
  city: '', // 城市名称
  address: '', //详细地址
  address_detail: '', // 门牌号
  latitude: '', // 纬度
  longitude: '', // 经度
  name: '', // 收货人
  phone: '', // 收货人手机
  sex: '', // 性别
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
  currentAddress,
}
