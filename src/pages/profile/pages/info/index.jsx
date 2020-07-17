// 个人信息
import Taro, { useDidShow } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import { View, Button, Image, Text } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { reqUserInfo } from '@/src/api'
import { removeToken } from '@/src/redux/actions/user'
import Row from '@/src/components/Row/Row'
import defaultHead from '../../../../assets/images/default-head.png'
import './index.scss'

const ProfileInfo = () => {
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if (!token) {
      Taro.redirectTo({ url: '/pages/profile/index' })
    }
  }, [token])

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

  const handleOpenImage = async () => {
    const result = await Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
    })

    result &&
      Taro.uploadFile({
        url: 'http://localhost:4000/api/uploadHead', 
        filePath: result.tempFilePaths[0],
        name: 'head',
        formData: {
          imgName: Date.now(),
        },
        header: {
          Authorization: token,
        },
        success() {
          // 重新读取用户信息
          getUserInfo()
        },
      })
  }

  // 修改用户名
  const editUserName = () => {
    Taro.navigateTo({ url: '/pages/profile/pages/username/index' })
  }

  // 修改登录密码
  const goPassword = () => {
    Taro.navigateTo({ url: '/pages/profile/pages/password/index' })
  }

  // 退出登录
  const logOut = () => {
    dispatch(removeToken())
    Taro.navigateBack({ delta: 1 })
  }

  return (
    <View className='profileinfo'>
      <Row
        leftText='头像'
        border
        imageUrl={userInfo.headImg || defaultHead}
        onRowClick={handleOpenImage}
        rightIcon
      />
      <Row
        leftText='用户名'
        rightText={userInfo.userName}
        rightIcon
        onRowClick={editUserName}
      />
      <Row
        title='账号绑定'
        leftText='手机'
        renderIcon={
          <Text className='icon icon-shouji profileinfo-phone'></Text>
        }
        rightText={userInfo.phone}
      />
      <Row
        title='安全设置'
        leftText='登录密码'
        rightText='修改'
        rightTextColor='#0097ff'
        rightIcon
        onRowClick={goPassword}
      />
      <View className='out-login'>
        <Button className='out-button' onClick={logOut}>
          退出登录
        </Button>
      </View>
    </View>
  )
}

export default ProfileInfo
