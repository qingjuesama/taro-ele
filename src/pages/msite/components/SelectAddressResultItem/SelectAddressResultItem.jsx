import React from 'react'
import { View } from '@tarojs/components'

import './SelectAddressResultItem.scss'

const SelectAddressResultItem = ({ onSaveAddress, detail }) => {
  return (
    <View className='search-result-item' onClick={() => onSaveAddress(detail)}>
      <View className='search-result-item-top'>
        <View className='search-result-top-name'>{detail.name}</View>
        <View className='search-result-item-top-distance'>
          {detail.distance}
        </View>
      </View>
      <View className='search-result-item-address'>{detail.address}</View>
    </View>
  )
}
SelectAddressResultItem.defaultProps = {
  onSaveAddress: () => {},
  detail: {},
}

export default SelectAddressResultItem
