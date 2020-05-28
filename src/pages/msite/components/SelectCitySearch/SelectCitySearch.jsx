// 搜索城市input
import React from 'react'
import { View, Input, Text } from '@tarojs/components'

import './SelectCitySearch.scss'

const SelectCitySearch = ({ cityValue, onInput }) => {
  return (
    <View className='selectcity-search'>
      <View className='selectcity-search-main'>
        <View className='selectcity-search-icon'>
          <Text className='icon icon-sousuo'></Text>
        </View>
        <View className='selectcity-search-input'>
          <Input
            placeholder='输入城市名或拼音'
            className='selectcity-search-input-content'
            value={cityValue}
            onInput={onInput}
          />
        </View>
      </View>
    </View>
  )
}
SelectCitySearch.defaultProps = {
  cityValue: '',
  onInput: () => {},
}

export default SelectCitySearch
