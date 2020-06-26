import React from 'react'
import { View } from '@tarojs/components'

import './ShopButton.scss'

const ShopButton = () => {
  return (
    <View className='shopbutton'>
      <View className='shopbutton-rec'>
        <View className='icon icon-jianshao'></View>
      </View>
      <View className='shopbutton-num'>20</View>
      <View className='shopbutton-add'>
        <View className='icon icon-zengjia'></View>
      </View>
    </View>
  )
}

export default ShopButton
