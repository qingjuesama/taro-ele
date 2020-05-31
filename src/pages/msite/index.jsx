// 首页
import React, { useEffect, useState, useCallback } from 'react'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'

import { reqNavList } from '@/src/api'
import { initAddress } from '@/src/redux/actions/address'
import FooterBar from '@/src/components/FooterBar/FooterBar'
import TipNull from '@/src/components/TipNull/TipNull'

import MsiteHeader from './components/Header/Header'
import MsiteSelectAddress from './components/SelectAddress/SelectAddress'
import MsiteSelectCity from './components/SelectCity/SelectCity'
import MsiteSwiper from './components/NavSwiper/NavSwiper'
import MsiteAdvertising from './components/Advertising/Advertising'
import MsiteSvip from './components/Svip/Svip'

import './index.scss'

const Msite = () => {
  // reducers
  const address = useSelector(state => state.address)
  // dispatch
  const dispatch = useDispatch()
  // 导航数据
  const [navList, setNavList] = useState([])
  // 收货地址 默认:隐藏
  const [addressShow, setAddressShow] = useState(false)
  // 城市选择 默认:隐藏
  const [cityShow, setCityShow] = useState(false)

  // 收货地址 显示/隐藏
  const onSetAddressShow = flag => {
    setAddressShow(flag)
  }
  // 城市选择 显示/隐藏
  const onSetCityShow = flag => {
    setCityShow(flag)
  }

  // 获取城市 经纬度及城市
  const onLocationCity = useCallback(() => {
    dispatch(initAddress())
  }, [dispatch])

  // 获取导航
  const getNavSwiper = useCallback(async () => {
    const { latitude, longitude } = address
    const result = await reqNavList({ latitude, longitude })
    if (result.code === 0) {
      const { entries } = result.data[1]
      setNavList(entries)
    }
  }, [address])

  // 获取ip地址 经纬度 
  useEffect(() => {
    // 不存在地址则重新获取
    if (!address.latitude && !address.longitude) {
      onLocationCity()
    }
  }, [onLocationCity, address])

  // 获取导航数据
  useEffect(() => {
    getNavSwiper()
  }, [getNavSwiper])

  return (
    <View className='msite'>
      {/* 头部地址,搜索 */}
      <MsiteHeader onSetAddressShow={onSetAddressShow} address={address} />

      {address.city ? (
        <View className='content'>
          {/* switch 导航 */}
          <MsiteSwiper navList={navList} />
          {/* 广告 */}
          <MsiteAdvertising
            title='品质套餐'
            detail='搭配齐全吃得好'
            img='https://cube.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png'
            url='/pages/ranking'
          />
          {/* Svip */}
          <MsiteSvip />

          {/* 推荐商家 */}
          <View className='list-title'>推荐商家</View>

          <TipNull
            img='//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png'
            title='没有结果'
            contentText='登录后查看更多商家'
            buttonText='登录'
            onButtonClick={() => onSetAddressShow(true)}
          />
        </View>
      ) : (
        // 无收货地址
        <TipNull
          img='//fuss10.elemecdn.com/2/67/64f199059800f254c47e16495442bgif.gif'
          title='输入地址后才能订餐哦!'
          buttonText='手动选择地址'
          onButtonClick={() => onSetAddressShow(true)}
        />
      )}

      {/* 选择收货地址 */}
      <MsiteSelectAddress
        addressShow={addressShow}
        onSetAddressShow={onSetAddressShow}
        onSetCityShow={onSetCityShow}
        onLocationCity={onLocationCity}
      />

      {/* 选择城市 */}
      <MsiteSelectCity cityShow={cityShow} onSetCityShow={onSetCityShow} />

      {/* 底部bar */}
      <FooterBar />
    </View>
  )
}

Msite.defaultProps = {
  setAddress: () => {},
  address: {},
}

export default Msite
