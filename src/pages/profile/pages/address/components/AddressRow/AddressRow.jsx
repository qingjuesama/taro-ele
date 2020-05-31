import React from 'react'
import { View, Text } from '@tarojs/components'

import './AddressRow.scss'

const AddressRow = ({ address, onDelAddress, onEditAddress }) => {
  return (
    <View className='addressrow'>
      <View className='addressrow-left'>
        <View className='myinfo'>
          <View className='myname'>{address.name}</View>
          <View className='mysex'>{address.sex === '1' ? '先生' : '女士'}</View>
          <View className='myphone'>{address.phone}</View>
        </View>
        <View className='myaddress'>
          {address.address + address.address_detail}
        </View>
      </View>
      <View className='addressrow-right'>
        <View
          className='addressrow-right-icon'
          onClick={() => onEditAddress(address)}
        >
          <Text className='icon icon-bianji'></Text>
        </View>
        <View className='addressrow-right-icon'>
          <Text
            className='icon icon-guanbi'
            onClick={() => onDelAddress(address.id)}
          ></Text>
        </View>
      </View>
    </View>
  )
}

export default AddressRow
