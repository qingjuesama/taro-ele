import React from 'react'
import { View } from '@tarojs/components'

import './ShopButton.scss'

const ShopButton = ({ onUpdateCart, good, count }) => {
  return (
    <View className='shopbutton'>
      {count > 0 && (
        <>
          <View
            className='shopbutton-rec'
            onClick={() => onUpdateCart(good, 'dec')}
          >
            <View className='icon icon-jianshao'></View>
          </View>
          <View className='shopbutton-num'>{count}</View>
        </>
      )}
      <View
        className='shopbutton-add'
        onClick={() => onUpdateCart(good, 'add')}
      >
        <View className='icon icon-zengjia'></View>
      </View>
    </View>
  )
}

ShopButton.defaultProps = {
  count: 0,
}

export default ShopButton
