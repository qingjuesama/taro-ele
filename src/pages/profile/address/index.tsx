// 我的地址
import Taro, { useDidShow, useRouter } from '@tarojs/taro'
import React, { useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'
import { H5 } from '../../../config/base'
import API from '../../../api'
import {
  atUserAddress,
  removeUserAddress,
  getUserAddressList,
  setCurrentAddress,
} from '../../../redux/actions/user'
import { Reducers, Address } from '../../../redux/interface'
import NavBar from '../../../components/NavBar/NavBar'
import AddressRow from './components/AddressRow/AddressRow'
import './index.scss'

const ProfileAddress = () => {
  const dispatch = useDispatch()
  const { userAddressList, currentAddress } = useSelector(
    (state: Reducers) => state
  )
  const router = useRouter()

  // 是否可以选择地址
  const selectFlag = useMemo(() => {
    if (router.params.clearing) {
      return true
    } else {
      return false
    }
  }, [router])

  // 获取收货地址
  const getAddress = () => {
    dispatch(getUserAddressList())
  }

  // 获取收货地址
  useDidShow(() => {
    getAddress()
  })

  // 删除收货地址
  const delAddress = (id: Address['id']) => {
    Taro.showModal({
      title: '删除地址',
      content: '确定删除该地址',
      success: async (result) => {
        if (result.confirm) {
          const { err, res } = await API.reqDelUserAddress({ id })

          if (err) {
            console.log(err)
            return
          }

          if (res.code === 0) {
            getAddress()
          } else {
            Taro.showToast({ title: res.message, icon: 'none' })
          }
        }
      },
    })
  }

  // 跳转新增收货地址
  const goAdd = () => {
    // 清空收货地址
    dispatch(removeUserAddress())
    Taro.navigateTo({ url: '/pages/profile/address/add/index' })
  }

  // 跳转编辑地址
  const editAddress = (useAddress: Address) => {
    dispatch(atUserAddress(useAddress))
    Taro.navigateTo({
      url: '/pages/profile/address/edit/index',
    })
  }

  // 当前用户选择地址 并返回上一页
  const selectUserAddress = (address: Reducers['userAddress']) => {
    if (selectFlag) {
      dispatch(setCurrentAddress(address))
      Taro.navigateBack({ delta: 1 })
    }
  }

  // 返回个人中心
  const backProfile = () => {
    Taro.redirectTo({ url: '/pages/profile/index' })
  }

  return (
    <View className='profileaddress'>
      {H5 && (
        <NavBar title='我的地址' icon='fanhui' onIconClick={backProfile} />
      )}
      <View className='profileaddress-list'>
        {userAddressList.map((item) => {
          return (
            <AddressRow
              key={item.id}
              address={item}
              onDelAddress={delAddress}
              onEditAddress={editAddress}
              selectFlag={selectFlag}
              currentAddress={currentAddress}
              onSelectUserAddress={selectUserAddress}
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
