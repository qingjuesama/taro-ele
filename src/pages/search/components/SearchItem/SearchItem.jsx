import Taro from '@tarojs/taro'
import React, { useMemo, memo } from 'react'
import { View, Image, Text, RichText } from '@tarojs/components'
import imgUrl from '@/src/utils/imgUrl'

import './SearchItem.scss'

const SearchItem = ({ restaurant, keyword }) => {
  const shopName = useMemo(() => {
    return restaurant.name.replace(
      keyword,
      `<span class='searchitem-bold'>${keyword}</span>`
    )
  }, [restaurant, keyword])

  const goShop = () => {
    Taro.navigateTo({ url: '/pages/myshop/index' })
  }

  return (
    <View className='searchitem' onClick={goShop}>
      <View className='searchitem-left'>
        <Image className='searchitem-img' src={imgUrl(restaurant.image_path)} />
      </View>
      <View className='searchitem-right'>
        <View className='searchitem-content'>
          <View className='searchitem-head'>
            <RichText className='title' nodes={shopName} />
            <Text
              className='tag'
              style={{ backgroundColor: `#${restaurant.tags[0].name_color}` }}
            >
              {restaurant.tags[0].name}
            </Text>
          </View>
          <View className='searchitem-bus'>
            接受预定,{restaurant.next_business_time}开始配送
          </View>
        </View>
        <View className='searchitem-rating'>评价 {restaurant.rating}</View>
      </View>
    </View>
  )
}

export default memo(SearchItem)
