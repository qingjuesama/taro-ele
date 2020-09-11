import React, { FC, useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'

import API from '../../../../api'
import { INavSwiper } from '../../../../api/interface'
import { Reducers } from '../../../../redux/interface'

import NavSwiperFramework from '../Framework/Framework'
import NavSwiperItem from '../NavSwipeItem/NavSwipeItem'

import './NavSwipe.scss'

const NavSwiper: FC = () => {
  const { currentAddress } = useSelector((state: Reducers) => state)
  const [navSwipeList, setNavSwipeList] = useState<INavSwiper[]>([])

  useEffect(() => {
    const { latitude, longitude } = currentAddress
    // 导航
    if (latitude && longitude) {
      API.reqNavList({ latitude, longitude }).then((result) => {
        const { err, res } = result
        if (err) {
          console.log(err)
          return
        }
        if (res.code === 0) {
          setNavSwipeList(res.data)
        }
      })
    }
  }, [currentAddress])

  if (!navSwipeList.length) {
    // 骨架
    return <NavSwiperFramework />
  }

  // 导航
  return (
    <View className='navswiper'>
      {navSwipeList.map((navItem) => {
        return <NavSwiperItem navItem={navItem} key={navItem.id} />
      })}
    </View>
  )
}

export default NavSwiper
