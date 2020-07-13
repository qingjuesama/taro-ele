// 发现
import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import { reqSuggest, reqDiscover } from '@/src/api'
import FooterBar from '@/src/components/FooterBar/FooterBar'

import './index.scss'

const Discover = () => {
  const { latitude, longitude } = useSelector(data => data.currentAddress)
  const [discover, setDiscover] = useState([])
  const [suggest, setSuggest] = useState([])

  useEffect(() => {
    if (latitude && longitude) {
      Promise.all([reqDiscover({ latitude, longitude }), reqSuggest()]).then(
        resArr => {
          if (resArr[0].code === 0 && resArr[1].code === 0) {
            setDiscover(resArr[1].data)
            setSuggest(resArr[0].data)
          }
        }
      )
    }
  }, [latitude, longitude])

  return (
    <View className='discover'>
      <View className='discover-main'></View>
      <View className='suggest'></View>
      <FooterBar />
    </View>
  )
}

export default Discover
