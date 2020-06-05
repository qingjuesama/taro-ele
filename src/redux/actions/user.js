import Taro from '@tarojs/taro'
import { reqUserAddress } from '@/src/api'
import {
  USERADDRESS,
  SETUSERADDRESS,
  REMOVEUSERADDRESS,
  GETUSERADDRESSLIST,
  SETTOKEN,
  REMOVETOKEN,
} from '../action-types'

// 设置token
export const setToken = token => {
  token = `Bearer ${token}`
  Taro.setStorageSync('token', token)
  return { type: SETTOKEN, payload: token }
}

// 删除token
export const removeToken = () => {
  Taro.removeStorageSync('token')
  return { type: REMOVETOKEN }
}

// 编辑用户收货地址
export const atUserAddress = userAddress => ({
  type: USERADDRESS,
  payload: userAddress,
})

// 修改用户收货地址
export const setAtUserAddress = userAddress => ({
  type: SETUSERADDRESS,
  payload: userAddress,
})

// 清空用户收货地址
export const removeUserAddress = () => ({ type: REMOVEUSERADDRESS })

// 获取用户收货地址列表
const getUserAddressListSync = userAddressList => ({
  type: GETUSERADDRESSLIST,
  payload: userAddressList,
})
export const getUserAddressList = () => {
  return async (dispatch, getState) => {
    const result = await reqUserAddress()
    if (result.code === 0) {
      dispatch(getUserAddressListSync(result.data))
    } else {
      // dispatch(getUserAddressListSync([]))
      // dispatch(removeToken())
    }
  }
}
