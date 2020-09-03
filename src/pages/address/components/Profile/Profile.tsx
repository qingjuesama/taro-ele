import React, { FC } from 'react'
import { View } from '@tarojs/components'
import { Address } from 'src/api/interface'

import './Profile.scss'

interface ProfileProps {
  userAddressList: any[]
  onClick: (item: Address) => void
}
const Profile: FC<ProfileProps> = (props) => {
  const { userAddressList, onClick } = props
  return (
    <View className='profile'>
      <View className='profile-title'>收货地址</View>
      <View className='profile-main'>
        {userAddressList.map((item) => {
          return (
            <View
              className='profile-item'
              key={item.id}
              onClick={() => onClick(item)}
            >
              <View className='item-top'>
                <View className='ming'>{item.name}</View>
                <View className='sex'>
                  {item.sex === '1' ? '先生' : '女士'}
                </View>
                <View className='iphone'>{item.phone}</View>
              </View>
              <View className='item-address'>{item.address}</View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default Profile
