import React, { useMemo } from 'react'
import { View, Image } from '@tarojs/components'
import imgUrl from '@/src/utils/imgUrl'
import classnames from 'classnames'

import './LeftBar.scss'

const LeftBar = ({ good, isActive, onActive, classCount }) => {
  const icon = useMemo(() => {
    if (good.icon_url) {
      return (
        <Image
          className='leftbar-icon'
          src={isActive ? imgUrl(good.icon_url) : imgUrl(good.grey_icon_url)}
        />
      )
    }
  }, [good, isActive])
  return (
    <View
      className={classnames('leftbar', {
        'leftbar-active': isActive,
      })}
      onClick={() => onActive(good)}
    >
      {icon}
      <View className='leftbar-name'>{good.name}</View>
      {classCount > 0 && <View className='leftbar-num'>{classCount}</View>}
    </View>
  )
}

export default LeftBar
