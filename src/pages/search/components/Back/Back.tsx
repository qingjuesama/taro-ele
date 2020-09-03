import React, { memo, FC } from 'react'
import { View } from '@tarojs/components'
import ELoading from '../../../../components/ELoading/ELoading'

import './Back.scss'

interface BackProps {
  title: string
  clear?: boolean
  dataList: any[]
  onTypeaHead: (value: any) => void
  onClearHistory?: () => void
}
const Back: FC<BackProps> = (props) => {
  const { title, clear, dataList, onTypeaHead, onClearHistory } = props

  if (!dataList.length) {
    return <ELoading height={300} />
  }

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

export default memo(Back)
