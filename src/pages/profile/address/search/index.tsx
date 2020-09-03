import Taro from '@tarojs/taro'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import API from '../../../../api'
import { UseSearchAddress } from '../../../../api/interface'
import { Reducers, Address } from '../../../../redux/interface'
import {
  setAtUserAddress,
  initCurrentAddress,
} from '../../../../redux/actions/user'
import NavBar from '../../../../components/NavBar/NavBar'
import './index.scss'

const Search = () => {
  const currentAddress = useSelector((state: Reducers) => state.currentAddress)
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [addressList, setAddressList] = useState<UseSearchAddress[]>([])

  // 获取搜索地址
  const getAddressList = useCallback(async () => {
    // 如果redux没有数据 重新获取ip地址信息
    if (!currentAddress.longitude && !currentAddress.latitude) {
      dispatch(initCurrentAddress())
    } else {
      const parmas = {
        key: value,
        longitude: currentAddress.longitude,
        latitude: currentAddress.latitude,
      }
      const { err, res } = await API.reqUseSearchAddress(parmas)

      if (err) {
        console.log(err)
        return
      }

      if (res.code === 0) {
        setAddressList(res.data)
      } else {
        console.log(res)
        Taro.showToast({ title: res.message, icon: 'none' })
      }
    }
  }, [value, currentAddress, dispatch])

  useEffect(() => {
    getAddressList()
  }, [getAddressList])

  // 搜索
  const onSearch = (e) => {
    const keyword = e.detail.value
    setValue(keyword)
  }

  // 选择地址
  const selectCity = (item: Address) => {
    const atAddress = {
      address: item.name,
      address_detail: item.address,
      city: item.city,
      latitude: item.latitude,
      longitude: item.longitude,
    }
    dispatch(setAtUserAddress({ ...atAddress }))
    Taro.navigateBack({ delta: 1 })
  }

  return (
    <View className='search'>
      <NavBar title='搜索地址' icon='fanhui' />
      <ScrollView className='search-main' scrollY>
        <View className='search-top'>
          <Text className='icon icon-sousuo'></Text>
          <Input
            className='input'
            placeholder='请输入小区/写字楼/学校等'
            onInput={onSearch}
          />
        </View>
        <View className='search-list'>
          {addressList.map((item) => {
            return (
              <View
                className='search-item'
                key={item.id}
                onClick={() => selectCity(item)}
              >
                <View className='title'>{item.name}</View>
                <View className='detail'>{item.address}</View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default Search
