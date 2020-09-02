import Taro from '@tarojs/taro'
import {
  GETUSERADDRESSLIST,
  SETTOKEN,
  REMOVETOKEN,
  CURRENTADDRESS,
  USERADDRESS,
  SETUSERADDRESS,
  REMOVEUSERADDRESS,
  REMOVEUSERADDRESSLIST,
} from '../action-types'
import { Reducers } from '../interface'

interface Action<T, D = string> {
  type: T
  payload: D
}

// 用户token
type TOKENTYPE = typeof SETTOKEN | typeof REMOVETOKEN
const initToken: string = Taro.getStorageSync('token') || ''
const token = (
  state = initToken,
  action: Action<TOKENTYPE, Reducers['token']>
) => {
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

// 当前收货地址
type CURRENTADDRESSTYPE = typeof CURRENTADDRESS
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
const currentAddress = (
  state = initCurrentAddress,
  action: Action<CURRENTADDRESSTYPE, Reducers['currentAddress']>
) => {
  const { type, payload } = action
  switch (type) {
    case CURRENTADDRESS:
      return { ...state, ...payload }
    default:
      return state
  }
}

// 收货地址列表
type USERADDRESSLISTTYPE =
  | typeof GETUSERADDRESSLIST
  | typeof REMOVEUSERADDRESSLIST
const initAddressList = []
const userAddressList = (
  state = initAddressList,
  action: Action<USERADDRESSLISTTYPE, Reducers['userAddressList']>
) => {
  const { type, payload } = action
  switch (type) {
    case GETUSERADDRESSLIST:
      return payload
    case REMOVEUSERADDRESSLIST:
      return []
    default:
      return state
  }
}

// 编辑收货地址
type USERADDRESSTYPE =
  | typeof USERADDRESS
  | typeof SETUSERADDRESS
  | typeof REMOVEUSERADDRESS
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
const userAddress = (
  state = initUserAddress,
  action: Action<USERADDRESSTYPE, Reducers['userAddress']>
) => {
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
  userAddressList,
  userAddress,
  currentAddress,
}
