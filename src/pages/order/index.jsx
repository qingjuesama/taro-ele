// 订单
import Taro from '@tarojs/taro'
import React, { useState, useEffect, useMemo } from 'react'
import { View } from '@tarojs/components'
import { Transition } from 'react-spring/renderprops'
import { getOrder } from '@/src/api'
import FooterBar from '@/src/components/FooterBar/FooterBar'
import Ordercard from './components/Ordercard/Ordercard'
import OrderTip from './components/OrderTip/OrderTip'

import './index.scss'

const Order = () => {
  // 订单数据
  const [orderDatas, setOrderDatas] = useState([])
  // 是否登录
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    getOrder().then(res => {
      if (res.code === 0) {
        setOrderDatas(res.data)
        setIsLogin(true)
      }
    })
  }, [])

  const isTip = useMemo(() => {
    return !orderDatas.length || !isLogin
  }, [orderDatas, isLogin])

  // 跳转订单详情
  const goOrderDetail = data => {
    Taro.navigateTo({ url: `/pages/order/detail/index?id=${data.orderNum}` })
  }

  return (
    <View className='order'>
      <View className='order-main'>
        <View className='order-cards'>
          {orderDatas.map((orderData, i) => (
            <Ordercard
              key={'order' + i}
              orderData={orderData}
              onLink={goOrderDetail}
            />
          ))}
        </View>
        {isTip && <OrderTip isLogin={isLogin} orderDatas={orderDatas} />}
        <FooterBar />
      </View>
    </View>
  )
}
export default Order
