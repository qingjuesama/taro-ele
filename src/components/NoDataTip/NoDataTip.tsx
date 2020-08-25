import React, { FC } from 'react'
import { View, Image } from '@tarojs/components'

import EButton from '../EButton/EButton'

import './NoDataTip.scss'

interface NoDataTipProps {
  img: string
  title: string
  info?: string
  btnContent: string
  onButtonClick: () => void
}

const NoDataTip: FC<NoDataTipProps> = (props) => {
  const { img, title, info, btnContent, onButtonClick } = props
  return (
    <View className='ele-nodatatipo'>
      <Image src={img} className='ele-nodatatipo-img' mode='widthFix' />
      <View className='ele-nodatatipo-title'>{title}</View>
      {info && <View className='ele-nodatatipo-info'>{info}</View>}
      <EButton btnType='green' onClick={onButtonClick}>
        {btnContent}
      </EButton>
    </View>
  )
}

export default NoDataTip
