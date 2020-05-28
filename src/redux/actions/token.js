import Taro from '@tarojs/taro'
import { SETTOKEN, REMOVETOKEN } from '../action-types'

export const setToken = token => {
  token = `Bearer ${token}`
  Taro.setStorageSync('token', token)
  return { type: SETTOKEN, payload: token }
}
export const removeToken = () => {
  Taro.removeStorageSync('token')
  return { type: REMOVETOKEN }
}
