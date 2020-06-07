import { BATCHFILTER } from '../action-types'

// // 获取首页筛选条数据
const initBatchFilter = {}
const batchFilter = (state = initBatchFilter, action) => {
  const { type, payload } = action
  switch (type) {
    case BATCHFILTER:
      return payload
    default:
      return state
  }
}

export default {
  batchFilter,
}
