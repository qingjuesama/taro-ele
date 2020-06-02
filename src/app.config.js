export default {
  pages: [
    'pages/msite/index',
    'pages/discover/index',
    'pages/order/index',
    'pages/profile/index',
    'pages/profile/pages/info/index',
    'pages/profile/pages/address/index',
    'pages/profile/pages/edit/index',
    'pages/profile/pages/add/index',
    'pages/profile/pages/search/index',
    'pages/profile/pages/username/index',
    'pages/profile/pages/password/index',
    'pages/login/index',
    'pages/register/index',
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
