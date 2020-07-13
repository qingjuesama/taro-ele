// 发现
import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import { reqSuggest, reqDiscover } from '@/src/api'
import FooterBar from '@/src/components/FooterBar/FooterBar'

import './index.scss'

const Discover = () => {
  const { latitude, longitude } = useSelector(data => data.currentAddress)

  useEffect(() => {
    if (latitude && longitude) {
      Promise.all([reqSuggest(), reqDiscover({ latitude, longitude })]).then(
        resArr => {
          if (resArr[0].code === 0 && resArr[1].code === 0) {
            console.log(resArr[0].data)
            console.log(resArr[1].data)
          }
        }
      )
    }
  }, [latitude, longitude])

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
