import React, { FC } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { ScrollViewProps } from '@tarojs/components/types/ScrollView'
import classnames from 'classnames'

import './EScroll.scss'

interface EScrollProps extends ScrollViewProps {
  className?: string
  id?: string
  children: React.ReactNode
}

const EScroll: FC<EScrollProps> = (props) => {
  const { className, id, children, ...reset } = props
  const classes = classnames('scroll-box', className)
  return (
    <View className='escroll'>
      <ScrollView id={id} className={classes} {...reset}>
        <View>{children}</View>
      </ScrollView>
    </View>
  )
}

export default EScroll
