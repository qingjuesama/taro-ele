import React, { FC } from 'react'
import { View } from '@tarojs/components'

import './FooterDic.scss'

interface FooterDicProps {
  totalPrice
  discountsPrice
  onPay
  payLoading
}

const FooterDic: FC<FooterDicProps> = (props) => {
  const { totalPrice, discountsPrice, onPay, payLoading } = props
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
