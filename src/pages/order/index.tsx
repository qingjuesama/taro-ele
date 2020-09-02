// 订单
import Taro from '@tarojs/taro'
import React, { FC, useState, useEffect, useCallback } from 'react'
import { View } from '@tarojs/components'
import API from '../../api'

import FooterNav from '../../components/FooterNav/FooterNav'
import NoDataTip, { NoDataTipProps } from '../../components/NoDataTip/NoDataTip'
import EIsLoading from '../../components/ELoading/ELoading'
import Ordercard from './components/Ordercard/Ordercard'

import './index.scss'

const noLogin = {
  img: '//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png',
  title: '登录后查看外卖订单',
  btnContent: '立即登录',
  onButtonClick: () => {
    Taro.reLaunch({ url: '/pages/login/index' })
  },
}
const noOrder = {
  img: '//fuss10.elemecdn.com/8/c8/bbe5984003cb26fc7b445a4a15195png.png',
  title: '你还没有订餐哦',
}

const Order: FC = () => {
  // 订单数据
  const [orderDatas, setOrderDatas] = useState([])
  // 未登录/无订单内容提示
  const [noData, setNoData] = useState({} as NoDataTipProps)
  // 数据加载状态
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    API.getOrder().then(({ err, res }) => {
      if (err) {
        setNoData(noLogin)
        setLoading(false)
        return
      }
      if (res.code === 0) {
        setOrderDatas(res.data)
        if (res.data.length === 0) {
          setNoData(noOrder)
        }
        setLoading(false)
      }
    })
  }, [])

  // 跳转订单详情
  const goOrderDetail = useCallback((data) => {
    Taro.navigateTo({ url: `/pages/order/detail/index?id=${data.orderNum}` })
  }, [])

  return (
    <View className='order'>
      <View className='order-main'>
        {loading && <EIsLoading height='100vh' />}
        <View className='order-cards'>
          {orderDatas.map((orderData, i) => (
            <Ordercard
              key={'order' + i}
              orderData={orderData}
              onLink={goOrderDetail}
            />
          ))}
        </View>
        {noData.img && <NoDataTip {...noData} />}
        <FooterNav />
      </View>
    </View>
  )
}
export default Order
