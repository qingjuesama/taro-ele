// 编辑地址
import Taro from '@tarojs/taro'
import React, { FC } from 'react'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { H5 } from '../../../../config/base'
import API from '../../../../api'
import { Reducers, Address } from '../../../../redux/interface'
import NavBar from '../../../../components/NavBar/NavBar'
import UserAddress from '../../../../components/UserAddress/UserAddress'

import './index.scss'

const ProfileAddressEdit: FC = () => {
  const userAddress = useSelector((state: Reducers) => state.userAddress)

  // 获取修改的数据
  const onForm = async (myAddress: Address) => {
    const { err, res } = await API.reqSetUserAddress(myAddress)

    if (err) {
      console.log(err)
      return
    }

    if (res.code === 0) {
      Taro.navigateTo({ url: '/pages/profile/address/index' })
    } else {
      console.log(res)
      Taro.showToast({ title: res.message, icon: 'none' })
    }
  }

  return (
    <View className='edit'>
      {H5 && <NavBar title='编辑地址' icon='fanhui' />}
      <UserAddress userAddress={userAddress} onForm={onForm} />
    </View>
  )
}

export default ProfileAddressEdit
