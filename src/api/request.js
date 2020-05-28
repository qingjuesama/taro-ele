import Taro, { request, showLoading, hideLoading } from '@tarojs/taro'

// 初始请求次数
let reqNum = 0
const ajax = (url, data = {}, method, param) => {
  showLoading({ title: '加载中...', mask: true })
  // 请求次数递增
  reqNum++

  // 判断请求类型
  let contentType = 'application/json'
  if (method === 'POST') {
    contentType = 'application/x-www-form-urlencoded'
  }

  // 用户token令牌
  let token = Taro.getStorageSync('token') || ''
  let Authorization
  if (token) {
    Authorization = {
      Authorization: token,
    }
  }

  return new Promise(resolve => {
    request({
      url,
      data,
      header: {
        'content-type': contentType,
        ...Authorization,
      },
      method,
      ...param,
      // 成功回调
      success(res) {
        resolve(res.data)
      },
      // 失败回调
      fail(res) {
        if (res.status === 401) {
          resolve({
            code: 1,
            message: '请先登录',
          })
        } else {
          resolve({
            code: 2,
            message: '服务期繁忙',
          })
        }
      },
      // 成功失败都回调
      complete() {
        // 请求次数递减
        reqNum--
        // reqNum=0 说明最后一个请求发送完毕
        if (reqNum === 0) {
          hideLoading()
        }
      },
    }).catch(err => {})
  })
}

export default ajax
