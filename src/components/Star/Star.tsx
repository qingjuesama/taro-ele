import React, { FC } from 'react'
import { View } from '@tarojs/components'

import './Star.scss'

interface StarProps {
  rating: number
}

const Star: FC<StarProps> = (props) => {
  const { rating } = props
  
  // 计算评分⭐⭐
  const countGrade = (): string => {
    return (rating / 5) * 100 + '%'
  }

  return (
    <View className='star'>
      <View className='star1'></View>
      <View className='star2' style={{ width: countGrade() }}></View>
    </View>
  )
}

export default Star
