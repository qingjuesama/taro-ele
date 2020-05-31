// 个人信息
import Taro, { useDidShow } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import { View, Button, Image } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { reqUserInfo } from '@/src/api'
import { removeToken } from '@/src/redux/actions/token'
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
        url: 'http://localhost:4000/api/uploadHead', //仅为示例，非真实的接口地址
        filePath: result.tempFilePaths[0],
        name: 'head',
        formData: {
          imgName: Date.now(),
        },
        header: {
          Authorization: token,
        },
        success(res) {
          // const data = res.data
          // console.log(data)
          // 重新读取用户信息
          getUserInfo()
        },
      })
  }

  const logOut = () => {
    dispatch(removeToken())
    Taro.navigateBack({ delta: 1 })
  }

  return (
    <View className='profileinfo'>
      <View className='profileinfo-head' onClick={handleOpenImage}>
        <View className='left-title'>头像</View>
        <View className='center-info'>
          <View className='info-image'>
            <Image
              src={userInfo.headImg || defaultHead}
              className='user-image'
            />
          </View>
        </View>
        {/* <AtIcon prefixClass='icon' value='jiantou1' size='12' color='#adadad' /> */}
      </View>
      <View className='profileinfo-head'>
        <View className='left-title'>用户名</View>
        <View className='center-info'>{userInfo.userName}</View>
        {/* <AtIcon prefixClass='icon' value='jiantou1' size='12' color='#adadad' /> */}
      </View>
      <View className='profileinfo-head'>
        <View className='left-title'>手机</View>
        <View className='center-info'>{userInfo.phone}</View>
        {/* <AtIcon prefixClass='icon' value='jiantou1' size='12' color='#adadad' /> */}
      </View>

      <View className='out-login'>
        <Button className='out-button' onClick={logOut}>
          退出登录
        </Button>
      </View>
    </View>
  )
}

export default ProfileInfo
