// 发现
import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import { reqSuggest } from '@/src/api'
import FooterBar from '@/src/components/FooterBar/FooterBar'

import './index.scss'

const Discover = () => {
  const { latitude, longitude } = useSelector(data => data.currentAddress)

  useEffect(() => {
    reqSuggest()
  }, [])

  const go = () => {
    Taro.redirectTo({ url: '/pages/profile/index' })
  }

  return (
    <View className='discover'>
      <View onClick={go}>发现</View>
      <FooterBar />
    </View>
  )
}

export default Discover
