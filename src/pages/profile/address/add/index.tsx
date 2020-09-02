// 添加地址
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

const AddAddress: FC = () => {
  const userAddress = useSelector((state: Reducers) => state.userAddress)
  const onForm = async (form: Address) => {
    const { err, res } = await API.reqAddUserAddress(form)

    if (err) {
      console.log(err)
      return
    }

    if (res.code === 0) {
      Taro.navigateBack({ delta: 1 })
    } else {
      console.log(res)
      Taro.showToast({ title: res.message, icon: 'none' })
    }
  }
  return (
    <View className='addaddress'>
      {H5 && <NavBar title='添加地址' icon='fanhui' />}
      <UserAddress userAddress={userAddress} onForm={onForm} />
    </View>
  )
}

export default AddAddress
