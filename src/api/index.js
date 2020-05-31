import ajax from './request'

let BASEURL
if (process.env.TARO_ENV === 'h5') {
  BASEURL = '/api'
} else if (process.env.TARO_ENV === 'weapp') {
  BASEURL = 'http://localhost:4000/api'
}
// 获取ip地址
export const reqIpAddress = () =>
  ajax(BASEURL + '/ip', {
    key: 'UNZBZ-MJUKS-W76OY-6SGXP-7TIFE-AXBA3',
  })

// 搜索城市列表
export const reqCityList = params => ajax(BASEURL + '/city', params)

// 搜索当前城市详细地址
export const reqAddressDetail = params => ajax(BASEURL + '/address', params)

// 首页导航
export const reqNavList = params => ajax(BASEURL + '/navlist', params)

// 用户注册
export const reqRegister = params => {
  return ajax(BASEURL + '/register', params, 'POST')
}

// 用户登录
export const reqLogin = params => ajax(BASEURL + '/login', params, 'POST')

// 获取用户信息
export const reqUserInfo = () => ajax(BASEURL + '/userinfo')

// 获取用户地址
export const reqUserAddress = () => ajax(BASEURL + '/userAddress')

// 用户搜索地址
export const reqUseSearchAddress = params =>
  ajax(BASEURL + '/useSearchAddress', params)

// 编辑用户地址
export const reqSetUserAddress = params =>
  ajax(BASEURL + '/setUserAddress', params, 'POST')
