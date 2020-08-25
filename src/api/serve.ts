import { request, getStorageSync } from '@tarojs/taro'

class Server {
  // 用户token
  protected Authorization: string = getStorageSync('token') || ''

  protected ajax({
    url,
    data,
    method = 'GET',
    ...restParams
  }: Taro.RequestParams) {
    // 判断请求类型
    let contentType: string
    // GET请求
    if (method === 'GET') {
      contentType = 'application/json'
      // POST 请求
    } else if (method === 'POST') {
      contentType = 'application/x-www-form-urlencoded'
    }
    return new Promise<Taro.request.SuccessCallbackResult>(
      (resolve, reject) => {
        request({
          url,
          data,
          method,
          header: {
            'content-type': contentType,
            Authorization: this.Authorization,
          },
          ...restParams,
          // 成功回调
          success(res: Taro.request.SuccessCallbackResult): void {
            resolve(res)
          },
          // 失败回调
          fail(err: Taro.General.CallbackResult): void {
            reject(err)
          },
        })
      }
    )
  }
}

export default Server

// import { request, showLoading, hideLoading, getStorageSync } from '@tarojs/taro'

// class Server {
//   // 初始请求次数
//   protected reqNum: number = 0
//   // 用户token
//   protected Authorization: string = getStorageSync('token') || ''

//   protected ajax({
//     url,
//     data,
//     method = 'GET',
//     ...restParams
//   }: Taro.RequestParams) {
//     // 提示
//     showLoading({ title: '加载中...', mask: true })
//     // 请求次数递增
//     this.reqNum++
//     // 判断请求类型
//     let contentType: string
//     // GET请求
//     if (method === 'GET') {
//       contentType = 'application/json'
//       // POST 请求
//     } else if (method === 'POST') {
//       contentType = 'application/x-www-form-urlencoded'
//     }

//     return new Promise<Taro.request.SuccessCallbackResult>(
//       (resolve, reject) => {
//         request({
//           url,
//           data,
//           method,
//           header: {
//             'content-type': contentType,
//             Authorization: this.Authorization,
//           },
//           ...restParams,
//           // 成功回调
//           success(res: Taro.request.SuccessCallbackResult): void {
//             resolve(res)
//           },
//           // 失败回调
//           fail(err: Taro.General.CallbackResult): void {
//             reject(err)
//           },
//           // 成功失败都回调
//           complete: () => {
//             // 请求次数递减
//             this.reqNum--
//             // reqNum=0 说明最后一个请求发送完毕
//             if (this.reqNum === 0) {
//               hideLoading()
//             }
//           },
//         })
//       }
//     )
//   }
// }

// export default Server
