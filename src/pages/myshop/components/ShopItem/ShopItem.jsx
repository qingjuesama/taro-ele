import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import imgUrl from '@/src/utils/imgUrl'
import ShopButton from '@/src/components/ShopButton/ShopButton'

import './ShopItem.scss'

const ShopItem = ({ food }) => {
  return (
    <View className='shopitem'>
      {/* {console.log(food)} */}
      <View className='shopitem-left'>
        <Image className='shopitem-left-img' src={imgUrl(food.image_path)} />
      </View>
      <View className='shopitem-right'>
        <View className='shopitem-title'>{food.name}</View>
        <View className='shopitem-intro'>{food.materials}</View>
        <View className='shopitem-pingfen'>
          月售{food.month_sales}份 好评率{food.satisfy_rate}%
        </View>
        <View className='shopitem-num'>
          <View className='shopitem-num-price'>
            <Text className='shopitem-num-price-mini'>￥</Text>
            {food.price}
          </View>
          <ShopButton />
        </View>
      </View>
    </View>
  )
}

export default ShopItem
