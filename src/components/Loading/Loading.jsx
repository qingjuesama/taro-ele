// 加载组件
import React from 'react'
import { View, Text } from '@tarojs/components'

import './Loading.scss'

const Loading = ({ title }) => {
  return (
    <View className='loading'> 
      <View className='loading-rotate'>
        <Text className='icon icon-jiazai loading-rotate-icon'></Text>
      </View>
      <View>{title}</View>
    </View>
  )
}

export default Loading
