import Taro from '@tarojs/taro'
import React, { FC, useEffect, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import Card from '../../../../components/Card/Card'
import imgUrl from '../../../../utils/imgUrl'
import API from '../../../../api'

import './ShopInfo.scss'

interface ShopInfoProps {
  shopInfo
}

const ShopInfo: FC<ShopInfoProps> = (props) => {
  const { shopInfo } = props

  const [brandStory, setBrandStory] = useState({})

  // 获取品牌故事数据
  useEffect(() => {
    API.reqBrandStory().then(({ err, res }) => {
      if (err) {
        console.log(err)
        return
      }

      if (res.code === 0) {
        setBrandStory(res.data)
      }
    })
  }, [])

  // 拨号联系商家
  const openTel = (phone) => {
    Taro.makePhoneCall({
      phoneNumber: phone,
    })
  }

  if (!brandStory.header_image) {
    return null
  }
  return (
    <View className='shopinfo'>
      <Card>
        <Image className='peisong-img' src={imgUrl(brandStory.header_image)} />
        <View className='peisong-content'>
          <View className='peisong-title'>{brandStory.title}</View>
          <View className='peisong-info'>
            {brandStory.brand_intros[0].brief}
          </View>
        </View>
      </Card>
      <Card title='配送信息'>
        <View className='shopinfo-bgcolor'>
          由{shopInfo.delivery_mode.text}提供配送，约{shopInfo.order_lead_time}
          分钟送达，距离{shopInfo.distance_text}
          {shopInfo.piecewise_agent_fee.description}
        </View>
      </Card>
      <Card title='商家服务'>
        <View className='shopinfo-bgcolor'>
          {shopInfo.supports.map((support) => {
            return (
              <View key={support.id} className='serve'>
                <View
                  style={{
                    border: `1px #${support.icon_color} solid`,
                    color: `#${support.icon_color}`,
                  }}
                  className='icon-name'
                >
                  {support.icon_name}
                </View>
                <View className='serve-descripton'>{support.description}</View>
              </View>
            )
          })}
        </View>
      </Card>
      <Card title='商家实景'>
        <View className='scene'>
          {shopInfo.albums.map((album, i) => {
            return (
              <View className='scene-item' key={album.name + i}>
                <Image
                  className='scene-img'
                  src={imgUrl(album.cover_image_hash)}
                />
                <View className='scene-name'>{album.name}</View>
              </View>
            )
          })}
        </View>
      </Card>
      <Card title='商家信息'>
        <View className='description'>{shopInfo.description}</View>
        <View className='info'>
          <View className='info-left'>品类</View>
          <View className='info-right'>
            {shopInfo.flavors.map((flavor) => {
              return flavor.name + ' '
            })}
          </View>
        </View>
        <View className='info'>
          <View className='info-left'>商家电话</View>
          <View
            className='info-right tel'
            onClick={() => openTel(shopInfo.phone)}
          >
            <Text className='icon icon-shouji'></Text>联系商家
          </View>
        </View>
        <View className='info'>
          <View className='info-left'>地址</View>
          <View className='info-right'>{shopInfo.address}</View>
        </View>
        <View className='info'>
          <View className='info-left'>营业时间</View>
          <View className='info-right'>{shopInfo.opening_hours[0]}</View>
        </View>
      </Card>
      <Card>
        <View className='qualification'>营业资质</View>
      </Card>
    </View>
  )
}

export default ShopInfo
