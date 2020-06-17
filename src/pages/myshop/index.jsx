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
    <View className='myshop'>
      <View className='myshop-top'>
        <View className='myshop-top-bg'></View>
        <View className='myshop-top-main'>12</View>
      </View>
      <View className='myshop-content'></View>
    </View>
  )
}

export default Shop
