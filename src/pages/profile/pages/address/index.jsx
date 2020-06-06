// 我的地址
import Taro, { useDidShow } from '@tarojs/taro'
import React from 'react'
import { View, Text } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'
import { reqDelUserAddress } from '@/src/api'
import {
  atUserAddress,
  removeUserAddress,
  getUserAddressList,
} from '@/src/redux/actions/user'
import NavBar from '@/src/components/NavBar/NavBar'
import AddressRow from './components/AddressRow/AddressRow'
import './index.scss'

const ProfileAddress = () => {
  const dispatch = useDispatch()
  const userAddressList = useSelector(state => state.userAddressList)

  // 获取收货地址
  const getAddress = () => {
    dispatch(getUserAddressList())
  }

  // 获取收货地址
  useDidShow(() => {
    getAddress()
  })

  // 删除收货地址
  const delAddress = id => {
    Taro.showModal({
      title: '删除地址',
      content: '确定删除该地址',
      success: async res => {
        if (res.confirm) {
          const result = await reqDelUserAddress({ id })
          if (result.code === 0) {
            getAddress()
          } else {
            Taro.showToast({ title: result.message, icon: 'none' })
          }
        }
      },
    })
  }

  // 跳转新增收货地址
  const goAdd = () => {
    // 清空收货地址
    dispatch(removeUserAddress())
    Taro.navigateTo({ url: '/pages/profile/pages/add/index' })
  }

  // 跳转编辑地址
  const editAddress = useAddress => {
    dispatch(atUserAddress(useAddress))
    Taro.navigateTo({
      url: '/pages/profile/pages/edit/index',
    })
  }

  // 返回个人中心
  const goProfile = () => {
    Taro.redirectTo({ url: '/pages/profile/index' })
  }

  return (
    <View className='profileaddress'>
      <NavBar title='我的地址' onClose={goProfile} />
      <View className='profileaddress-list'>
        {userAddressList.map(item => {
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
        <View className='profileaddress-add-text' onClick={goAdd}>
          新增收货地址
        </View>
      </View>
    </View>
  )
}
ProfileAddress.config = {
  navigationBarTitleText: '我的地址',
}

export default ProfileAddress
