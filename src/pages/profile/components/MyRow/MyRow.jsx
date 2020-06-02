import Taro from '@tarojs/taro'
import React, { useMemo, memo } from 'react'
import { View, Image, Text } from '@tarojs/components'

import './MyRow.scss'

const MyRow = ({ imgUrl, addressText, border, onGo }) => {
  const borderisShow = useMemo(() => {
    return border ? '' : 'none'
  }, [border])

  return (
    <View className='myrow' onClick={onGo}>
      <View className='myrow-img'>
        <Image src={imgUrl} className='myrow-imgage' />
      </View>
      <View className='myrow-right' style={{ border: borderisShow }}>
        <View className='myrow-address'>{addressText}</View>
        <View className='myrow-icon'>
          <Text className='icon icon-jiantou1'></Text>
        </View>
      </View>
    </View>
  )
}

MyRow.defaultProps = {
  imgUrl: '',
  addressText: '',
  border: true,
  onGo: () => {
    // 未开发
    Taro.showToast({ title: '暂未开放', icon: 'none' })
  },
}

export default memo(MyRow)
