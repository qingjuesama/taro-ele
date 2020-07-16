import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import imgUrl from '@/src/utils/imgUrl'

import './CartInfo.scss'

const CartInfo = ({ cartInfo, shopName }) => {
  return (
    <View className='cartinfo'>
      <View className='cartinfo-title'>{shopName}</View>
      <View className='cartinfo-goods'>
        {cartInfo.foods.map(food => {
          return (
            <View className='cartinfo-food' key={food.item_id}>
              <Image className='cartinfo-img' src={imgUrl(food.image_path)} />
              <View className='cartinfo-name'>{food.name}</View>
              <View className='cartinfo-count'>×{food.count}</View>
              <View className='origin-price'>
                {Number(food.origin_price) !== food.lowest_price
                  ? ' ¥' + food.origin_price * food.count
                  : null}
              </View>
              <View className='lowest_price'>
                ¥{food.count * food.lowest_price}
              </View>
            </View>
          )
        })}
        <View className='sundry'>
          <View className='sundry-title'>包装费</View>
          <View className='sundry-price'>¥{cartInfo.goodTotal}</View>
        </View>
        <View className='sundry'>
          <View className='sundry-title'>配送费</View>
          <View className='sundry-price'>¥{cartInfo.boxPrice}</View>
        </View>
      </View>
      <View className='result'>
        小计¥
        <Text className='result-price'>
          {cartInfo.totalPrice + cartInfo.goodTotal + cartInfo.boxPrice}
        </Text>
      </View>
    </View>
  )
}

export default CartInfo
