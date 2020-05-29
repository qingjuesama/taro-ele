// 选择城市,搜索地址
import React from 'react'
import { View, Input, Text } from '@tarojs/components'
import './SelectAddressSearch.scss'

const SelectAddressSearch = ({
  onOpenCity,
  address,
  searchValue,
  onSearchValue,
  onInitDetail,
}) => {
  return (
    <View className='selectaddress-search'>
      {/* 选择城市 */}
      <View className='search-left' onClick={onOpenCity}>
        <View className='search-left-text'>
          {address.city ? address.city : '选择城市'}
        </View>
        <View className='search-left-icon'>
          <Text className='icon icon-xiajiantou'></Text>
        </View>
      </View>
      <View className='search-right'>
        <View className='search-right-icon'>
          <Text className='icon icon-sousuo'></Text>
        </View>
        <Input
          className='search-right-input'
          placeholder='请输入地址'
          value={searchValue}
          onInput={onSearchValue}
        />
        {searchValue && (
          <View className='search-right-close' onClick={onInitDetail}>
            <Text className='icon icon-close'></Text>
          </View>
        )}
      </View>
    </View>
  )
}
SelectAddressSearch.defaultProps = {
  onOpenCity: () => {},
  address: {},
  searchValue: '',
  onSearchValue: () => {},
  onInitDetail: () => {},
}

export default SelectAddressSearch
