import React, { FC, useMemo } from 'react'
import { View, Text } from '@tarojs/components'

import './CartAddress.scss'

interface CartAddressProps {
  useAddress
  onSelectAddress
}

const CartAddress: FC<CartAddressProps> = (props) => {
  const { useAddress, onSelectAddress } = props
  // 收货地址
  const addressText = useMemo(() => {
    if (useAddress.id) {
      return useAddress.address
    } else {
      return '请选择地址'
    }
  }, [useAddress])

  // 性别
  const getSex = useMemo(() => {
    const { sex } = useAddress
    switch (sex) {
      case 0:
        return '先生'
      case 1:
        return '女士'
      default:
        return null
    }
  }, [useAddress])

  return (
    <View className='cartaddress'>
      <View className='title'>订单配送至</View>

      <View className='useinfo'>
        <View className='useinfo-title' onClick={onSelectAddress}>
          <View className='useinfo-title-text'>{addressText}</View>
          <Text className='icon icon-jiantou1' />
        </View>
        <View className='useinfo-name'>
          {useAddress.name}
          {getSex ? `(${getSex})` : null}
          {useAddress.phone}
        </View>
      </View>
    </View>
  )
}

CartAddress.defaultProps = {
  useAddress: {},
}

export default CartAddress
