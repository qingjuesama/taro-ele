// 选择收货地址
import Taro, { useDidShow } from '@tarojs/taro'
import React, { FC, useState, useMemo, Fragment } from 'react'
import { ScrollView } from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'
import { BaseEventOrig } from '@tarojs/components/types/common'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserAddressList,
  setCurrentAddress,
  initCurrentAddress,
  removeUserAddress,
} from '../../redux/actions/user'
import API from '../../api'
import { Address as AddressInterface } from '../../api/interface'
import { Reducers } from '../../redux/interface'
import NavBar from '../../components/NavBar/NavBar'

import AddressSearch from './components/Search/Search'
import AddressResult from './components/Result/Result'
import AddressAtAddress from './components/AtAddress/AtAddress'
import AddressProfile from './components/Profile/Profile'

import './index.scss'

const Address: FC = () => {
  const dispatch = useDispatch()
  // 当前地址  收货地址列表
  const { currentAddress, userAddressList, token } = useSelector(
    (state: Reducers) => state
  )

  // 搜索关键字
  const [searchValue, setSearchValue] = useState('')
  // 搜索地址列表
  const [detailList, setDetailList] = useState<AddressInterface[]>([])

  // 搜索详细地址
  const onSearchValue = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    let { value } = e.detail
    if (!value.trim()) {
      return onInitDetail()
    }
    setSearchValue(value)
    getDetila(value)
  }

  // 发送请求获取详细地址
  const getDetila = async (value: string) => {
    const { latitude, longitude } = currentAddress
    const { err, res } = await API.reqAddressDetail({
      keyword: value,
      offset: 0,
      limit: 20,
      latitude,
      longitude,
    })

    if (err) {
      return
    }

    if (res.code === 0) {
      setDetailList(res.data)
    }
  }

  // 初始化搜索状态
  const onInitDetail = () => {
    // 清空搜索内容
    setSearchValue('')
    // 清空列表数据
    setDetailList([])
  }

  // 保存选择收货地址
  const onSaveAddress = (detail: AddressInterface) => {
    const { name, latitude, longitude } = detail
    //商家列表更新参数 更新收货地址
    dispatch(
      setCurrentAddress({
        address: name,
        latitude,
        longitude,
      })
    )
    onInitDetail()
    handleBackMiste()
  }

  useDidShow(() => {
    dispatch(getUserAddressList())
  })

  // 当前地址
  const atAddress = useMemo(() => {
    if (!currentAddress?.city && !currentAddress?.address) {
      return '未能获取地址'
    }
    return currentAddress.address
  }, [currentAddress])

  // 用户选择地址
  const handleUserAddress = (userAddress: AddressInterface) => {
    dispatch(setCurrentAddress(userAddress))
    handleBackMiste()
  }

  // 重新获取定位地址
  const handleIpAddress = () => {
    dispatch(initCurrentAddress())
  }

  // 返回首页
  const handleBackMiste = () => {
    Taro.reLaunch({ url: '/pages/msite/index' })
  }

  // 跳转新增地址
  const handleOpenAdd = () => {
    dispatch(removeUserAddress())
    Taro.navigateTo({ url: '/pages/profile/address/add/index' })
  }

  return (
    <Fragment>
      {/* navbar */}
      <NavBar
        title='选择收货地址'
        icon='fanhui'
        onIconClick={handleBackMiste}
        rightText={token && '新增地址'}
        rightHref={token && handleOpenAdd}
      />
      <ScrollView scrollY className={classnames('selectaddress')}>
        {/* 搜索 */}
        <AddressSearch
          cityUrl='/pages/city/index'
          currentAddress={currentAddress}
          onInput={onSearchValue}
          searchValue={searchValue}
          onDelSearch={onInitDetail}
        />

        {/* 搜索地址结果 */}
        <AddressResult detailList={detailList} onSaveAddress={onSaveAddress} />

        {!searchValue && (
          <Fragment>
            {/* 当前地址 */}
            <AddressAtAddress
              atAddress={atAddress}
              onLocationCity={handleIpAddress}
            />

            {/* 收货地址 */}
            {userAddressList.length > 0 && (
              <AddressProfile
                userAddressList={userAddressList}
                onClick={handleUserAddress}
              />
            )}
          </Fragment>
        )}
      </ScrollView>
    </Fragment>
  )
}

export default Address
