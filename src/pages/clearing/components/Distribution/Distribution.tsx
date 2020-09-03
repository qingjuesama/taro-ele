import React, { useCallback } from 'react'
import { View } from '@tarojs/components'

import './Distribution.scss'

const Distribution = () => {
  const getTime = useCallback(() => {
    const timeNow = Date.now() + 30 * 60 * 1000
    const time = new Date(timeNow)
    const hours = time.getHours()
    const minutes =
      Number(time.getMinutes()) < 10
        ? '0' + time.getMinutes()
        : time.getMinutes()

    return hours + ':' + minutes
  }, [])

  return (
    <View className='distribution'>
      <View className='distribution-row'>
        <View className='row-left'>送达时间</View>
        <View className='row-right'>尽快送达({getTime()}送达)</View>
      </View>
      <View className='distribution-row'>
        <View className='row-left'>支付方式</View>
        <View className='row-right'>在线支付</View>
      </View>
    </View>
  )
}

export default Distribution
