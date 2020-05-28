// 头部定位
import React from 'react'
import { View, Text } from '@tarojs/components'

import './Header.scss'

const Header = ({ onSetAddressShow, address }) => {
  // 跳转搜索页面
  const handleGoSearch = () => {}

  return (
    <View className='header'>
      {/* 地址 */}
      <View className='address'>
        <View className='daohang'>
          <Text className='icon icon-daohangdizhi'></Text>
        </View>
        <View className='header-title' onClick={() => onSetAddressShow(true)}>
          {address.detail ? address.detail : '定位失败,请手动选择'}
        </View>
        <View className='jiantou'>
          <Text className='icon icon-xiajiantou'></Text>
        </View>
      </View>

      {/* 搜索 */}
      <View className='search'>
         <Text className='icon icon-sousuo'></Text>
        <Text className='search-name' onClick={handleGoSearch}>
          搜索饿了么商家、商品名称
        </Text>
      </View>
    </View>
  )
}

Header.defaultProps = {
  onSetAddressShow: () => {},
  address: {},
}

export default Header

// // h5 获取位置 非https只能ip定位
// const getLocationH5 = useCallback(() => {
//   const map = new window.qq.maps.Geolocation(
//     'UNZBZ-MJUKS-W76OY-6SGXP-7TIFE-AXBA3',
//     'mapqq'
//   )

//   map.getIpLocation(
//     (data) => {
//       const { province, city } = data
//       // 设置详情地址
//       setAddress({
//         detail: 'asd',
//         longitude: '',
//         latitude: '',
//       })
//       setAddressCity(city)
//     },
//     (err) => {
//       console.log(err)
//     }
//   )
// }, [setAddress, setAddressCity])

// // 微信获取位置
// const getLocationWeapp = useCallback(async () => {
//   try {
//     const weappLocation = await Taro.getLocation({
//       type: 'wgs84',
//     })

//     console.log(weappLocation)

//     const { longitude, latitude } = weappLocation

//     const weappAddress = await Taro.chooseLocation({
//       latitude,
//       longitude,
//     })
//     const { address, name } = weappAddress

//     // address: "辽宁省沈阳市浑南区智慧四街"
//     // errMsg: "chooseLocation:ok"
//     // latitude: 41.67718
//     // longitude: 123.4631
//     // name: "浑南区沈阳市政府(智慧四街东)"

//     // 设置详细地址，
//     setAddress({
//       detail: name,
//       longitude,
//       latitude,
//     })
//     // 设置当前城市
//     setAddressCity({}.split('省')[1])
//   } catch (err) {
//     Taro.showToast({ title: '获取位置失败,请手动选择', icon: 'none' })
//   }
// }, [setAddress, setAddressCity])

// // useEffect(() => {
// //   if (process.env.TARO_ENV === 'h5') {
// //     // weapp
// //     if (!address.detail) {
// //       getLocationH5()
// //     }
// //   } else if (process.env.TARO_ENV === 'weapp') {
// //     // weapp
// //     if (!address.detail) {
// //       getLocationWeapp()
// //     }
// //   }
// // }, [])
