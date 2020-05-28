import Taro from '@tarojs/taro'
import React from 'react'
import { View, Input, Button } from '@tarojs/components'
// import { AtIcon } from 'taro-ui'
import './UserAddress.scss'

const UserAddress = ({ userAddress, onForm }) => {
  const submit = () => {
    onForm()
  }

  return (
    <View className='useraddress'>
      <View className='useraddress-item'>
        <View className='item-left'>联系人</View>
        <View className='item-right'>
          <Input value='任仲帅' className='item-right-input' />
        </View>
      </View>

      <View className='useraddress-sex'>
        <View className='sex-item sex-active'>先生</View>
        <View className='sex-item'>女士</View>
      </View>

      <View className='useraddress-item'>
        <View className='item-left'>电话</View>
        <View className='item-right'>
          <Input value='18500255303' className='item-right-input' />
        </View>
      </View>

      <View className='useraddress-item'>
        <View className='item-left'>地址</View>
        <View className='item-right'>
          <View className='item-right-text br'>世茂维拉</View>
          {/* <AtIcon prefixClass='icon' value='jiantou1' size='15' /> */}
        </View>
      </View>

      <View className='useraddress-item'>
        <View className='item-left'>门牌号</View>
        <View className='item-right'>
          <Input value='3单元303' className='item-right-input br' />
          {/* <AtIcon prefixClass='icon' value='bianji' size='15' /> */}
        </View>
      </View>

      <View className='address-submit'>
        <Button className='address-submit-button'>确定</Button>
      </View>
    </View>
  )
}

export default UserAddress
