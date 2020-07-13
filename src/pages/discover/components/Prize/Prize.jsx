import React from 'react'
import { View, Image } from '@tarojs/components'

import './Prize.scss'

const Prize = ({ suggest }) => {
  return (
    <View className='prize'>
      <View className='tab'>{suggest.corner_marker}</View>
      <Image src={suggest.image_hash} className='prize-img' />
      <View className='prize-head'>
        <View className='title'>{suggest.title}</View>
        <View className='price'>
          <View className='points'>{suggest.points_required}金币</View>
          <View className='original'>¥{suggest.original_price}</View>
        </View>
      </View>
    </View>
  )
}

export default Prize
