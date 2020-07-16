import React from 'react'
import { View, Text } from '@tarojs/components'

import './AddressRow.scss'

const AddressRow = ({
  address,
  onDelAddress,
  onEditAddress,
  selectFlag,
  currentAddress,
  onSelectUserAddress,
}) => {
  return (
    <View className='addressrow'>
      {selectFlag && currentAddress.id === address.id && (
        <View className='icon icon-success_fill addressrow-icon'></View>
      )}
      <View
        className='addressrow-left'
        onClick={() => onSelectUserAddress(address)}
      >
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
