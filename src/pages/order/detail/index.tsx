import Taro, { useRouter } from '@tarojs/taro'
import React, { FC, useEffect, useState, useMemo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import dayjs from 'dayjs'
import { H5 } from '../../../config/base'
import API from '../../../api'
import imgUrl from '../../../utils/imgUrl'
import ELoading from '../../../components/ELoading/ELoading'
import NavBar from '../../../components/NavBar/NavBar'
import Card from '../../../components/Card/Card'
import EList from '../../../components/EList'

import './index.scss'

const Detail: FC = () => {
  const router = useRouter()
  const [detailData, setDetailData] = useState({} as any)

  useEffect(() => {
    const { id } = router.params
    API.getOrderDetail({ id }).then(({ err, res }) => {
      if (err) {
        Taro.redirectTo({ url: '/pages/order/index' })
        return
      }
      if (res.code === 0) {
        setDetailData(res.data)
      }
    })
  }, [router])

  // 商品列表
  const foods = useMemo(() => {
    return detailData?.foods
  }, [detailData])

  const address = useMemo(() => {
    return detailData?.address
  }, [detailData])

  // 联系商家
  const shopPhone = () => {
    Taro.makePhoneCall({
      phoneNumber: detailData.shopPhone,
    })
  }

  if (!detailData.orderNum) {
    return <ELoading height='100vh' />
  }

  return (
    <View className='order-detail'>
      {H5 && <NavBar title='订单详情' icon='fanhui' />}
      <View className='order-detail-main'>
        <EList className='order-detail-tip'>
          <View className='order-detail-tip-left'>
            <View className='icon icon-success_fill order-detail-tip-icon'></View>
            <Text className='order-detail-tip-title'>订单已完成</Text>
          </View>
          <View className='order-detail-tip-button'>再来一单</View>
        </EList>

        <EList className='order-detail-item'>
          <View className='order-carts'>
            <View className='order-carts-head'>
              <Image
                className='order-carts-title-img'
                src={imgUrl(detailData.imagePath)}
              />
              <View className='order-carts-title'>{detailData.shopName}</View>
            </View>
            <View className='order-carts-foods'>
              {foods.map((f, index) => {
                return (
                  <View className='order-carts-food' key={'detailfood' + index}>
                    <View className='order-carts-food-name'>{f.name}</View>
                    <View className='order-carts-food-count'>x{f.count}</View>
                    <View className='order-carts-food-totalprice'>
                      ¥{Number(f.price) * f.count}
                    </View>
                  </View>
                )
              })}
              <View className='order-carts-food'>
                <View className='order-carts-food-name'>餐盒费</View>
                <View className='order-carts-food-price'>
                  ¥{detailData.boxPrice}
                </View>
              </View>
              <View className='order-carts-food'>
                <View className='order-carts-food-name'>配送费</View>
                <View className='order-carts-food-price'>
                  ¥{detailData.deliveryPrice}
                </View>
              </View>
            </View>
            <View className='order-carts-totalprice'>
              <View className='order-carts-shopphone' onClick={shopPhone}>
                <Text className='icon icon-shouji' />
                联系商家
              </View>
              <View>
                <Text className='order-carts-totalprice-text'>实付</Text>¥
                {detailData.totalPrice}
              </View>
            </View>
          </View>
        </EList>

        <EList className='order-detail-item'>
          <View className='order-detail-ty-title'>配送信息</View>
          <View className='order-detail-ty-item'>
            <View className='order-detail-ty-tab'>送达时间:</View>
            <View className='order-detail-ty-content'>尽快送达</View>
          </View>
          <View className='order-detail-ty-item'>
            <View className='order-detail-ty-tab'>送货地址:</View>
            <View className='order-detail-ty-content'>
              <View>
                {address.name}
                {address.sex === 0 ? '(先生)' : '(女士)'}
              </View>
              <View className=''>{address.phone}</View>
              <View>{address.address + address.address_detail}</View>
            </View>
          </View>
          <View className='order-detail-ty-item'>
            <View className='order-detail-ty-tab'>配送方式:</View>
            <View className='order-detail-ty-content'>
              {detailData.delivery}
            </View>
          </View>
        </EList>

        <EList className='order-detail-item'>
          <View className='order-detail-ty-title'>订单信息</View>
          <View className='order-detail-ty-item'>
            <View className='order-detail-ty-tab'>订单号:</View>
            <View className='order-detail-ty-content'>
              {detailData.orderNum}
            </View>
          </View>
          <View className='order-detail-ty-item'>
            <View className='order-detail-ty-tab'>支付方式:</View>
            <View className='order-detail-ty-content'>在线支付</View>
          </View>
          <View className='order-detail-ty-item'>
            <View className='order-detail-ty-tab'>下单时间:</View>
            <View className='order-detail-ty-content'>
              {dayjs(detailData.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </View>
          </View>
        </EList>
      </View>
    </View>
  )
}

export default Detail
