// 选择收货地址
import React, { useState, useRef, useMemo } from 'react'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { setAddress } from '@/src/redux/actions/address'
import { reqAddressDetail } from '@/src/api'
import NavBar from '@/src/components/NavBar/NavBar'

import SelectAddressSearch from '../SelectAddressSearch/SelectAddressSearch'
import SelectAddressResult from '../SelectAddressResult/SelectAddressResult'
import SelectAddressAtAddress from '../SelectAddressAtAddress/SelectAddressAtAddress'
import SelectAddressProfile from '../SelectAddressProfile/SelectAddressProfile'
import './SelectAddress.scss'

const SelectAddress = ({
  addressShow,
  onSetAddressShow,
  onSetCityShow,
  onLocationCity,
}) => {
  const dispatch = useDispatch()
  const address = useSelector(state => state.address)
  // 搜索关键字
  const [searchValue, setSearchValue] = useState('')
  // 搜索地址列表
  const [detailList, setDetailList] = useState([])
  // 定时器
  const timeRef = useRef(null)

  // 搜索详细地址
  const onSearchValue = e => {
    let { value } = e.detail
    clearTimeout(timeRef.current)
    if (!value.trim()) {
      return onInitDetail()
    }
    timeRef.current = setTimeout(() => {
      setSearchValue(value)
      getDetila(value)
    }, 250)
  }

  // 发送请求获取详细地址
  const getDetila = async value => {
    const { latitude, longitude } = address
    const resultDetail = await reqAddressDetail({
      keyword: value,
      offset: 0,
      limit: 20,
      latitude,
      longitude,
    })

    if (resultDetail.code === 0) {
      setDetailList(resultDetail.data)
    }
  }

  // 初始化搜索状态
  const onInitDetail = () => {
    // 清空搜索内容
    setSearchValue('')
    // 清空列表数据
    setDetailList([])
  }

  // 打开选择城市 && 初始化状态
  const onOpenCity = () => {
    onInitDetail()
    onSetCityShow(true)
  }

  // 保存选择收货地址
  const onSaveAddress = detail => {
    const { name, latitude, longitude } = detail
    // 更新收货地址
    dispatch(
      setAddress({
        detail: name,
        latitude,
        longitude,
      })
    )
    onInitDetail()
    // 关闭选择收货地址
    onSetAddressShow(false)
  }

  // 当前地址
  const atAddress = useMemo(() => {
    if (address) {
      if (!address.city && !address.detail) {
        return '未能获取地址'
      }
      return address.detail
    }
  }, [address])

  // 跳转到新增地址
  const onAddAddress = () => {
    console.log(1)
  }

  return (
    <View
      className={classnames('selectaddress', {
        end: addressShow,
        start: !addressShow,
      })}
    >
      {/* navbar */}
      <NavBar onClose={onSetAddressShow} title='选择收货地址'>
        <View className='add' onClick={onAddAddress}>
          新增地址
        </View>
      </NavBar>

      {/* 选择城市,搜索地址 */}
      <SelectAddressSearch
        onOpenCity={onOpenCity}
        onSearchValue={onSearchValue}
        onInitDetail={onInitDetail}
        address={address}
        searchValue={searchValue}
      />

      {/* 搜索地址 */}
      <SelectAddressResult
        onSaveAddress={onSaveAddress}
        detailList={detailList}
      />

      {/* 当前地址 */}
      <SelectAddressAtAddress
        onLocationCity={onLocationCity}
        atAddress={atAddress}
      />

      {/* 收货地址 */}
      <SelectAddressProfile />
    </View>
  )
}

SelectAddress.defaultProps = {
  addressShow: false,
  address: {},
  onSetAddressShow: () => {},
  onSetCityShow: () => {},
  onLocationCity: () => {},
  setAddress: () => {},
}

export default SelectAddress
