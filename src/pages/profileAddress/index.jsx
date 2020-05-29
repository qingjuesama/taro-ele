// 我的地址
import Taro from '@tarojs/taro'
import React, { useEffect, useCallback, useState } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import { reqUserAddress } from '../../api'
import { atUserAddress } from '../../redux/actions/user'
import AddressRow from './components/AddressRow/AddressRow'
import NavBar from '../../components/NavBar/NavBar'
import './index.scss'

const ProfileAddress = ({ atUserAddress }) => {
  const [userAddress, setUserAddress] = useState([])

  // 获取收货地址
  const getAddress = useCallback(async () => {
    const result = await reqUserAddress()
    if (result.code === 0) {
      setUserAddress(result.data)
    }
  }, [])

  // 获取收货地址
  useEffect(() => {
    getAddress()
  }, [getAddress])

  // 删除收货地址
  const delAddress = id => {}

  // 跳转编辑地址
  const editAddress = useAddress => {
    atUserAddress(useAddress)
    Taro.navigateTo({
      url: '/pages/profileAddressEdit/index',
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
        {/* <AtIcon prefixClass='icon' value='tianjia' size='24' color='#3190e8' /> */}
        <View className='profileaddress-add-text'>新增收获地址</View>
      </View>
    </View>
  )
}
ProfileAddress.config = {
  navigationBarTitleText: '我的地址',
}

export default connect(
  // reducers
  state => ({}),
  // action
  { atUserAddress }
)(ProfileAddress)
