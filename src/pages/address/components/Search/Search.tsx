// 选择城市,搜索地址
import React, { FC } from 'react'
import { View, Input, Text, Navigator } from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'
import { BaseEventOrig } from '@tarojs/components/types/common'
import { Address } from '../../../../redux/interface'

import './Search.scss'

interface SearchProps {
  cityUrl: string
  currentAddress: Address
  searchValue: string
  onInput: (e: BaseEventOrig<InputProps.inputEventDetail>) => void
  onDelSearch: () => void
}

const Search: FC<SearchProps> = (props) => {
  const { cityUrl, currentAddress, searchValue, onInput, onDelSearch } = props
  return (
    <View className='selectaddress-search'>
      {/* 选择城市 */}
      <Navigator className='search-left' url={cityUrl}>
        <View className='search-left-text'>
          {currentAddress.city ? currentAddress.city : '选择城市'}
        </View>
        <View className='search-left-icon'>
          <Text className='icon icon-xiajiantou'></Text>
        </View>
      </Navigator>
      <View className='search-right'>
        <View className='search-right-icon'>
          <Text className='icon icon-sousuo'></Text>
        </View>
        <Input
          className='search-right-input'
          placeholder='请输入地址'
          value={searchValue}
          onInput={(e) => onInput(e)}
        />
        {searchValue && (
          <View className='search-right-close' onClick={onDelSearch}>
            <Text className='icon icon-close'></Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default Search
