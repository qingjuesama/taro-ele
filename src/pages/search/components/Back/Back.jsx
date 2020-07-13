import React, { memo } from 'react'
import { View } from '@tarojs/components'

import './Back.scss'

const Back = ({ title, clear, dataList, onTypeaHead, onClearHistory }) => {
  return (
    <View className='back'>
      <View className='head'>
        <View className='title'>{title}</View>
        {clear && (
          <View className='icon icon-lajitong' onClick={onClearHistory}></View>
        )}
      </View>
      <View className='tabs'>
        {dataList.map((item, i) => {
          return (
            <View
              className='tab'
              key={'back' + i}
              onClick={() => onTypeaHead(item.word || item)}
            >
              {item.word || item}
            </View>
          )
        })}
      </View>
    </View>
  )
}

Back.defaultProps = {
  title: '',
  clear: false,
  dataList: [],
  onTypeaHead: () => {},
  onClearHistory: () => {},
}

export default memo(Back)
