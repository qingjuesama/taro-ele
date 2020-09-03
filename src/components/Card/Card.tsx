import React, { FC } from 'react'
import { View } from '@tarojs/components'
import classnames from 'classnames'

import './Card.scss'

interface CardProps {
  title?: string
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const Card: FC<CardProps> = (props) => {
  const { title, children, className, style } = props
  const classes = classnames('card', className)
  return (
    <View className={classes} style={{ ...style }}>
      {title && <View className='card-title'>{title}</View>}
      {children}
    </View>
  )
}

export default Card
