import Taro, { FC } from '@tarojs/taro'
import React from 'react'
import { View, Image, Navigator } from '@tarojs/components'
import imgUrl from '../../../../utils/imgUrl'

import './NavSwipe.scss'

interface NavSwiperProps {
  navSwipeList: any[]
}

const NavSwiper: FC<NavSwiperProps> = (props) => {
  const { navSwipeList } = props
  const framework = Array(10).fill(1)

  if (!!navSwipeList.length) {
    // 导航
    return (
      <View className='navswiper'>
        <View className='navswiper-main'>
          {navSwipeList.map((navItem) => {
            return (
              <View className='navswiper-main-item' key={navItem.id}>
                <Navigator
                  url={`/pages/food/index?id=${navItem.id}&name=${navItem.name}`}
                >
                  <View className='navswiper-main-item-image'>
                    <Image
                      className='nav-image'
                      mode='widthFix'
                      src={imgUrl(navItem.image_hash)}
                    ></Image>
                  </View>
                  <View className='navswiper-main-item-title'>
                    {navItem.name}
                  </View>
                </Navigator>
              </View>
            )
          })}
        </View>
      </View>
    )
  } else {
    // 骨架
    return (
      <View className='navswiper'>
        <View className='framework'>
          {framework.map((item, i) => {
            return (
              <View className='framework-item' key={item + i}>
                <View className='framework-item-title'></View>
                <View className='framework-item-txt'></View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
NavSwiper.defaultProps = {
  navSwipeList: [],
}

export default NavSwiper
