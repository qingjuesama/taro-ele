import React from 'react'
import classnames from 'classnames'
import { View, Text, Image } from '@tarojs/components'
import './Row.scss'

const Row = ({
  title,
  leftText,
  rightText,
  rightTextColor,
  renderIcon,
  imageUrl,
  border,
  onRowClick,
  rightIcon,
}) => {
  return (
    <View className='row'>
      {title && <View className='row-title'>{title}</View>}
      <View
        className={classnames('row-head', {
          border,
        })}
        onClick={onRowClick}
      >
        {renderIcon}
        <View className='left-text'>{leftText}</View>
        <View className='center-info' style={{ color: rightTextColor }}>
          {imageUrl && <Image src={imageUrl} className='row-image' />}
          {rightText}
        </View>
        {rightIcon && <Text className='icon icon-jiantou1'></Text>}
      </View>
    </View>
  )
}

export default Row
