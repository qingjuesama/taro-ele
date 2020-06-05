// 编辑地址
import Taro from '@tarojs/taro'
import React from 'react'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { reqSetUserAddress } from '@/src/api'
import NavBar from '@/src/components/NavBar/NavBar'
import UserAddress from '@/src/components/UserAddress/UserAddress'
import './index.scss'

const ProfileAddressEdit = () => {
  const userAddress = useSelector(state => state.userAddress)

  // 获取修改的数据
  const onForm = async myAddress => {
    const result = await reqSetUserAddress(myAddress)
    if (result.code === 0) {
      Taro.navigateTo({ url: '/pages/profile/pages/address/index' })
    } else {
      Taro.showToast({ title: result.message, icon: 'none' })
    }
  }

  return (
    <View className='edit'>
      <NavBar title='编辑地址' />
      <UserAddress userAddress={userAddress} onForm={onForm} />
    </View>
  )
}

export default ProfileAddressEdit
