import { reqGetBatchFilter } from '@/src/api'
import {
  BATCHFILTER,
  UPNAVSORT,
  UPDISTANCE,
  UPSALES,
  UPFILTER,
  SHOPPARAMS,
} from '../action-types'

const actionGetBatchFilterSync = batchFilter => ({
  type: BATCHFILTER,
  payload: batchFilter,
})
// 获取筛选条所有数据
export const actionGetBatchFilter = parmas => {
  return async dispatch => {
    const result = await reqGetBatchFilter(parmas)
    if (result.code === 0) {
      dispatch(actionGetBatchFilterSync(result.data))
    }
  }
}

// 更新综合排序
export const actionUpNavSort = navSort => ({
  type: UPNAVSORT,
  payload: navSort,
})

// 更新距离最近
export const actionUpDistance = distance => ({
  type: UPDISTANCE,
  payload: distance,
})

// 更新销量最高
export const actionUpSales = sales => ({ type: UPSALES, payload: sales })

// 更新筛选条件
export const actionUpFilter = filter => ({ type: UPFILTER, payload: filter })

// 设置商家列表参数
export const actionShopParams = params => ({
  type: SHOPPARAMS,
  payload: params,
})
