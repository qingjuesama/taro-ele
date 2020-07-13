import React from 'react'
import { View, Image } from '@tarojs/components'

import './Prize.scss'

const Prize = ({ suggest }) => {
  return (
    <View className='prize'>
      {console.log(suggest)}
      <View>{suggest.corner_marker}</View>
      <Image src={suggest.image_hash} />
      <View>
        <View>{suggest.title}</View>
        <View>
          <View>{suggest.points_required}</View>
          <View>{suggest.original_price}</View>
        </View>
      </View>
    </View>
  )
}

export default Prize
