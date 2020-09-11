import React, { FC } from 'react'
import { View, Navigator, Image } from '@tarojs/components'
import imgUrl from '../../../../utils/imgUrl'
import { INavSwiper } from '../../../../api/interface'
import './NavSwipeItem.scss'

interface ItemProps {
  navItem: INavSwiper
}

const NavSwipeItem: FC<ItemProps> = (props) => {
  const { navItem } = props
  return (
    <View className='navswiper-item' key={navItem.id}>
      <Navigator
        url={`/pages/food/index?id=${navItem.id}&name=${navItem.name}`}
      >
        <View className='navswiper-item-image'>
          <Image
            className='nav-image'
            mode='widthFix'
            src={imgUrl(navItem.image_hash)}
          ></Image>
        </View>
        <View className='navswiper-item-title'>{navItem.name}</View>
      </Navigator>
    </View>
  )
}

export default NavSwipeItem
