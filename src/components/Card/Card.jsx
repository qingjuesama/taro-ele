import React from 'react'
import { View } from '@tarojs/components'

import './Card.scss'

const Card = ({ title, children }) => {
  return (
    <View className='card'>
      {title && <View className='card-title'>{title}</View>}
      <View className='card-content'>{children}</View>
    </View>
  )
}

export default Card
