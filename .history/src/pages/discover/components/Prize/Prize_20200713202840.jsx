import React from 'react'
import { View, Image } from '@tarojs/components'

import './Prize.scss'

const Prize = ({ suggest }) => {
  return (
    <View className='prize'>
      {console.log(suggest)}
      <View></View>
      <Image />
      <View></View>
    </View>
  )
}

export default Prize
