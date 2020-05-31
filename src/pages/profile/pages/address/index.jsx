// 我的地址
import Taro, { useDidShow } from '@tarojs/taro'
import React, { useEffect, useCallback, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { useDispatch } from 'react-redux'
import { reqUserAddress } from '@/src/api'
import { atUserAddress } from '@/src/redux/actions/user'
import NavBar from '@/src/components/NavBar/NavBar'
import AddressRow from './components/AddressRow/AddressRow'
import './index.scss'

const ProfileAddress = () => {
  const dispatch = useDispatch()

  const [userAddress, setUserAddress] = useState([])

  // 获取收货地址
  const getAddress = useCallback(async () => {
    const result = await reqUserAddress()
    if (result.code === 0) {
      setUserAddress(result.data)
    }
  }, [])

  // 获取收货地址
  useDidShow(() => {
    getAddress()
  }, [getAddress])

  // 删除收货地址
  const delAddress = id => {}

  // 跳转编辑地址
  const editAddress = useAddress => {
    dispatch(atUserAddress(useAddress))
    Taro.navigateTo({
      url: '/pages/profile/pages/edit/index',
    })
  }

  return (
    <View className='profileaddress'>
      <NavBar title='我的地址' />
      <View className='profileaddress-list'>
        {userAddress.map(item => {
          return (
            <AddressRow
              key={item.id}
              address={item}
              onDelAddress={delAddress}
              onEditAddress={editAddress}
            />
          )
        })}
      </View>
      <View className='profileaddress-add'>
        <Text className='icon icon-tianjia'></Text>
        <View className='profileaddress-add-text'>新增收获地址</View>
      </View>
    </View>
  )
}
ProfileAddress.config = {
  navigationBarTitleText: '我的地址',
}

export default ProfileAddress
