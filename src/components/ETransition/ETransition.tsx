import React, { FC } from 'react'
import { View } from '@tarojs/components'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

import './ETransition.scss'

type AnimationName = 'ele-top' | 'ele-bottom' | 'ele-left' | 'ele-right'

type ETransitionProps = CSSTransitionProps & {
  animation?: AnimationName
  wrapper?: boolean
}

const ETransition: FC<ETransitionProps> = (props) => {
  const { classNames, animation, wrapper, children, ...restProps } = props

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <View>{children}</View> : children}
    </CSSTransition>
  )
}
ETransition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}
export default ETransition
