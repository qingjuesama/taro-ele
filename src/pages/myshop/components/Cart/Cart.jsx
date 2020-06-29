import React from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import classnames from 'classnames'
import ShopButton from '@/src/components/ShopButton/ShopButton'

import './Cart.scss'

const Cart = () => {
  return (
    <View className='cart'>
      <View className='cart-bar'>
        <View
          className={classnames('cart-icon', {
            'cart-icon-active': true,
          })}
        >
          <View className='car-close'>12</View>
        </View>
        <View className='cart-total'>
          {/* <View className='cart-total-title'>未选购商品</View> */}
          <View className='cart-total-price'>
            ¥99.9 <Text className='cart-total-yh'>¥19</Text>
          </View>
          <View className='cart-total-psfei'>另需配送费2元</View>
        </View>
        <View className='cart-tip'>请选必选品</View>
        {/* <View className='cart-result'>结算</View> */}
      </View>
      <View className='cart-shops'>
        <View className='cart-shops-tip'>已减34.5元</View>
        <View className='cart-shops-main'>
          <View className='cart-shops-main-topbar'>
            <View className='topbar-left'>已选商品</View>
            <View className='topbar-right'>
              <Text className='icon icon-lajitong'></Text>
              清空
            </View>
          </View>
          <ScrollView scrollY className='cart-shops-main-list'>
            <View className='list-item'>
              <View className='item-title'>
                红烧牛腩套餐饭/份-份
                <View className='item-title-min'>份</View>
              </View>
              <View className='item-prite'>
                <Text className='item-prite-del'>¥169</Text>
                ¥1192.4
              </View>
              <View className='item-prite-button'>
                <ShopButton />
              </View>
            </View>
            <View className='cart-shops-main-canhefei'>
              <View className='canhe'>餐盒</View>
              <View className='canhe-price'>9</View>
              <View className='canhe-null'></View>
            </View>
          </ScrollView>
        </View>
      </View>
      <View className='cart-bg'></View>
    </View>
  )
}

export default Cart
