import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { reqGetShop } from '@/src/api'

import './index.scss'

const Shop = () => {
  useEffect(() => {
    reqGetShop().then(res => {
      if (res.code === 0) {
        console.log(res.data)
      }
    })
  }, [])
  return (
    <View className='ele-shop'>
      {/* <View className='ele-shop-top'>
        <View className='ele-shop-top-bg'></View>
        <View className='ele-shop-top-main'>12</View>
      </View>
      <View className='ele-shop-content'></View> */}
    </View>
  )
}

export default Shop
