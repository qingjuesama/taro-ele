import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import { View, Input, Button, Text } from '@tarojs/components'
import classnames from 'classnames'
import './UserAddress.scss'

const UserAddress = ({ userAddress, onForm }) => {
  const [myAddress, setMyaddress] = useState(userAddress)

  // 选择性别
  const setSex = sex => {
    setMyaddress(state => {
      return {
        ...state,
        sex: sex,
      }
    })
  }

  // 姓名 电话 名牌号
  const handleSetData = (value, key) => {
    setMyaddress(state => {
      return {
        ...state,
        [value]: key,
      }
    })
  }

  // 跳往搜索地址
  const onGoSearch = () => {
    Taro.navigateTo({ url: '/pages/profile/pages/search/index' })
  }

  // 提交
  const submit = () => {
    const { address, address_detail, city, latitude, longitude } = userAddress
    if (!myAddress.name) {
      Taro.showToast({ title: '联系人不能为空', icon: 'none' })
    } else if (!myAddress.phone) {
      Taro.showToast({ title: '手机号不能为空', icon: 'none' })
    } else if (!address) {
      Taro.showToast({ title: '地址不能为空', icon: 'none' })
    } else {
      onForm({
        address,
        city,
        latitude,
        longitude,
        name: myAddress.name,
        address_detail: myAddress.address_detail || address_detail,
        sex: myAddress.sex,
        phone: myAddress.phone,
        id: myAddress.id,
      })
    }
  }

  return (
    <View className='useraddress'>
      <View className='useraddress-item'>
        <View className='item-left'>联系人</View>
        <View className='item-right'>
          <Input
            value={myAddress.name}
            placeholder='姓名'
            className='item-right-input'
            onInput={e => handleSetData('name', e.detail.value)}
          />
        </View>
      </View>

      <View className='useraddress-sex'>
        <View
          className={classnames('sex-item ', {
            'sex-active': myAddress.sex === '1',
          })}
          onClick={() => setSex('1')}
        >
          先生
        </View>
        <View
          className={classnames('sex-item', {
            'sex-active': myAddress.sex === '2',
          })}
          onClick={() => setSex('2')}
        >
          女士
        </View>
      </View>

      <View className='useraddress-item'>
        <View className='item-left'>电话</View>
        <View className='item-right'>
          <Input
            value={myAddress.phone}
            placeholder='手机号码'
            maxlength={11}
            className='item-right-input'
            onInput={e => handleSetData('phone', e.detail.value)}
          />
        </View>
      </View>

      <View className='useraddress-item'>
        <View className='item-left'>地址</View>
        <View className='item-right' onClick={onGoSearch}>
          <View className='item-right-text br'>
            {userAddress.address || '小区/写字楼/学校等'}
          </View>
          <Text className='icon icon-jiantou1'></Text>
        </View>
      </View>

      <View className='useraddress-item'>
        <View className='item-left'>门牌号</View>
        <View className='item-right'>
          <Input
            value={userAddress.address_detail}
            placeholder='10号楼5层501室222'
            className='item-right-input br'
            onInput={e => handleSetData('address_detail', e.detail.value)}
          />
          <Text className='icon icon-bianji'></Text>
        </View>
      </View>

      <View className='address-submit'>
        <Button className='address-submit-button' onClick={submit}>
          确定
        </Button>
      </View>
    </View>
  )
}

export default UserAddress
