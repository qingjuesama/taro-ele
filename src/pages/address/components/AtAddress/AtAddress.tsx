// 当前地址
import React, { FC } from 'react'
import { View, Text } from '@tarojs/components'

import './AtAddress.scss'

interface AtAddressProps {
  onLocationCity: () => void
  atAddress: string
}
const AtAddress: FC<AtAddressProps> = (props) => {
  const { onLocationCity, atAddress } = props
  return (
    <View className='ataddress'>
      <View className='ataddress-title'>当前地址</View>
      <View className='ataddress-main'>
        <View className='text'>{atAddress}</View>
        <View className='location' onClick={onLocationCity}>
          <View className='location-icon'>
            <Text className='icon icon-miaozhun'></Text>
          </View>
          <View className='text'>重新定位</View>
        </View>
      </View>
    </View>
  )
}

export default AtAddress
