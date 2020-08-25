import React, { FC } from 'react'
import { View, Image } from '@tarojs/components'

import './Svip.scss'

const Svip: FC = () => {
  return (
    <View className='svip'>
      <View className='svip-left'>
        <View className='svip-icon'>
          <Image
            className='image'
            src='https://cube.elemecdn.com/8/0e/4dd212d831becab6e3ebd484c0941jpeg.jpeg'
          ></Image>
        </View>
        <View className='svip-title'>超级会员</View>
        <View className='svip-tip'>每月领20元红包</View>
      </View>
      <View className='svip-right'>限时6元开通</View>
    </View>
  )
}

export default Svip
