// 商家卡片展示
import Taro from '@tarojs/taro'
import React, { FC, useState } from 'react'
import { View, Image, Text, ITouchEvent } from '@tarojs/components'
import classnames from 'classnames'
import imgUrl from '../../utils/imgUrl'
import distance from '../../utils/distance'
import Star from '../Star/Star'

import { IShopRestaurant } from '../../api/interface'
import './ShopItem.scss'

interface ShopItemProps {
  shopdata: IShopRestaurant
}

const ShopItem: FC<ShopItemProps> = (props) => {
  const { shopdata } = props

  //显示/隐藏
  const [isHide, setIsHide] = useState(false)

  // 展开活动查看更多
  const handleUnfold = (e: ITouchEvent) => {
    e.stopPropagation()
    setIsHide(!isHide)
  }

  // 跳转商家详情
  const goShop = () => {
    const { id } = shopdata
    Taro.reLaunch({ url: `/pages/shop/index?id=${id}` })
  }

  return (
    <View className='shop' onClick={goShop}>
      <View className='shop-left'>
        <Image
          src={imgUrl(shopdata.image_path)}
          lazyLoad
          className='shop-left-img'
        />
      </View>
      <View className='shop-right'>
        <View className='shop-content'>
          <View className='shop-content-name'>
            {shopdata.is_premium && (
              <View className='shop-content-premium'>品牌</View>
            )}
            <View className='shop-content-title'>{shopdata.name}</View>
          </View>

          <View className='shop-pingfen'>
            <View className='shop-xsqk'>
              {/* ⭐⭐分数 */}
              <Star rating={shopdata.rating} />
              <View className='shop-onsale'>
                月售{shopdata.recent_order_num}单
              </View>
            </View>
            {shopdata.is_premium && <View className='peisong'>蜂鸟专送</View>}
          </View>

          <View className='shop-tips'>
            <View>
              <Text className='shop-tips-left-title'>
                ¥{shopdata.piecewise_agent_fee.rules[0].price}起送
              </Text>
              <Text className='xian'>|</Text>
              <Text className='shop-tips-left-title'>
                {shopdata.piecewise_agent_fee.description}
              </Text>
            </View>
            <View>
              <Text className='shop-tips-right-title'>
                {distance(shopdata.distance)}
              </Text>
              <Text className='xian'>|</Text>
              <Text className='shop-tips-right-title'>
                {shopdata.order_lead_time}分钟
              </Text>
            </View>
          </View>
        </View>

        <View className='shop-label'>
          {shopdata.flavors.map((flavor) => (
            <View key={flavor.id} className='shop-label-item'>
              {flavor.name}
            </View>
          ))}
        </View>

        <View className='shop-activity'>
          <View className='shop-activity-left'>
            {shopdata.activities.map((activitie, index) => {
              return (
                <View
                  className={classnames('shop-activity-item', {
                    'ele-hide': index > 1 && !isHide,
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
            {shopdata.supports.map((support) => {
              return (
                <View
                  className={classnames('shop-activity-item', {
                    'ele-hide': !isHide,
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
                {shopdata.activities.length + shopdata.supports.length}
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

export default ShopItem
