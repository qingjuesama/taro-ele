// 我的
import Taro from '@tarojs/taro'
import React, { useState, useEffect, useCallback } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'

import { reqUserInfo } from '../../api'
import FooterBar from '../../components/FooterBar/FooterBar'
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

const Profile = () => {
  const [userInfo, setUserInfo] = useState()

  // 获取用户信息
  const getUserInfo = useCallback(async () => {
    const result = await reqUserInfo()
    if (result.code === 0) {
      setUserInfo(result.data)
    }
  }, [])

  // 跳转
  const onLink = () => {
    Taro.navigateTo({ url: '/pages/profileinfo/index' })
  }

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  // 跳转到我的地址
  const goAddress = () => {
    Taro.navigateTo({ url: '/pages/profileAddress/index' })
  }

  return (
    <View className='profile'>
      <UserHead userInfo={userInfo} onLink={userInfo && onLink} />
      <View className='user-money'>
        <View className='money-red'>
          <View className='money-imgs'>
            <Image src={red} className='money-image' />
          </View>
          <View className='money-txt'>红包</View>
        </View>
        <View className='money-red'>
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
