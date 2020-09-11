import React from 'react'
import { View } from '@tarojs/components'

const Test = (test) => {
  if (test) {
    return null
  }
  return <View>1</View>
}
export default Test
