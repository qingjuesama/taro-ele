// 添加地址
import Taro from '@tarojs/taro'
import React from 'react'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { reqAddUserAddress } from '@/src/api'
import NavBar from '@/src/components/NavBar/NavBar'
import UserAddress from '@/src/components/UserAddress/UserAddress'

import './index.scss'

const AddAddress = () => {
  const userAddress = useSelector(state => state.userAddress)
  const onForm = async form => {
    const result = await reqAddUserAddress(form)
    console.log(result)
    if (result.code === 0) {
      console.log(result.data)
    }
  }
  return (
    <View className='addaddress'>
      <NavBar title='添加地址' />
      <UserAddress userAddress={userAddress} onForm={onForm} />
    </View>
  )
}

export default AddAddress
