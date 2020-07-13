// 发现
import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Image } from '@tarojs/components'
import { reqSuggest, reqDiscover } from '@/src/api'
import FooterBar from '@/src/components/FooterBar/FooterBar'

import './index.scss'
import imgUrl from '@/src/utils/imgUrl'

const Discover = () => {
  const { latitude, longitude } = useSelector(data => data.currentAddress)
  const [discover, setDiscover] = useState([])
  const [suggest, setSuggest] = useState([])

  useEffect(() => {
    if (latitude && longitude) {
      Promise.all([reqDiscover({ latitude, longitude }), reqSuggest()]).then(
        resArr => {
          if (resArr[0].code === 0 && resArr[1].code === 0) {
            setDiscover(resArr[1].data[0])
            setSuggest(resArr[0].data)
          }
        }
      )
    }
  }, [latitude, longitude])

  return (
    <View className='discover'>
      <View className='discover-main'>
        {discover.map(item => {
          return (
            <View key={item.id}>
              <View>
                <View>{item.title}</View>
                <View>{item.subtitle}</View>
              </View>
              <Image src={imgUrl(item.main_pic_hash)} />
            </View>
          )
        })}
      </View>
      <View className='suggest'></View>
      <FooterBar />
    </View>
  )
}

export default Discover
