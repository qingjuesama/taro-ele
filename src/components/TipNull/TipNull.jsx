// 未选择地址
import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image, Button } from '@tarojs/components'

import './TipNull.scss'

const AddressNull = ({
  img,
  title,
  contentText,
  buttonText,
  onButtonClick,
}) => {
  return (
    <View className='addressnull'>
      <Image className='image' mode='widthFix' src={img} />
      <View className='addressnull-text'>{title}</View>
      <View className='content-text'>{contentText}</View>
      <View className='addressnull-button' onClick={onButtonClick}>
        <Button className='my-button'>
          {buttonText}
        </Button>
      </View>
    </View>
  )
}

AddressNull.defaultProps = {
  img: '',
  title: '',
  contentText: '',
  buttonText: '',
  onButtonClick: () => {},
}

export default AddressNull
