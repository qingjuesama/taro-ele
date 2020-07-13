import React from 'react'
import { View, Input } from '@tarojs/components'

import './SearchBar.scss'

const SearchBar = ({ onSearch, input, keyword, onClearKeyWord }) => {
  return (
    <View className='mysearch'>
      <View className='icon icon-sousuo zoom'></View>
      <Input
        className='mysearch-input'
        placeholder='输入商家、商品名称'
        value={keyword}
        onInput={e => input(e)}
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
