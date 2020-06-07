import { reqGetBatchFilter } from '@/src/api'
import { BATCHFILTER } from '../action-types'

const actionGetBatchFilterSync = batchFilter => ({
  type: BATCHFILTER,
  payload: batchFilter,
})
// 获取首页筛选条数据
export const actionGetBatchFilter = parmas => {
  return async dispatch => {
    const result = await reqGetBatchFilter(parmas)
    if (result.code === 0) {
      dispatch(actionGetBatchFilterSync(result.data))
    }
  }
}
