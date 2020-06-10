import {
  BATCHFILTER,
  UPNAVSORT,
  UPDISTANCE,
  UPSALES,
  UPFILTER,
} from '../action-types'

// // 获取首页筛选条数据
const initBatchFilter = {
  nav: {
    sort: {},
    distance: {},
    sales: {},
    filter: {},
  },
  sort: [],
  filter: {
    serve: {
      title: '',
      main: [],
    },
    activity: {
      title: '',
      main: [],
    },
    expenditure: {
      title: '',
      main: [],
    },
  },
}
const batchFilter = (state = initBatchFilter, action) => {
  const { type, payload } = action
  switch (type) {
    case BATCHFILTER:
      return payload
    case UPNAVSORT:
      // 更新综合排序
      state.nav.sort = payload
      return { ...state }
    case UPDISTANCE:
      // 距离最近
      state.nav.distance = payload
      return { ...state }
    case UPSALES:
      // 销量最高
      state.nav.sales = payload
      return { ...state }
    case UPFILTER:
      // 更新筛选
      state.filter = payload
      return { ...state }
    default:
      return state
  }
}

export default {
  batchFilter,
}
