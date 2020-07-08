import Taro, { getCurrentInstance, useDidShow } from '@tarojs/taro'
import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import classnames from 'classnames'

import msiteIcon from './images/msite_1.svg'
import msiteActiveIcon from './images/msite_2.svg'
import discoverIcon from './images/discover_1.svg'
import discoverActiveIcon from './images/discover_2.svg'
import orderIcon from './images/order_1.svg'
import orderActiveIcon from './images/order_2.svg'
import profileIcon from './images/profile_1.svg'
import profileActiveIcon from './images/profile_2.svg'
import './FooterBar.scss'

const FooterBar = () => {

  // 路由地址
  const [path, setPath] = useState('')

  const [bars] = useState([
    {
      id: 0,
      name: '首页',
      path: '/pages/msite/index',
      icon: msiteIcon,
      active_icon: msiteActiveIcon,
    },
    {
      id: 1,
      name: '发现',
      path: '/pages/discover/index',
      icon: discoverIcon,
      active_icon: discoverActiveIcon,
    },
    {
      id: 2,
      name: '订单',
      path: '/pages/order/index',
      icon: orderIcon,
      active_icon: orderActiveIcon,
    },
    {
      id: 3,
      name: '我的',
      path: '/pages/profile/index',
      icon: profileIcon,
      active_icon: profileActiveIcon,
    },
  ])

  useDidShow(() => {
    // 获取路由路径
    const current = getCurrentInstance()
    if (current.app.config && current.app.config.router) {
      // H5端
      setPath(current.app.config.router.pathname)
    } else {
      // 微信端
      setPath( current.router.path)
    }
  }, [])

  // 跳转
  const handleGo = bar => {
    Taro.redirectTo({
      url: bar.path,
    })
  }

  return (
    <View className='footerbar'>
      <View className='footerbar-mian'>
        {bars.map(bar => {
          return (
            <View
              key={bar.id}
              onClick={() => handleGo(bar)}
              className={classnames('footer-item', {
                active: path === bar.path,
              })}
            >
              <View className='item-icon'>
                <Image
                  className='item-icon-img'
                  src={path === bar.path ? bar.active_icon : bar.icon}
                />
              </View>
              <View className='item-name'>{bar.name}</View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
export default FooterBar
