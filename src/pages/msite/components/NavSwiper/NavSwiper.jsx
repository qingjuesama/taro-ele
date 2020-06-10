import React, { useState } from 'react'
import { View, Navigator, Image } from '@tarojs/components'
import imgUrl from '@/src/utils/imgUrl'

import './NavSwiper.scss'

const NavSwiper = ({ navList }) => {
  const [framework] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  return (
    <View className='navswiper'>
      {navList.length ? (
        // 导航
        <View className='navswiper-main'>
          {navList &&
            navList.map(navItem => {
              return (
                <View className='navswiper-main-item' key={navItem.id}>
                  <Navigator>
                    <View className='navswiper-main-item-image'>
                      <Image
                        className='nav-image'
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
      ) : (
        // 骨架
        <View className='framework'>
          {framework.map(i => {
            return (
              <View className='framework-item' key={i}>
                <View className='framework-item-title'></View>
                <View className='framework-item-txt'></View>
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}
NavSwiper.defaultProps = {
  navList: [],
}

export default NavSwiper
