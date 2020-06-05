import { ADDRESS } from '../action-types'

const initAddress = {
  city: '', // 城市名称
  detail: '', //详细地址
  longitude: 0, // 经度
  latitude: 0, // 纬度
}
const address = (state = initAddress, action) => {
  const { type, payload } = action
  switch (type) {
    case ADDRESS:
      return { ...state, ...payload }
    default:
      return state
  }
}

export default { address }
