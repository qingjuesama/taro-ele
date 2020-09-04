import React, { FC, Fragment } from 'react'
import { View } from '@tarojs/components'

import './ShopButton.scss'

interface ShopButtonProps {
  onUpdateCart
  good
  count
}

const ShopButton: FC<ShopButtonProps> = (props) => {
  const { onUpdateCart, good, count } = props
  return (
    <View className='shopbutton'>
      {count > 0 && (
        <Fragment>
          <View
            className='shopbutton-rec'
            onClick={() => onUpdateCart(good, 'dec')}
          >
            <View className='icon icon-jianshao'></View>
          </View>
          <View>
            <View className='shopbutton-num'>{count}</View>
          </View>
        </Fragment>
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
