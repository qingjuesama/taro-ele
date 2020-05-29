import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import './UserHead.scss'
import defaultHead from '../../../../assets/images/default-head.png'

const UserHead = ({ userInfo, onLink }) => {
  return (
    <View className='user' onClick={onLink}>
      <View className='user-content'>
        <View className='user-left'>
          <Image className='user-image' src={userInfo.headImg || defaultHead} />
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

UserHead.defaultProps = {
  userInfo: {
    userName: '登录/注册',
    phone: '登录后享受更多权限',
    headImg: defaultHead,
  },
  onLink: () => {
    Taro.redirectTo({ url: '/pages/login/index' })
  },
}

export default UserHead
