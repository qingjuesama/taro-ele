import Taro from '@tarojs/taro'
import to from 'await-to-js'
import Server from './serve'
import configStore from '../redux/store'
import { removeToken, removeUserAddressList } from '../redux/actions/user'
import { H5 } from '../config/base'
import {
  Ip,
  Ifilter,
  IShopList,
  IRegisterParams,
  IRegister,
  ILoginParams,
  ILogin,
  IUserInfo,
  IUserNameParams,
  PasswordParams,
  IUserAddressParams,
  Address,
  GETCityList,
  HotSearchWords,
  FoodsPage,
  FoodsClass,
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
interface APIMessage<T> {
  code: number
  message: T
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
      // 清空用户地址
      store.dispatch(removeUserAddressList())
    }
    const errInfo = {
      401: '请先登录',
      404: '服务器未响应',
      500: '服务器繁忙',
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

  // 获取用户信息
  async reqUserInfo() {
    let [error, result] = await to(this.ajax({ url: BASEURL + '/userinfo' }))

    const err = this.errMessage(error, result)
    const res: APILayout<IUserInfo> = result?.data

    return { err, res }
  }

  // 修改用户名
  async reqSetUserName(username: IUserNameParams) {
    let [error, result] = await to(
      this.ajax({
        url: BASEURL + '/setUserName',
        data: username,
        method: 'POST',
      })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<string> = result?.data

    return { err, res }
  }

  // 修改用户密码
  async reqSetPassWord(params: PasswordParams) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/setPassWord', data: params, method: 'POST' })
    )

    const err = this.errMessage(error, result)
    const res: APIMessage<string> = result?.data

    return { err, res }
  }

  // 删除用户收货地址
  async reqDelUserAddress(id: IUserAddressParams) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/delUserAddress', data: id })
    )

    const err = this.errMessage(error, result)
    const res: APILayout<Address> & APIMessage<string> = result?.data

    return { err, res }
  }

  // 获取用户地址
  async reqUserAddress() {
    let [error, result] = await to(this.ajax({ url: BASEURL + '/userAddress' }))

    const err = this.errMessage(error, result)
    const res: APILayout<Address> = result?.data

    return { err, res }
  }

  // 添加用户收货地址
  async reqAddUserAddress(params) {
    let [error, result] = await to(
      this.ajax({
        url: BASEURL + '/addUserAddress',
        data: params,
        method: 'POST',
      })
    )

    const err = this.errMessage(error, result)
    const res = result?.data

    return { err, res }
  }

  // 用户搜索地址
  async reqUseSearchAddress(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/useSearchAddress', data: params })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<Address[]> = result?.data

    return { err, res }
  }

  // 编辑用户收货地址
  async reqSetUserAddress(params) {
    let [error, result] = await to(
      this.ajax({
        url: BASEURL + '/setUserAddress',
        data: params,
        method: 'POST',
      })
    )
    const err = this.errMessage(error, result)
    const res = result?.data

    return { err, res }
  }

  // 发现 限时抽奖
  async reqSuggest() {
    let [error, result] = await to(this.ajax({ url: BASEURL + '/suggest' }))
    const err = this.errMessage(error, result)
    const res = result?.data

    return { err, res }
  }

  // 发现
  async reqDiscover(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/discover', data: params })
    )
    const err = this.errMessage(error, result)
    const res = result?.data

    return { err, res }
  }

  // 订单列表
  async getOrder() {
    let [error, result] = await to(this.ajax({ url: BASEURL + '/getOrder' }))
    const err = this.errMessage(error, result)
    const res = result?.data

    return { err, res }
  }

  // 订单详情
  async getOrderDetail(id) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/getOrderDetail', data: id })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<any> = result?.data

    return { err, res }
  }

  // 搜索当前城市详细地址
  async reqAddressDetail(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/address', data: params })
    )

    const err = this.errMessage(error, result)
    const res: APILayout<Address[]> = result?.data

    return { err, res }
  }

  // 搜索城市列表
  async reqCityList() {
    let [error, result] = await to(
      this.ajax({
        url: BASEURL + '/city',
      })
    )

    const err = this.errMessage(error, result)
    const res: APILayout<GETCityList> = result?.data

    return { err, res }
  }

  // 热门搜索
  async reqHotSearchWords(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/hotSearchWords', data: params })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<HotSearchWords[]> = result?.data

    return { err, res }
  }

  // 搜索结果
  async reqTypeaHead(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/typeaHead', data: params })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<any> = result?.data

    return { err, res }
  }

  // 商家列表头部滑动分类数据
  async reqGetFoodsPage(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/getFoodsPage', data: params })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<FoodsPage[]> = result?.data

    return { err, res }
  }

  // 商家列表头部更多分类
  async reqGetFoodsClass(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/getFoodsClass', data: params })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<FoodsClass[]> = result?.data

    return { err, res }
  }

  // 获取商家详情信息
  async reqGetShop(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/getShop', data: params })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<any> = result?.data

    return { err, res }
  }

  // 获取商家评价
  async reqEstimate(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/getEstimate', data: params })
    )

    const err = this.errMessage(error, result)
    const res: APILayout<any> = result?.data

    return { err, res }
  }

  // 获取商家评论更多
  async reqRatings(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/getRatings', data: params })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<any> = result?.data

    return { err, res }
  }

  // 获取商家品牌故事
  async reqBrandStory() {
    let [error, result] = await to(this.ajax({ url: BASEURL + '/brandStory' }))
    const err = this.errMessage(error, result)
    const res: APILayout<any> = result?.data

    return { err, res }
  }

  // 支付
  async reqPay(params) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/pay', data: params, method: 'POST' })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<any[]> = result?.data

    return { err, res }
  }
}

export default new API()
