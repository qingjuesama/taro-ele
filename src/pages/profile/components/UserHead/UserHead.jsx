import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import './UserHead.scss'

const UserHead = ({ userInfo, onLink }) => {
  return (
    <View className='user' onClick={onLink}>
      <View className='user-content'>
        <View className='user-left'>
          <Image className='user-image' src={userInfo.headImg} />
        </View>
        <View className='user-right'>
          <View className='user-title'>{userInfo.userName}</View>
          <View className='right-content'>
            <Text className='icon icon-shouji'></Text>
            <View className='user-text'>{userInfo.phone}</View>
          </View>
        </View>
        <Text className='icon icon-jiantou1'></Text>
      </View>
    </View>
  )
}

export default UserHead
