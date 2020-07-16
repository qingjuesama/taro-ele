import Taro, { useReady, getCurrentInstance, useRouter } from '@tarojs/taro'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import NavBar from '@/src/components/NavBar/NavBar'
import CartAddress from './components/CartAddress/CartAddress'
import Distribution from './components/Distribution/Distribution'
import CartInfo from './components/CartInfo/CartInfo'
import FooterDic from './components/FooterDic/FooterDic'

import './index.scss'

const Clearing = () => {
  const { currentAddress } = useSelector(state => state)
  const { cartInfo, shopInfo } = Taro.getStorageSync('clearing')
  const shopName = shopInfo.name
  const [payLoading, setPayLoading] = useState(false)

  // 选择地址
  const selectAddress = () => {
    Taro.navigateTo({ url: '/pages/profile/pages/address/index?clearing=true' })
  }

  // 总价
  const totalPrice = useMemo(() => {
    return cartInfo.totalPrice + cartInfo.goodTotal + cartInfo.boxPrice
  }, [cartInfo])

  // 优惠价格
  const discountsPrice = useMemo(() => {
    return cartInfo.originalPrice - cartInfo.totalPrice
  }, [cartInfo])

  // 去支付
  const pay = () => {}

  console.log(useRouter())
  // useReady(() => {})

  return (
    <View className='clearing'>
      <NavBar title='结算' />
      <CartAddress
        useAddress={currentAddress}
        onSelectAddress={selectAddress}
      />
      <Distribution />
      <CartInfo cartInfo={cartInfo} shopName={shopName} />
      <FooterDic
        totalPrice={totalPrice}
        discountsPrice={discountsPrice}
        onPay={pay}
      />
    </View>
  )
}

export default Clearing
