// 首页广告位
import React from 'react'
import { View, Image, Navigator } from '@tarojs/components'

import './Advertising.scss'

const Advertising = ({ title, detail, img, url }) => {
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
Advertising.defaultProps = {
  title: '',
  detail: '',
  img: '',
  url: '',
}

export default Advertising
