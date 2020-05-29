// 个人信息
import Taro from '@tarojs/taro'
import React, { useEffect, useState, useCallback } from 'react'
import { View, Button, Image } from '@tarojs/components'
import { connect } from 'react-redux'
import defaultHead from '../../assets/images/default-head.png'
import { reqUserInfo } from '../../api'
import { removeToken } from '../../redux/actions/token'
import './index.scss'

const ProfileInfo = ({ removeToken, token }) => {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if (!token) {
      Taro.redirectTo({ url: '/pages/msite/index' })
    }
  }, [token])

  // 获取用户信息
  const getUserInfo = useCallback(async () => {
    const result = await reqUserInfo()
    if (result.code === 0) {
      setUserInfo(result.data)
    }
  }, [])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

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
    removeToken()
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

      <View className='out-login' onClick={logOut}>
        <Button className='out-button'>退出登录</Button>
      </View>
    </View>
  )
}

export default connect(
  // reducers
  state => ({ token: state.token }),
  // actions
  { removeToken }
)(ProfileInfo)
