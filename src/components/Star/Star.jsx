import React, { useMemo } from 'react'
import { View } from '@tarojs/components'

import './Star.scss'

const Star = ({ rating }) => {
  // 计算评分⭐⭐
  const countGrade = useMemo(() => {
    return (rating / 5) * 100 + '%'
  }, [rating])

  return (
    <View className='star'>
      <View className='star1'></View>
      <View className='star2' style={{ width: countGrade }}></View>
    </View>
  )
}

Star.PropDefault = {
  rating: 5,
}
export default Star
