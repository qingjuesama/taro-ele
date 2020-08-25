import React from 'react'
import Taro from '@tarojs/taro'
import { View, Navigator } from '@tarojs/components'
import classnames from 'classnames'
import EIcon, { EIconProps } from '../EIcon/EIcon'

import './NavBar.scss'

interface INavBarProps extends Omit<EIconProps, 'type'> {
  icon?: EIconProps['type']
  onIconClick?: () => void
  title?: string
  rightText?: string
  rightHref?: string
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
  return (
    <View className={classes} {...restProps}>
      {icon && (
        <EIcon className='navbar-black' type={icon} onClick={onIconClick} />
      )}
      {title && <View className='navbar-title'>{title}</View>}
      {rightHref && rightText && (
        <Navigator url={rightHref} className='navbar-href'>
          {rightText}
        </Navigator>
      )}
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
