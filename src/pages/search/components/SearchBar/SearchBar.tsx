import React, { FC } from 'react'
import { View, Input } from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'
import { BaseEventOrig } from '@tarojs/components/types/common'

import './SearchBar.scss'

interface SearcBarProps {
  onSearch: (keyword: string) => void
  onInput: (e: BaseEventOrig<InputProps.inputEventDetail>) => void
  keyword: string
  onClearKeyWord: () => void
}
const SearchBar: FC<SearcBarProps> = (props) => {
  const { onSearch, onInput, keyword, onClearKeyWord } = props
  return (
    <View className='mysearch'>
      <View className='icon icon-sousuo zoom'></View>
      <Input
        className='mysearch-input'
        placeholder='输入商家、商品名称'
        value={keyword}
        onInput={(e) => onInput(e)}
      />
      {keyword && (
        <View className='icon icon-close clear' onClick={onClearKeyWord}></View>
      )}
      <View className='mysearch-text' onClick={() => onSearch(keyword)}>
        搜索
      </View>
    </View>
  )
}

export default SearchBar
