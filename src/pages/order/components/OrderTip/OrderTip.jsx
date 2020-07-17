import Taro from '@tarojs/taro'
import React, { useMemo } from 'react'
import { View, Image } from '@tarojs/components'

import './OrderTip.scss'

const OrderTip = ({ isLogin, orderDatas }) => {
  const goLogin = () => {
    Taro.redirectTo({ url: '/pages/login/index' })
  }

  const scrimg = useMemo(() => {
    if (!isLogin) {
      return '//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png'
    }
    return '//fuss10.elemecdn.com/8/c8/bbe5984003cb26fc7b445a4a15195png.png'
  }, [isLogin])

  return (
    <View className='order-tip'>
      <Image className='order-tip-img' src={scrimg} />
      {!isLogin && (
        <>
          <View className='order-tip-title'>登录后查看外卖订单</View>
          <View className='order-tip-button' onClick={goLogin}>
            立即登录
          </View>
        </>
      )}
      {isLogin && !orderDatas.length && (
        <View className='order-tip-title'>你还没有订餐哦</View>
      )}
    </View>
  )
}

export default OrderTip

//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png
//fuss10.elemecdn.com/8/c8/bbe5984003cb26fc7b445a4a15195png.png
