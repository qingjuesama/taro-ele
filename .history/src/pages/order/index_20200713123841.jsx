// 订单
import React, { useState } from 'react'
import { View, Button, Image } from '@tarojs/components'
import { Transition } from 'react-spring/renderprops'

import FooterBar from '@/src/components/FooterBar/FooterBar'
import './index.scss'

const Order = () => {
  return (
    <View className='order'>
      <View className=''>
        <Image src='//fuss10.elemecdn.com/8/c8/bbe5984003cb26fc7b445a4a15195png.png' />
      </View>

      <FooterBar />
    </View>
  )
}
export default Order
