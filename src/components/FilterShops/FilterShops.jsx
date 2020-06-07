import Taro, { Current } from '@tarojs/taro'
import React, { useRef, useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'

import './FilterShops.scss'

const FilterShops = ({ batchFilter, onFilterTop }) => {
  return (
    <View className='filtershops' id='filtershops'>
      <View className='filtershops-head'>
        <View className='filtershops-head-item'>
          <Text className='title active' onClick={onFilterTop}>
            综合排序
          </Text>
          <Text className='icon icon-xiajiantou filtershw4ops-xiajiantou'></Text>
        </View>
        {batchFilter.outside.outside_sort_filter.map(item => {
          return (
            <View className='filtershops-head-item' key={item.value}>
              <Text className='title'>{item.name}</Text>
            </View>
          )
        })}
        <View className='filtershops-head-item'>
          <Text className='title atactive'>筛选</Text>
          <Text className='icon icon-funnel filtershops-funnel atactive'></Text>
        </View>
      </View>

      {/* 排序 */}
      <View className='filtershops-sort'>
        {batchFilter.outside.inside_sort_filter.map(item => {
          return <View key={item.value}>{item.name}</View>
        })}
      </View>
      {/* 筛选 */}
      <View className='filtershops-filter'></View>
    </View>
  )
}

export default FilterShops
