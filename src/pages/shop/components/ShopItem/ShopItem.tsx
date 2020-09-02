import React, { FC } from 'react'
import { View, Image, Text } from '@tarojs/components'
import imgUrl from '../../../../utils/imgUrl'
import ShopButton from '../../../../components/ShopButton/ShopButton'

import './ShopItem.scss'

interface ShopItemProps {
  onUpdateCart
  food
  count
}

const ShopItem: FC<ShopItemProps> = (props) => {
  const { onUpdateCart, food, count } = props
  return (
    <View className='shopitem'>
      {food.image_path ? (
        <View className='shopitem-left'>
          <Image className='shopitem-left-img' src={imgUrl(food.image_path)} />
        </View>
      ) : null}
      <View className='shopitem-right'>
        <View className='shopitem-title'>{food.name}</View>
        <View className='shopitem-intro'>{food.materials}</View>
        <View className='shopitem-pingfen'>
          月售{food.month_sales}份 好评率{food.satisfy_rate}%
        </View>
        <View className='shopitem-num'>
          <View className='shopitem-num-price'>
            <Text className='shopitem-num-price-left'>{food.price}</Text>
            {food.origin_price !== food.price && (
              <Text className='shopitem-num-price-right'>
                ¥{food.origin_price}
              </Text>
            )}
          </View>
          <ShopButton onUpdateCart={onUpdateCart} good={food} count={count} />
        </View>
      </View>
    </View>
  )
}

export default ShopItem
