import React, { FC } from 'react'
import { View, Image } from '@tarojs/components'
import classnames from 'classnames'
import EButton from '../EButton/EButton'

import './NoDataTip.scss'

export interface NoDataTipProps {
  img: string
  title: string
  info?: string
  btnContent?: string
  onButtonClick?: () => void
  className?: string
}

const NoDataTip: FC<NoDataTipProps> = (props) => {
  const { img, title, info, btnContent, onButtonClick, className } = props
  const classes = classnames('ele-nodatatipo', className)
  return (
    <View className={classes}>
      <Image src={img} className='ele-nodatatipo-img' mode='widthFix' />
      <View className='ele-nodatatipo-title'>{title}</View>
      {info && <View className='ele-nodatatipo-info'>{info}</View>}
      {btnContent && (
        <EButton btnType='green' onClick={onButtonClick}>
          {btnContent}
        </EButton>
      )}
    </View>
  )
}

export default NoDataTip
