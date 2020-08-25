import React, { FC } from 'react'
import classnames from 'classnames'
import { View } from '@tarojs/components'

import './EList.scss'

export interface EListProps {
  children: React.ReactNode
  renderHeader?: () => React.ReactNode
  className?: string
}

const EList: FC<EListProps> = (props) => {
  const { renderHeader, children, className } = props
  const classes = classnames('ele-elist', className)
  return (
    <View className={classes}>
      {renderHeader && <View className='ele-elist-title'>{renderHeader()}</View>}
      {children}
    </View>
  )
}
export default EList
