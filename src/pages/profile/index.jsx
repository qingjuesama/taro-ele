// 我的
import Taro, { useDidShow } from '@tarojs/taro'
import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { reqUserInfo } from '@/src/api'
import FooterBar from '@/src/components/FooterBar/FooterBar'

import './index.scss'

import UserHead from './components/UserHead/UserHead'
import MyRow from './components/MyRow/MyRow'

import red from '../../assets/images/red.svg'
import gold from '../../assets/images/gold.svg'
import addressImg from '../../assets/images/address.svg'
import pointImg from '../../assets/images/point.svg'
import commendImg from '../../assets/images/commend.svg'
import serviceImg from '../../assets/images/service.svg'
import downloadImg from '../../assets/images/download.svg'
import ruleImg from '../../assets/images/rule.svg'
import defaultHead from '../../assets/images/default-head.png'

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    phone: '登录后享受更多权限',
    userName: '登录/注册',
    headImg: defaultHead,
  })

  // 获取用户信息
  const getUserInfo = async () => {
    const result = await reqUserInfo()
    if (result.code === 0) {
      setUserInfo(result.data)
    } else {
      Taro.showToast({ title: result.message, icon: 'none' })
    }
  }

  useDidShow(() => {
    getUserInfo()
  }, [])

  // 跳转到用户信息 或者 登录
  const onLink = () => {
    if (userInfo.id) {
      Taro.navigateTo({ url: '/pages/profile/pages/info/index' })
    } else {
      Taro.redirectTo({ url: '/pages/login/index' })
    }
  }

  // 跳转到我的地址
  const goAddress = () => {
    if (userInfo.id) {
      Taro.navigateTo({ url: '/pages/profile/pages/address/index' })
    } else {
      Taro.showToast({ title: '请先登录', icon: 'none' })
    }
  }

  // 未开发
  const tipNull = () => {
    Taro.showToast({ title: '暂未开放', icon: 'none' })
  }

  return (
    <View className='profile'>
      <UserHead userInfo={userInfo} onLink={onLink} />
      <View className='user-money'>
        <View className='money-red' onClick={tipNull}>
          <View className='money-imgs'>
            <Image src={red} className='money-image' />
          </View>
          <View className='money-txt'>红包</View>
        </View>
        <View className='money-red' onClick={tipNull}>
          <View className='money-imgs'>
            <Image src={gold} className='money-image' />
          </View>
          <View className='money-txt'>金币</View>
        </View>
      </View>
      <View className='profile-block'>
        <MyRow
          imgUrl={addressImg}
          addressText='我的地址'
          border={false}
          onGo={goAddress}
        />
      </View>
      <View className='profile-block'>
        <MyRow imgUrl={pointImg} addressText='金币商城' />
        <MyRow
          imgUrl={commendImg}
          addressText='分享拿20元现金'
          border={false}
        />
      </View>
      <View className='profile-block'>
        <MyRow imgUrl={serviceImg} addressText='我的客服' />
        <MyRow imgUrl={downloadImg} addressText='下载饿了么APP' />
        <MyRow imgUrl={ruleImg} addressText='规则中心' border={false} />
      </View>
      <View className='profile-privacy'>政策隐私</View>
      <FooterBar />
    </View>
  )
}

export default Profile
