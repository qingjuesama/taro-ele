import Taro from '@tarojs/taro'
import API from '../../api'
import {
  SETTOKEN,
  CURRENTADDRESS,
  SETUSERADDRESS,
  REMOVETOKEN,
  GETUSERADDRESSLIST,
  USERADDRESS,
  REMOVEUSERADDRESS,
  REMOVEUSERADDRESSLIST,
} from '../action-types'

// 设置token
export const setToken = (token: string) => {
  token = `Bearer ${token}`
  Taro.setStorageSync('token', token)
  return { type: SETTOKEN, payload: token }
}

// 删除token
export const removeToken = () => {
  Taro.removeStorageSync('token')
  return { type: REMOVETOKEN }
}

// 设置地址信息
export const setCurrentAddress = (address) => ({
  type: CURRENTADDRESS,
  payload: address,
})

// 初始化ip定位地址
export const initCurrentAddress = () => {
  return async (dispatch) => {
    const { err, res } = await API.reqIpAddress()

    if (err) {
      console.log(err)
      return
    }

    if (res.code === 0) {
      const { city, latitude, longitude, recommend } = res.data
      // 保存地址到redux
      dispatch(
        setCurrentAddress({
          city,
          address: recommend,
          latitude,
          longitude,
        })
      )
    } else {
      // console.log(result)
    }
  }
}

// 清空用户收货地址列表
export const removeUserAddressList = () => ({ type: REMOVEUSERADDRESSLIST })
// 获取用户收货地址列表
const getUserAddressListSync = (userAddressList) => ({
  type: GETUSERADDRESSLIST,
  payload: userAddressList,
})
export const getUserAddressList = () => {
  return async (dispatch) => {
    const { err, res } = await API.reqUserAddress()

    if (err) {
      dispatch(removeUserAddressList())
      dispatch(removeToken())
      return
    }

    if (res.code === 0) {
      dispatch(getUserAddressListSync(res.data))
    }
  }
}

// 编辑用户收货地址
export const atUserAddress = (userAddress) => ({
  type: USERADDRESS,
  payload: userAddress,
})

// 修改用户收货地址
export const setAtUserAddress = (userAddress) => ({
  type: SETUSERADDRESS,
  payload: userAddress,
})

// 清空用户收货地址
export const removeUserAddress = () => ({ type: REMOVEUSERADDRESS })
