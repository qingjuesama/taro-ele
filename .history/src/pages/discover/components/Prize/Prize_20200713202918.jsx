import React from 'react'
import { View, Image } from '@tarojs/components'

import './Prize.scss'

const Prize = ({ suggest }) => {
  return (
    <View className='prize'>
      {console.log(suggest)}
      <View>{suggest.corner_marker}</View>
      <Image src={suggest.image_hash} />
      <View></View>
    </View>
  )
}

export default Prize
