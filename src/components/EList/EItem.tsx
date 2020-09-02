import React, { FC } from 'react'
import { View, Image } from '@tarojs/components'
import classnames from 'classnames'
import EIcon from '../EIcon/EIcon'

import './EItem.scss'

type Arrow = 'jiantou1' | 'none'
export interface EItemProps {
  thumb?: string | React.ReactNode
  extra?: string | React.ReactNode
  arrow?: Arrow
  onClick?: () => void
  className?: string
}

const EItem: FC<EItemProps> = (props) => {
  const { thumb, extra, arrow, onClick, className, children } = props
  const classes = classnames('ele-eitem', className)

  const isThumb = () => {
    if (typeof thumb === 'string') {
      return <Image src={thumb} className='ele-eitem-content-img' />
    } else {
      return thumb
    }
  }

  const isExtra = () => {
    if (typeof extra === 'string') {
      return <View className='ele-eitem-extra'>{extra}</View>
    } else {
      return extra
    }
  }

  const isArrow = () => {
    if (arrow === 'none') {
      return false
    } else {
      return true
    }
  }

  return (
    <View className={classes} onClick={onClick}>
      <View className='ele-eitem-main'>
        {isThumb && isThumb()}
        <View className='ele-eitem-content'>
          <View className='ele-eitem-content-title'>{children}</View>
          {isExtra && isExtra()}
          {isArrow() && (
            <EIcon
              type='jiantou1'
              size={25}
              color='#999'
              className='ele-eitem-content-icon'
            />
          )}
        </View>
      </View>
    </View>
  )
}
EItem.defaultProps = {
  arrow: 'jiantou1',
}
export default EItem
