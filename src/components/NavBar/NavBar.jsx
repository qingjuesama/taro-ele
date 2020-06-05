import Taro from '@tarojs/taro'
import React, { memo } from 'react'
import { View, Text } from '@tarojs/components'
import './NavBar.scss'

const NavBar = ({ onClose, title, renderRight }) => {
  return (
    <View className='navbar'>
      <View className='navbar-icon' onClick={() => onClose(false)}>
        <Text className='icon icon-fanhui'></Text>
      </View>
      <View className='title'>{title}</View>
      {renderRight}
    </View>
  )
}
NavBar.defaultProps = {
  onClose: () => {
    Taro.navigateBack({ delta: 1 })
  },
  title: '',
  renderRgiht: null,
}
export default memo(NavBar)
