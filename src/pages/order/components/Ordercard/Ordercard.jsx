import React, { useMemo } from 'react'
import { View, Image } from '@tarojs/components'
import imgUrl from '@/src/utils/imgUrl'
import dayjs from 'dayjs'

import './Ordercard.scss'

const Ordercard = ({ orderData }) => {
  const goodNames = useMemo(() => {
    const foods = JSON.parse(orderData.foods)
    const lc = foods.length
    let names = ''
    foods.forEach((food, i) => {
      if (i === 0) {
        names += food.name + ','
      } else if (i === 1) {
        names += food.name
      }
    })
    names += `等${lc}件商品`
    return names
  }, [orderData])

  return (
    <View className='ordercard'>
      <View className='ordercard-top'>
        <View className='ordercard-top-left'>
          <Image
            className='ordercard-top-img'
            src={imgUrl(orderData.imagePath)}
          />
        </View>
        <View className='ordercard-top-right'>
          <View className='ordercard-head'>
            <View className='ordercard-head-top'>
              <View className='ordercard-head-top-title'>
                {orderData.shopName}
              </View>
              <View className='ordercard-head-top-tip'>订单完成</View>
            </View>
            <View className='ordercard-head-time'>
              {dayjs(orderData.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </View>
          </View>
          <View className='ordercard-text'>
            <View className='ordercard-text-title'>{goodNames}</View>
            <View className='ordercard-text-price'>
              ¥{orderData.totalPrice}
            </View>
          </View>
        </View>
      </View>
      <View className='ordercard-bottom'>
        <View className='ordercard-bottom-button'>再来一单</View>
      </View>
    </View>
  )
}

export default Ordercard
