// 发现
import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Image } from '@tarojs/components'
import { reqSuggest, reqDiscover } from '@/src/api'
import FooterBar from '@/src/components/FooterBar/FooterBar'
import imgUrl from '@/src/utils/imgUrl'
import Prize from './components/Prize/Prize'

import './index.scss'

const Discover = () => {
  const { latitude, longitude } = useSelector(data => data.currentAddress)
  const [discover, setDiscover] = useState([])
  const [suggests, setSuggests] = useState([])

  useEffect(() => {
    if (latitude && longitude) {
      Promise.all([reqDiscover({ latitude, longitude }), reqSuggest()]).then(
        resArr => {
          if (resArr[0].code === 0 && resArr[1].code === 0) {
            setDiscover(resArr[0].data['1'])
            setSuggests(resArr[1].data)
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
            <View key={item.id} className='discover-item'>
              <View className='discover-left'>
                <View
                  className='discover-title'
                  style={{ color: item.title_color }}
                >
                  {item.title}
                </View>
                <View className='discover-discover-subtitle'>
                  {item.subtitle}
                </View>
              </View>
              <Image
                src={imgUrl(item.main_pic_hash)}
                className='discover-img'
              />
            </View>
          )
        })}
      </View>
      <View className='suggest'>
        <View className='suggest-head'>
          <View className='suggest-head-title'>
            <View className='striping'></View>
            <View className='icon icon-icon-test'></View>
            <View className='title'>限时好礼</View>
            <View className='striping'></View>
          </View>
          <View className='tip'>金币换豪礼</View>
        </View>
        <View className='suggest-main'>
          {suggests.map((suggest, i) => {
            return <Prize key={suggest.title + i} suggest={suggest} />
          })}
        </View>
      </View>
      <FooterBar />
    </View>
  )
}

export default Discover
