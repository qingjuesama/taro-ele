import React, { FC } from 'react'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames'
import setstylepx from '../../utils/setstylepx'
import './ELoading.scss'

interface ELoadingProps {
  height?: number
  className?: string
  move?: boolean
  title?: string
  icon?: boolean
}

const ELoading: FC<ELoadingProps> = (props) => {
  const { height, className, move, title, icon } = props
  const classes = classnames('ele-isloading', className)
  if (move) {
    return (
      <View className='ele-move'>
        {icon && <View className='ele-move-icon'></View>}
        <Text className='ele-move-title'>{title}</Text>
      </View>
    )
  } else {
    return (
      <View className={classes} style={{ height: setstylepx(height) }}></View>
    )
  }
}

ELoading.defaultProps = {
  height: 200,
  title: '正在加载...',
  icon: true,
}
export default ELoading
