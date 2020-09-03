import React, { FC } from 'react'
import { View } from '@tarojs/components'
import { Address } from '../../../../api/interface'

import './ResultItem.scss'

interface ResultItemProps {
  onSaveAddress: (detail: Address) => void
  detail: any
}

const ResultItem: FC<ResultItemProps> = (props) => {
  const { onSaveAddress, detail } = props

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

export default ResultItem
