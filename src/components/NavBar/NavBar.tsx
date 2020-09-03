import React from 'react'
import Taro from '@tarojs/taro'
import { View, Navigator } from '@tarojs/components'
import classnames from 'classnames'
import EIcon, { EIconProps } from '../EIcon/EIcon'

import './NavBar.scss'

type onRightHref = () => void

interface INavBarProps extends Omit<EIconProps, 'type'> {
  icon?: EIconProps['type']
  onIconClick?: () => void
  title?: string
  rightText?: string
  rightHref?: string | onRightHref
}

const NavBar: React.FC<INavBarProps> = (props) => {
  const {
    icon,
    onIconClick,
    title,
    rightText,
    rightHref,
    className,
    children,
    ...restProps
  } = props
  const classes = classnames('navbar', className)

  const handleRightHref = () => {
    if (rightHref && rightText) {
      if (typeof rightHref === 'string') {
        return (
          <Navigator url={rightHref} className='navbar-href'>
            {rightText}
          </Navigator>
        )
      } else {
        return (
          <View className='navbar-href' onClick={rightHref}>
            {rightText}
          </View>
        )
      }
    }
  }

  return (
    <View className={classes} {...restProps}>
      {icon && (
        <EIcon className='navbar-black' type={icon} onClick={onIconClick} />
      )}
      {title && <View className='navbar-title'>{title}</View>}
      {handleRightHref()}
      {children}
    </View>
  )
}

NavBar.defaultProps = {
  onIconClick: () => {
    Taro.navigateBack({ delta: -1 })
  },
}
export default NavBar
