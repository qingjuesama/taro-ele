export default {
  pages: [
    'pages/msite/index',
    'pages/discover/index',
    'pages/order/index',
    'pages/profile/index',
    'pages/profileAddress/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序',
    },
  },
}
