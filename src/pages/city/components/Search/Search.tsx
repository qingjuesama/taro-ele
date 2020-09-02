// 搜索城市input
import React, { FC } from 'react'
import { View, Input, Text } from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'
import { BaseEventOrig } from '@tarojs/components/types/common'
import './Search.scss'

interface SearchProps {
  cityValue: string
  onInput: (e: BaseEventOrig<InputProps.inputEventDetail>) => void
}

const Search: FC<SearchProps> = (props) => {
  const { cityValue, onInput } = props
  
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

export default Search
