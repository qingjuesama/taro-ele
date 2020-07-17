import React from 'react'
import { View } from '@tarojs/components'

import './FooterDic.scss'

const FooterDic = ({ totalPrice, discountsPrice, onPay, payLoading }) => {
  return (
    <View className='footerdic'>
      <View className='footerdic-price'>¥{totalPrice}</View>
      <View className='footerdic-discounts'>
        ｜已优惠¥
        {discountsPrice}
      </View>
      <View className='footerdic-submit' onClick={onPay}>
        {payLoading ? '正在支付...' : '去支付'}
      </View>
    </View>
  )
}

export default FooterDic
