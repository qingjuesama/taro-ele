import React from 'react'
import { View } from '@tarojs/components'

import './FooterDic.scss'

const FooterDic = ({ totalPrice, discountsPrice, onPay }) => {
  return (
    <View className='footerdic'>
      <View className='footerdic-price'>¥{totalPrice}</View>
      <View className='footerdic-discounts'>
        ｜已优惠¥
        {discountsPrice}
      </View>
      <View className='footerdic-submit' onClick={onPay}>
        去支付
      </View>
    </View>
  )
}

export default FooterDic
