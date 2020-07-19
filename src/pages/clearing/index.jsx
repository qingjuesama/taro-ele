import Taro from '@tarojs/taro'
import React, { useMemo, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import NavBar from '@/src/components/NavBar/NavBar'
import { reqPay } from '@/src/api'
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
  const pay = useCallback(async () => {
    if (currentAddress.id) {
      const body = {
        ...cartInfo,
        shopName: shopInfo.name,
        imagePath: shopInfo.image_path,
        delivery: shopInfo.delivery_mode.text,
        address: currentAddress,
      }
      setPayLoading(true)
      const result = await reqPay(body)
      if (result.code === 0) {
        setPayLoading(false)
        Taro.showToast({
          title: '支付成功',
          icon: 'loading',
          duration: 1500,
          success() {
            setTimeout(() => {
              Taro.reLaunch({ url: '/pages/order/index' })
            }, 1500)
          },
        })
      }
    } else {
      Taro.showToast({ title: '请选择收货地址', icon: 'none', duration: 1500 })
    }
  }, [cartInfo, shopInfo, currentAddress])

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
        payLoading={payLoading}
      />
    </View>
  )
}

export default Clearing
