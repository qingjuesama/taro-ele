import Taro from '@tarojs/taro'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { reqUseSearchAddress } from '@/src/api'
import { setAtUserAddress } from '@/src/redux/actions/user'
import { initAddress } from '@/src/redux/actions/address'
import NavBar from '@/src/components/NavBar/NavBar'
import './index.scss'

const Search = () => {
  const address = useSelector(state => state.address)
  const dispatch = useDispatch()

  const [value, setValue] = useState('')
  const [addressList, setAddressList] = useState([])
  const time = useRef()

  // 获取搜索地址
  const getAddressList = useCallback(async () => {
    // 如果redux没有数据 重新获取ip地址信息
    if (!address.longitude && !address.latitude) {
      dispatch(initAddress())
      console.log('ip1')
    } else {
      const parmas = {
        key: value,
        longitude: address.longitude,
        latitude: address.latitude,
      }
      const result = await reqUseSearchAddress(parmas)
      if (result.code === 0) {
        setAddressList(result.data)
      } else {
        Taro.showToast({ title: result.message, icon: 'none' })
      }
    }
  }, [value, address, dispatch])

  useEffect(() => {
    getAddressList()
  }, [getAddressList])

  // 搜索
  const onSearch = e => {
    const keyword = e.detail.value
    clearTimeout(time.current)
    time.current = setTimeout(() => {
      setValue(keyword)
    }, 200)
  }

  // 选择地址
  const selectCity = item => {
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
      <NavBar title='搜索地址' />
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
          {addressList.map(item => {
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
