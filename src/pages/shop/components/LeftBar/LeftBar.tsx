import React, { FC, useMemo } from 'react'
import { View, Image } from '@tarojs/components'
import classnames from 'classnames'
import imgUrl from '../../../../utils/imgUrl'

import './LeftBar.scss'

interface LeftBarProps {
  good
  isActive
  onActive
  classCount
}

const LeftBar: FC<LeftBarProps> = (props) => {
  const { good, isActive, onActive, classCount } = props
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
