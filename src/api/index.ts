import to from 'await-to-js'
import Server from './serve'
import configStore from '../redux/store'
import { removeToken } from '../redux/actions/user'
import { H5 } from '../config/base'
import {
  Ip,
  Ifilter,
  IShopList,
  IRegisterParams,
  IRegister,
  ILoginParams,
  ILogin,
} from './interface'

let BASEURL: string
if (process.env.TARO_ENV === 'h5') {
  BASEURL = '/api'
} else {
  BASEURL = 'http://192.168.1.112:4000/api'
}

const store = configStore()

type Result = Taro.request.SuccessCallbackResult<any> | undefined

interface Err {
  code: number
  message: string
}

interface APILayout<T> {
  code: number
  data: T
}

class API extends Server {
  // 异常处理
  protected errMessage(error: Error | any, result: Result): Err | null {
    // H5
    if (H5 && !error) {
      return null
    } else if (result?.statusCode === 200) {
      return null
    }
    const code = error?.status || result?.statusCode
    // 401 清空token
    if (code === 401) {
      // 清空token
      store.dispatch(removeToken())
    }
    const errInfo = {
      '401': '请先登录',
      '404': '服务器未响应',
      '500': '服务器繁忙',
    }
    return {
      code,
      message: errInfo[code] ? errInfo[code] : '其他错误',
    }
  }

  // 获取ip地址
  async reqIpAddress() {
    let [error, result] = await to(
      this.ajax({
        url: BASEURL + '/ip',
        data: { key: 'UNZBZ-MJUKS-W76OY-6SGXP-7TIFE-AXBA3' },
      })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<Ip> = result?.data

    return { err, res }
  }

  // 首页导航
  async reqNavList(params: any) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/navlist', data: params })
    )
    const err = this.errMessage(error, result)
    const res = result?.data

    return { err, res }
  }

  // 获取首页筛选条数据
  async reqGetBatchFilter() {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/getBatchFilter' })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<Ifilter> = result?.data

    return { err, res }
  }

  // 获取首页商品数据列表
  async reqGetMsiteShopList(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/getMsiteShopList', data: params })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<IShopList[]> = result?.data

    return { err, res }
  }

  // 用户登录
  async reqLogin(params: ILoginParams) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/login', data: params, method: 'POST' })
    )

    const err = this.errMessage(error, result)
    const res: ILogin = result?.data

    return { err, res }
  }

  // 用户注册
  async reqRegister(params: IRegisterParams) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/register', data: params, method: 'POST' })
    )
    const err = this.errMessage(error, result)
    const res: IRegister = result?.data

    return { err, res }
  }

  // // 搜索城市列表
  // async reqCityList(params: object) {
  //   let [err, result] = await to(
  //     this.ajax({
  //       url: BASEURL + '/city',
  //       data: params,
  //     })
  //   )
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 搜索当前城市详细地址
  // async reqAddressDetail(params) {
  //   let [err, result] = await to(this.ajax(BASEURL + '/address', params))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 获取用户信息
  // async reqUserInfo() {
  //   let [err, result] = await to(this.ajax(BASEURL + '/userinfo'))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 获取用户地址
  // async reqUserAddress() {
  //   let [err, result] = await to(this.ajax(BASEURL + '/userAddress'))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 用户搜索地址
  // async reqUseSearchAddress(params) {
  //   let [err, result] = await to(
  //     this.ajax(BASEURL + '/useSearchAddress', params)
  //   )
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 编辑用户收货地址
  // async reqSetUserAddress(params) {
  //   let [err, result] = await to(
  //     this.ajax(BASEURL + '/setUserAddress', params, 'POST')
  //   )
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 添加用户收货地址
  // async reqAddUserAddress(params) {
  //   let [err, result] = await to(
  //     this.ajax(BASEURL + '/addUserAddress', params, 'POST')
  //   )
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 删除用户收货地址
  // async reqDelUserAddress(id) {
  //   let [err, result] = await to(this.ajax(BASEURL + '/delUserAddress', id))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 修改用户名
  // async reqSetUserName(username) {
  //   let [err, result] = await to(
  //     this.ajax(BASEURL + '/setUserName', username, 'POST')
  //   )
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 修改用户密码
  // async reqSetPassWord(params) {
  //   let [err, result] = await to(
  //     this.ajax(BASEURL + '/setPassWord', params, 'POST')
  //   )
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 商家列表头部滑动分类数据
  // async reqGetFoodsPage({ latitude, longitude, entry_id }) {
  //   let [err, result] = await to(
  //     this.ajax(BASEURL + '/getFoodsPage', { latitude, longitude, entry_id })
  //   )
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 商家列表头部更多分类
  // async reqGetFoodsClass({ latitude, longitude }) {
  //   let [err, result] = await to(
  //     this.ajax(BASEURL + '/getFoodsClass', { latitude, longitude })
  //   )
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 获取商家详情信息
  // async reqGetShop(id) {
  //   let [err, result] = await to(this.ajax(BASEURL + '/getShop', { id }))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 获取商家评价
  // async reqEstimate() {
  //   let [err, result] = await to(this.ajax(BASEURL + '/getEstimate'))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 获取商家评论更多
  // async reqRatings({ name, offset, limit, has_content }) {
  //   let [err, result] = await to(
  //     this.ajax(BASEURL + '/getRatings', { name, offset, limit, has_content })
  //   )
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 获取商家品牌故事
  // async reqBrandStory() {
  //   let [err, result] = await to(this.ajax(BASEURL + '/brandStory'))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 热门搜索
  // async reqHotSearchWords({ latitude, longitude }) {
  //   let [err, result] = await to(
  //     this.ajax(BASEURL + '/hotSearchWords', { latitude, longitude })
  //   )
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 搜索结果
  // async reqTypeaHead(value) {
  //   let [err, result] = await to(this.ajax(BASEURL + '/typeaHead', { value }))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 发现 限时抽奖
  // async reqSuggest() {
  //   let [err, result] = await to(this.ajax(BASEURL + '/suggest'))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }
  // // 发现
  // async reqDiscover({ latitude, longitude }) {
  //   let [err, result] = await to(
  //     this.ajax(BASEURL + '/discover', { latitude, longitude })
  //   )
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 支付
  // async reqPay(params) {
  //   let [err, result] = await to(this.ajax(BASEURL + '/pay', params, 'POST'))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }

  // // 订单列表
  // async getOrder() {
  //   let [err, result] = await to(this.ajax(BASEURL + '/getOrder'))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }
  // // 订单详情
  // async getOrderDetail({ id }) {
  //   let [err, result] = await to(this.ajax(BASEURL + '/getOrderDetail', { id }))
  //   err = this.errMessage(err)

  //   return [err, result]
  // }
}

export default new API()
