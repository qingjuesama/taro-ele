import React, { FC, useState, useMemo, useCallback } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import classnames from 'classnames'
import ShopButton from '../../../../components/ShopButton/ShopButton'

import './Cart.scss'

interface CartProps {
  cartInfo
  count
  shopInfo
  onUpdateCart
  onClearCart
  onSettleAccounts
}
const Cart: FC<CartProps> = (props) => {
  const {
    cartInfo,
    count,
    shopInfo,
    onUpdateCart,
    onClearCart,
    onSettleAccounts,
  } = props
  const {
    boxPrice,
    goodTotal,
    totalPrice,
    originalPrice,
    isInterval,
    isActiveInterval,
    foods,
  } = cartInfo
  const [isHide, setIsHide] = useState(true)

  // 是否满足结算
  const isResult = useMemo(() => {
    if (isInterval) {
      if (Number(shopInfo.float_minimum_order_amount === 0)) {
        return (
          totalPrice > shopInfo.float_minimum_order_amount &&
          isInterval &&
          isActiveInterval
        )
      } else {
        return (
          totalPrice >= shopInfo.float_minimum_order_amount &&
          isInterval &&
          isActiveInterval
        )
      }
    } else if (Number(shopInfo.float_minimum_order_amount === 0)) {
      return totalPrice > shopInfo.float_minimum_order_amount
    } else {
      return totalPrice >= shopInfo.float_minimum_order_amount
    }
  }, [totalPrice, shopInfo, isActiveInterval, isInterval])

  // 是否满足起送价格
  const isMiniPrice = useMemo(() => {
    return totalPrice > shopInfo.float_minimum_order_amount
  }, [totalPrice, shopInfo])

  // 打开/关闭购物车
  const openCart = useCallback(() => {
    if (goodTotal || !isHide) {
      setIsHide((flag) => !flag)
    }
  }, [goodTotal, isHide])

  // 清空购物车
  const clearCart = () => {
    onClearCart()
    setIsHide(false)
  }

  return (
    <View className='cart'>
      <View className='cart-bar'>
        <View
          className={classnames('cart-icon', {
            'cart-icon-active': goodTotal,
          })}
          onClick={openCart}
        >
          {goodTotal > 0 && <View className='car-close'>{goodTotal}</View>}
        </View>

        <View className='cart-total'>
          {totalPrice > 0 ? (
            <View className='cart-total-price'>
              ¥{totalPrice}
              <Text className='cart-total-yh'>¥{originalPrice}</Text>
            </View>
          ) : (
            <View className='cart-total-title'>未选购商品</View>
          )}

          <View className='cart-total-psfei'>
            另需配送费{shopInfo.float_delivery_fee}元
          </View>
        </View>

        {isResult ? (
          <View className='cart-result' onClick={onSettleAccounts}>
            结算
          </View>
        ) : (
          <View className='cart-tip'>
            {isInterval && !isActiveInterval && <Text>请选必选品</Text>}
            {!isMiniPrice && (
              <Text>{shopInfo.float_minimum_order_amount}元起送</Text>
            )}
          </View>
        )}
      </View>
      <View
        className={classnames('cart-shops', {
          'ele-hide': isHide,
        })}
      >
        {originalPrice - totalPrice > 0 && (
          <View className='cart-shops-tip'>
            已减{(originalPrice * 1000 - totalPrice * 1000) / 1000}元
          </View>
        )}
        <View className='cart-shops-main'>
          <View className='cart-shops-main-topbar'>
            <View className='topbar-left'>已选商品</View>
            <View className='topbar-right' onClick={clearCart}>
              <Text className='icon icon-lajitong'></Text>
              清空
            </View>
          </View>
          <ScrollView scrollY className='cart-shops-main-list'>
            {foods.map((food, index) => {
              return (
                <View className='list-item' key={food.vfood_id + index}>
                  <View className='item-title'>
                    {food.name}
                    {food.specfoods[0].specs.length > 0 && (
                      <View className='item-title-min'>
                        {food.specfoods[0].specs[0].value}
                      </View>
                    )}
                  </View>
                  <View className='item-prite'>
                    {food.origin_price !== food.price && (
                      <Text className='item-prite-del'>
                        ¥{(food.origin_price * 100 * food.count) / 100}
                      </Text>
                    )}
                    ¥{(food.price * 1000 * food.count) / 1000}
                  </View>
                  <View className='item-prite-button'>
                    <ShopButton
                      good={food}
                      onUpdateCart={onUpdateCart}
                      count={count(food)}
                    />
                  </View>
                </View>
              )
            })}
            {boxPrice > 0 && (
              <View className='cart-shops-main-canhefei'>
                <View className='canhe'>餐盒</View>
                <View className='canhe-price'>{boxPrice}</View>
                <View className='canhe-null'></View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      <View
        className={classnames('cart-bg', {
          'ele-hide': isHide,
        })}
        onClick={openCart}
      ></View>
    </View>
  )
}

export default Cart
