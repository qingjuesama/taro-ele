import React from 'react'
import { View } from '@tarojs/components'

import './SelectAddressProfile.scss'

const SelectAddressProfile = () => {
  return (
    <View className='profile'>
      <View className='profile-title'>收货地址</View>
      <View className='profile-main'>
        <View className='profile-item'>
          <View className='item-top'>
            <View className='ming'>任仲帅</View>
            <View className='sex'>先生</View>
            <View className='iphone'>18500255303</View>
          </View>
          <View className='item-address'>世茂维拉10号楼</View>
        </View>
        <View className='profile-item'>
          <View className='item-top'>
            <View className='ming'>任仲帅</View>
            <View className='sex'>先生</View>
            <View className='iphone'>18500255303</View>
          </View>
          <View className='item-address'>世茂维拉10号楼</View>
        </View>
        <View className='profile-item'>
          <View className='item-top'>
            <View className='ming'>任仲帅</View>
            <View className='sex'>先生</View>
            <View className='iphone'>18500255303</View>
          </View>
          <View className='item-address'>世茂维拉10号楼</View>
        </View>
      </View>
    </View>
  )
}
SelectAddressProfile.defaultProps = {}

export default SelectAddressProfile
