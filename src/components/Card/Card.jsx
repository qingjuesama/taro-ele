import React from 'react'
import { View } from '@tarojs/components'

import './Card.scss'

const Card = ({
  title = '',
  children = null,
  className = '',
  style = null,
}) => {
  return (
    <View className={className + ' ' + ' card'} style={{ ...style }}>
      {title && <View className='card-title'>{title}</View>}
      {children}
    </View>
  )
}

export default Card
