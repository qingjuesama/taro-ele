// 首页广告位
import React, { FC } from 'react'
import { View, Image, Navigator } from '@tarojs/components'

import './Advertising.scss'

interface AdvertisingProps {
  title: string
  detail: string
  img: string
  url: string
}

const Advertising: FC<AdvertisingProps> = (props) => {
  const { title, detail, img, url } = props

  return (
    <Navigator className='advertising' url={url}>
      <View className='advertising-left'>
        <View className='title'>{title}</View>
        <View className='detail'>{detail}</View>
        <View className='href'>立即抢购&gt;</View>
      </View>
      <View className='advertising-right'>
        <Image src={img} className='image' />
      </View>
    </Navigator>
  )
}

export default Advertising
