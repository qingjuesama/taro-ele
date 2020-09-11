import React from 'react'
import { View } from '@tarojs/components'

import './Framework.scss'

const framework = Array(10).fill(1)

const Framework = () => {
  return (
    <View className='navswiper'>
      <View className='framework'>
        {framework.map((item, i) => {
          return (
            <View className='framework-item' key={item + i}>
              <View className='framework-item-title'></View>
              <View className='framework-item-txt'></View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default Framework
