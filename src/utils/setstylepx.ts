import Taro from '@tarojs/taro'
import { designWidth } from '../config/base'

export default (size?: number) => {
  return Taro.pxTransform(size, designWidth)
}
