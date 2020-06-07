// 首页
import Taro, { usePageScroll } from '@tarojs/taro'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'

import { reqNavList } from '@/src/api'
import { initCurrentAddress } from '@/src/redux/actions/user'
import { actionGetBatchFilter } from '@/src/redux/actions/filterShop'
import FooterBar from '@/src/components/FooterBar/FooterBar'
import TipNull from '@/src/components/TipNull/TipNull'

import FilterShops from '@/src/components/FilterShops/FilterShops'
import MsiteHeader from './components/Header/Header'
import MsiteSelectAddress from './components/SelectAddress/SelectAddress'
import MsiteSelectCity from './components/SelectCity/SelectCity'
import MsiteSwiper from './components/NavSwiper/NavSwiper'
import MsiteAdvertising from './components/Advertising/Advertising'
import MsiteSvip from './components/Svip/Svip'

import './index.scss'

const Msite = () => {
  // 当前用户收货地址
  const currentAddress = useSelector(state => state.currentAddress)
  // 首页筛选条数据
  const batchFilter = useSelector(state => state.batchFilter)
  const token = useSelector(state => state.token)
  // dispatch
  const dispatch = useDispatch()
  // 导航数据
  const [navList, setNavList] = useState([])
  // 收货地址 默认:隐藏
  const [addressShow, setAddressShow] = useState(false)
  // 城市选择 默认:隐藏
  const [cityShow, setCityShow] = useState(false)
  // 初始化 商家top值
  const [initTop, setInitTop] = useState(0)
  const [top, setTop] = useState(0)

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
    dispatch(initCurrentAddress())
  }, [dispatch])

  // 获取导航
  const getNavSwiper = useCallback(async () => {
    const { latitude, longitude } = currentAddress
    const result = await reqNavList({ latitude, longitude })
    if (result.code === 0) {
      setNavList(result.data)
    } else {
      Taro.showToast({ title: result.message, icon: 'none' })
    }
  }, [currentAddress])

  // 获取ip地址 经纬度
  useEffect(() => {
    // 不存在地址则重新获取
    if (!currentAddress.latitude && !currentAddress.longitude) {
      onLocationCity()
    }
  }, [onLocationCity, currentAddress])

  // 获取导航数据
  useEffect(() => {
    getNavSwiper()
  }, [getNavSwiper])

  // 跳转登录
  const goLogin = () => {
    Taro.redirectTo({ url: '/pages/login/index' })
  }

  // 获取首页筛选条数据
  const getBatchFilter = useCallback(() => {
    const { latitude, longitude } = currentAddress
    if (latitude && longitude) {
      dispatch(actionGetBatchFilter({ latitude, longitude }))
    }
  }, [dispatch, currentAddress])
  useEffect(() => {
    getBatchFilter()
  }, [getBatchFilter])

  // 获取筛选据顶部距离
  const getFilterTop = () => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery()
      query.select('#filtershops').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(res => {
        if (res[0]) {
          const domTop = res[0].top
          if (initTop === 0) {
            setInitTop(domTop)
          }
        }
      })
    }, 0)
  }
  useEffect(() => {
    getFilterTop()
  })

  // 设置滚动条位置,每次要不同值否则无效
  const onFilterTop = () => {
    const myInitTop = initTop + 1
    if (initTop === top) {
      setTop(myInitTop)
    } else {
      setTop(myInitTop - 1)
    }
  }

  return (
    <ScrollView scrollY scrollTop={top} className='msite'>
      {/* 头部地址,搜索 */}
      <MsiteHeader
        onSetAddressShow={onSetAddressShow}
        currentAddress={currentAddress}
      />

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

      <View className='list-title'>推荐商家</View>
      {/*登录渲染商家筛选及列表 */}
      {token && batchFilter.outside && (
        <>
          <FilterShops batchFilter={batchFilter} onFilterTop={onFilterTop} />
          <View style={{ background: 'red', height: '100vh' }}></View>
        </>
      )}

      {/* 未登录提示登录 */}
      {!token && (
        <TipNull
          img='//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png'
          title='没有结果'
          contentText='登录后查看更多商家'
          buttonText='登录'
          onButtonClick={goLogin}
        />
      )}

      {/* 无收货地址 */}
      {!currentAddress.city && (
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
    </ScrollView>
  )
}

Msite.defaultProps = {
  setCurrentAddress: () => {},
  address: {},
}

export default Msite
