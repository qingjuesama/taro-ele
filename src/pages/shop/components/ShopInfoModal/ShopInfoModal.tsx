import React, { FC } from 'react'
import classnames from 'classnames'
import { View, Text } from '@tarojs/components'
import distance from '../../../../utils/distance'

import './ShopInfoModal.scss'

interface ShopInfoModalProps {
  shopInfo
  modalHide
  onOpenModal
}

const ShopInfoModal: FC<ShopInfoModalProps> = (props) => {
  const { shopInfo, modalHide, onOpenModal } = props
  return (
    <View
      className={classnames('myshop-modal ', {
        'ele-hide': modalHide,
      })}
    >
      <View className={classnames('myshop-modal-main', {})}>
        <View className='myshop-modal-main-title'>
          <Text className='myshop-modal-main-title-tag'>品牌</Text>
          唐宫海鲜舫（新侨店）
        </View>
        <View className='myshop-modal-main-ul'>
          <View className='myshop-modal-main-ul-li'>
            <View className='myshop-modal-main-ul-li-title'>
              {shopInfo.rating}
            </View>
            <View className='myshop-modal-main-ul-li-tag'>评分</View>
          </View>
          <View className='myshop-modal-main-ul-li'>
            <View className='myshop-modal-main-ul-li-title'>
              {shopInfo.recent_order_num}
            </View>
            <View className='myshop-modal-main-ul-li-tag'>月售</View>
          </View>
          <View className='myshop-modal-main-ul-li'>
            <View className='myshop-modal-main-ul-li-title'>
              {shopInfo.delivery_mode.text}
            </View>
            <View className='myshop-modal-main-ul-li-tag'>
              约{shopInfo.order_lead_time}
            </View>
          </View>
          <View className='myshop-modal-main-ul-li'>
            <View className='myshop-modal-main-ul-li-title'>
              {shopInfo.piecewise_agent_fee.rules[0].fee}元
            </View>
            <View className='myshop-modal-main-ul-li-tag'>配送费</View>
          </View>
          <View className='myshop-modal-main-ul-li'>
            <View className='myshop-modal-main-ul-li-title'>
              {distance(shopInfo.distance)}
            </View>
            <View className='myshop-modal-main-ul-li-tag'>距离</View>
          </View>
        </View>
        <View className='myshop-modal-main-gongao'>
          <View className='myshop-modal-main-gongao-title'>公告</View>
          <View className='myshop-modal-main-gongao-content'>
            {shopInfo.promotion_info}
          </View>
        </View>
      </View>
      <View
        className='icon icon-close myshop-modal-clear'
        onClick={onOpenModal}
      ></View>
      <View className='myshop-modal-bg'></View>
    </View>
  )
}

export default ShopInfoModal
