import Taro from '@tarojs/taro'
import { SETTOKEN, REMOVETOKEN } from '../action-types'

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

export default token
