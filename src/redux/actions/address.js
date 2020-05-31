import { ADDRESS } from '../action-types'
import { reqIpAddress } from '../../api'

// 设置地址信息
export const setAddress = address => ({
  type: ADDRESS,
  payload: address,
})

// 初始化ip定位地址
export const initAddress = () => {
  return async dispatch => {
    const result = await reqIpAddress()
    if (result.code === 0) {
      const { city, latitude, longitude, recommend } = result.data
      // 保存地址到redux
      dispatch(
        setAddress({
          city,
          detail: recommend,
          latitude,
          longitude,
        })
      )
    }
  }
}
