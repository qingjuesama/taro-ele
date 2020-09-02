import React, { FC } from 'react'
import { View, Image, Text, ITouchEvent } from '@tarojs/components'
import imgUrl from '../../../../utils/imgUrl'
import { H5 } from '../../../../config/base'

import './Head.scss'

interface HeadProps {
  shopInfo
  onOpenModal: () => void
  onActivityHide: (e: ITouchEvent) => void
  onBack: () => void
}

const Head: FC<HeadProps> = (props) => {
  const { shopInfo, onOpenModal, onActivityHide, onBack } = props

  return (
    <View className='myshop-top'>
      <View
        className='myshop-top-bg'
        style={{
          background: `url(${imgUrl(
            shopInfo.shop_sign.image_hash || shopInfo.image_path
          )})`,
        }}
      >
        {H5 && <View className='icon icon-fanhui' onClick={onBack}></View>}
      </View>
      <View className='myshop-top-main'>
        <View className='myshop-logo'>
          <View className='myshop-logo-pinpai'>品牌</View>
          <Image
            className='myshop-logo-img'
            src={imgUrl(shopInfo.image_path)}
          />
        </View>
        <View className='myshop-name' onClick={onOpenModal}>
          <View className='myshop-name-title'>{shopInfo.name}</View>
          <View className='icon icon-jiantou'></View>
        </View>
        <View className='myshop-pingjia'>
          <Text className='myshop-pingjia-item'>评价{shopInfo.rating}</Text>
          <Text className='myshop-pingjia-item myshop-pingjia-item-c'>
            月售{shopInfo.recent_order_num}单
          </Text>
          <Text className='myshop-pingjia-item'>
            {shopInfo.delivery_mode.text}约{shopInfo.order_lead_time}分钟
          </Text>
        </View>
        {!!shopInfo.activity_tags.length && (
          <View className='myshop-tags' onClick={(e) => onActivityHide(e)}>
            <View className='myshop-tags-left'>
              {shopInfo.activity_tags.map((tag) => {
                return (
                  <Text className='myshop-tags-left-tag' key={tag.text}>
                    {tag.text}
                  </Text>
                )
              })}
            </View>
            <View className='myshop-tags-right'>
              <View className='myshop-tags-right-title'>
                {shopInfo.activities.length}个优惠
              </View>
              <View className='icon icon-xiajiantou'></View>
            </View>
          </View>
        )}
        {shopInfo.promotion_info && (
          <View className='myshop-notice'>
            <Text className='myshop-notice-content'>
              公告：{shopInfo.promotion_info}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default Head
