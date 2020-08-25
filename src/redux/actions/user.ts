import Taro from '@tarojs/taro'
import API from '../../api'
import { SETTOKEN, CURRENTADDRESS, REMOVETOKEN } from '../action-types'

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
