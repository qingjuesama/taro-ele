// 商家卡片展示
import Taro from '@tarojs/taro'
import React, { useState, useCallback, useMemo } from 'react'
import { View, Image, Text } from '@tarojs/components'
import classnames from 'classnames'
import imgUrl from '@/src/utils/imgUrl'
import distance from '@/src/utils/distance'
import './Shop.scss'

const Shop = ({ restaurant }) => {
  const [isHide, setIsHide] = useState(false)

  // 显示/隐藏 活动
  const activityFlag = useCallback(
    index => {
      if (index > 1) {
        if (isHide) {
          return false
        } else {
          return true
        }
      }
    },
    [isHide]
  )

  // 显示/隐藏 保 票等
  const supportsFlag = useCallback(() => {
    if (isHide) {
      return false
    } else {
      return true
    }
  }, [isHide])

  // 展开活动查看更多
  const handleUnfold = () => {
    setIsHide(data => !data)
  }

  // 计算评分⭐⭐
  const countGrade = useMemo(() => {
    return (restaurant.rating / 5) * 100 + '%'
  }, [restaurant])

  // 跳转商家详情
  const goShop = () => {
    Taro.navigateTo({ url: '/pages/myshop/index' })
  }

  return (
    <View className='shop' onClick={goShop}>
      <View className='shop-left'>
        <Image src={imgUrl(restaurant.image_path)} className='shop-left-img' />
      </View>
      <View className='shop-right'>
        <View className='shop-content'>
          <View className='shop-content-name'>
            {restaurant.is_premium && (
              <View className='shop-content-premium'>品牌</View>
            )}
            <View className='shop-content-title'>{restaurant.name}</View>
          </View>

          <View className='shop-pingfen'>
            <View className='shop-xsqk'>
              <View className='shop-grade'>
                <View className='xx1' style={{ width: countGrade }}></View>
                <View className='xx2'></View>
              </View>
              <View className='shop-onsale'>
                月售{restaurant.recent_order_num}单
              </View>
            </View>
            {restaurant.is_premium && <View className='peisong'>蜂鸟专送</View>}
          </View>

          <View className='shop-tips'>
            <View>
              <Text className='shop-tips-title'>
                ￥{restaurant.piecewise_agent_fee.rules[0].price}起送
              </Text>
              <Text className='xian'>|</Text>
              <Text className='shop-tips-title'>
                {restaurant.piecewise_agent_fee.description}
              </Text>
            </View>
            <View>
              <Text className='shop-tips-title'>
                {distance(restaurant.distance)}
              </Text>
              <Text className='xian'>|</Text>
              <Text className='shop-tips-title'>
                {restaurant.order_lead_time}分钟
              </Text>
            </View>
          </View>
        </View>

        <View className='shop-label'>
          {restaurant.flavors.map(flavor => (
            <View key={flavor.id} className='shop-label-item'>
              {flavor.name}
            </View>
          ))}
        </View>

        <View className='shop-activity'>
          <View className='shop-activity-left'>
            {restaurant.activities.map((activitie, index) => {
              return (
                <View
                  className={classnames('shop-activity-item', {
                    'ele-hide': activityFlag(index),
                  })}
                  key={activitie.id}
                >
                  <Text
                    className='shop-activity-item-icon'
                    style={{ background: `#${activitie.icon_color}` }}
                  >
                    {activitie.icon_name}
                  </Text>
                  <View className='shop-activity-item-title'>
                    {activitie.description}
                  </View>
                </View>
              )
            })}
            {restaurant.supports.map((support, index) => {
              return (
                <View
                  className={classnames('shop-activity-item', {
                    'ele-hide': supportsFlag(index),
                  })}
                  key={support.id}
                >
                  <Text
                    className='shop-activity-item-icon'
                    style={{ background: `#${support.icon_color}` }}
                  >
                    {support.icon_name}
                  </Text>
                  <View className='shop-activity-item-title'>
                    {support.description}
                  </View>
                </View>
              )
            })}
          </View>
          <View className='shop-activity-right' onClick={handleUnfold}>
            <View className='shop-activity-right-main'>
              <View className='shop-activity-right-title'>
                {restaurant.activities.length + restaurant.supports.length}
                个活动
              </View>
              <Text
                className={classnames('icon shop-activity-right-icon', {
                  'icon-xiajiantou': !isHide,
                  'icon-shangjiantou': isHide,
                })}
              ></Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Shop
