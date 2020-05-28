// 当前地址
import React from 'react'
import { View, Text } from '@tarojs/components'

import './SelectAddressAtAddress.scss'

const SelectAddressAtAddress = ({ onLocationCity, atAddress }) => {
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
SelectAddressAtAddress.defaultProps = {
  onLocationCity: () => {},
  atAddress: '',
}

export default SelectAddressAtAddress
