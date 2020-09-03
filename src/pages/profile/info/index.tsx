// 个人信息
import Taro, { useDidShow } from '@tarojs/taro'
import React, { useState } from 'react'
import { View, Button, Image, Navigator } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import API from '../../../api'
import { IUserInfo } from '../../../api/interface'
import { removeToken } from '../../../redux/actions/user'
import { Reducers } from '../../../redux/interface'

import EIcon from '../../../components/EIcon/EIcon'
import EList from '../../../components/EList'

import defaultHead from '../../../assets/images/default-head.png'
import './index.scss'

const ProfileInfo = () => {
  const token = useSelector((state: Reducers) => state.token)
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState({} as IUserInfo)

  // 获取用户信息
  const getUserInfo = async () => {
    const { err, res } = await API.reqUserInfo()

    if (err) {
      return
    }

    if (res.code === 0) {
      setUserInfo(res.data)
    }
  }

  useDidShow(() => {
    getUserInfo()
  })

  // 上传头像
  const handleOpenImage = async () => {
    // 选择头像
    const result = await Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
    })

    // 开始上传
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
        fail(err) {
          console.log(err)
        },
      })
  }

  // 退出登录
  const logOut = () => {
    dispatch(removeToken())
    Taro.navigateBack()
  }

  return (
    <View className='profileinfo'>
      <EList>
        <EList.EItem
          extra={
            <Image
              className='profileinfo-headimg'
              src={userInfo.headImg || defaultHead}
              onClick={handleOpenImage}
            />
          }
        >
          <View className='profileinfo-title'>头像</View>
        </EList.EItem>
        <EList.EItem
          extra={
            <Navigator url='/pages/profile/info/username/index'>
              {userInfo.userName}
            </Navigator>
          }
        >
          <View className='profileinfo-title'>用户名</View>
        </EList.EItem>
      </EList>
      <EList renderHeader={() => '账号绑定'}>
        <EList.EItem
          thumb={<EIcon type='shouji' color='#0097ff' />}
          extra={userInfo.phone}
          arrow='none'
        >
          <View className='profileinfo-title'>手机</View>
        </EList.EItem>
      </EList>
      <EList renderHeader={() => '安全设置'}>
        <EList.EItem
          extra={
            <Navigator
              url='/pages/profile/info/password/index'
              className='profileinfo-alter'
            >
              修改
            </Navigator>
          }
        >
          登录密码
        </EList.EItem>
      </EList>
      <View className='out-login'>
        <Button className='out-button' onClick={logOut}>
          退出登录
        </Button>
      </View>
    </View>
  )
}

export default ProfileInfo
