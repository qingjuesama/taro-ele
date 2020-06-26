import React, { useMemo } from 'react'
import { View, Image } from '@tarojs/components'
import imgUrl from '@/src/utils/imgUrl'
import classnames from 'classnames'

import './LeftBar.scss'

const LeftBar = ({ good, isActive, onActive }) => {
  const icon = useMemo(() => {
    if (good.icon_url) {
      return <Image className='leftbar-icon' src={imgUrl(good.icon_url)} />
    }
  }, [good])
  return (
    <View
      className={classnames('leftbar', {
        'leftbar-active': isActive,
      })}
      onClick={() => onActive(good)}
    >
      {icon}
      <View className='leftbar-name'>{good.name}</View>
      <View className='leftbar-num'>0</View>
    </View>
  )
}

export default LeftBar
