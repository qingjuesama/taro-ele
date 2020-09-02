// 我的
import Taro, { useDidShow } from '@tarojs/taro'
import React, { useState } from 'react'
import { View } from '@tarojs/components'
import API from '../../api'
import { IUserInfo } from '../../api/interface'
import FooterNav from '../../components/FooterNav/FooterNav'

import EList from '../../components/EList'
import ELoading from '../../components/ELoading/ELoading'
import ProfileUserHead from './components/UserHead/UserHead'
import ProfileMoney from './components/Money/Money'

import red from '../../assets/images/red.svg'
import gold from '../../assets/images/gold.svg'
import addressImg from '../../assets/images/address.svg'
import pointImg from '../../assets/images/point.svg'
import commendImg from '../../assets/images/commend.svg'
import serviceImg from '../../assets/images/service.svg'
import downloadImg from '../../assets/images/download.svg'
import ruleImg from '../../assets/images/rule.svg'
import defaultHead from '../../assets/images/default-head.png'

import './index.scss'

const tabList = {
  address: {
    img: addressImg,
    title: '我的地址',
  },
  shopping: [
    {
      id: 1,
      img: pointImg,
      title: '金币商城',
    },
    {
      id: 2,
      img: commendImg,
      title: '分享拿20元现金',
    },
  ],
  eleInfo: [
    {
      id: 1,
      img: serviceImg,
      title: '我的客服',
    },
    {
      id: 2,
      img: downloadImg,
      title: '下载饿了么APP',
    },
    {
      id: 3,
      img: ruleImg,
      title: '规则中心',
    },
  ],
}

const moneyList = [
  {
    id: 1,
    img: red,
    title: '红包',
  },
  {
    id: 2,
    img: gold,
    title: '金币',
  },
]

const initHeadInfo = {
  phone: '登录后享受更多权限',
  userName: '登录/注册',
  headImg: defaultHead,
}

const Profile = () => {
  const { address, shopping, eleInfo } = tabList
  const [userInfo, setUserInfo] = useState({} as IUserInfo)

  // 获取用户信息
  const getUserInfo = async () => {
    const { err, res } = await API.reqUserInfo()
    if (err) {
      setUserInfo(initHeadInfo)
      return
    }
    if (res.code === 0) {
      setUserInfo(res.data)
    }
  }

  useDidShow(() => {
    getUserInfo()
  })

  // 跳转到用户信息 或者 登录
  const onLink = () => {
    if (userInfo.id) {
      Taro.navigateTo({ url: '/pages/profile/info/index' })
    } else {
      Taro.reLaunch({ url: '/pages/login/index' })
    }
  }

  // 跳转到我的地址
  const goAddress = () => {
    if (userInfo.id) {
      Taro.navigateTo({ url: '/pages/profile/address/index' })
    } else {
      Taro.showToast({ title: '请先登录', icon: 'none' })
    }
  }

  // 未开发
  const tipNull = () => {
    Taro.showToast({ title: '暂未开放', icon: 'none' })
  }

  if (!userInfo.headImg) {
    return <ELoading height='100vh' />
  }

  return (
    <View className='profile'>
      <ProfileUserHead userInfo={userInfo} onLink={onLink} />

      <ProfileMoney moneyList={moneyList} onClick={tipNull} />

      <EList className='profile-list'>
        <EList.EItem onClick={goAddress} thumb={address.img}>
          {address.title}
        </EList.EItem>
      </EList>

      <EList className='profile-list'>
        {shopping.map((item) => {
          return (
            <EList.EItem key={item.id} onClick={tipNull} thumb={item.img}>
              {item.title}
            </EList.EItem>
          )
        })}
      </EList>

      <EList className='profile-list'>
        {eleInfo.map((item) => {
          return (
            <EList.EItem key={item.id} onClick={tipNull} thumb={item.img}>
              {item.title}
            </EList.EItem>
          )
        })}
      </EList>

      <View className='profile-privacy'>政策隐私</View>
      <FooterNav />
    </View>
  )
}

export default Profile
