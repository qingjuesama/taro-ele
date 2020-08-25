import React, { FC } from 'react'
import { View, Text, Image } from '@tarojs/components'
import classnames from 'classnames'
import EIcon from '../EIcon/EIcon'

import './EItem.scss'

export interface EItemProps {
  thumb?: string | React.ReactNode
  extra?: string | React.ReactNode
  arrow?: 'horizontal'
  onClick: () => void
  className?: string
}

const EItem: FC<EItemProps> = (props) => {
  const { thumb, extra, arrow, onClick, className, children } = props
  const classes = classnames('ele-eitem', className)

  const isThumb = () => {
    if (thumb as string) {
      return <Image src={thumb as string} className='ele-eitem-content-img' />
    } else {
      return thumb
    }
  }

  const isExtra = () => {
    if (extra as string) {
      return <View>{extra}</View>
    } else {
      return extra
    }
  }

  return (
    <View className={classes} onClick={onClick}>
      <View className='ele-eitem-main'>
        {isThumb && isThumb()}
        <View className='ele-eitem-content'>
          <View className='ele-eitem-content-title'>{children}</View>
          {isExtra && isExtra()}
          {arrow && (
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
  arrow: 'horizontal',
}
export default EItem
