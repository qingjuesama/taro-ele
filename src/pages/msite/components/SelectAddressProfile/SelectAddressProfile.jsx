import React from 'react'
import { View } from '@tarojs/components'

import './SelectAddressProfile.scss'

const SelectAddressProfile = ({ userAddressList, onClick }) => {
  return (
    <View className='profile'>
      <View className='profile-title'>收货地址</View>
      <View className='profile-main'>
        {userAddressList.map(item => {
          return (
            <View
              className='profile-item'
              key={item.id}
              onClick={() => onClick(item)}
            >
              <View className='item-top'>
                <View className='ming'>{item.name}</View>
                <View className='sex'>{item.sex === '1' ? '男' : '女'}</View>
                <View className='iphone'>{item.phone}</View>
              </View>
              <View className='item-address'>{item.address_detail}</View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
SelectAddressProfile.defaultProps = {}

export default SelectAddressProfile
