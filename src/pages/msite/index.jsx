// 首页
import Taro, { usePageScroll } from '@tarojs/taro'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'

import { reqNavList, reqGetMsiteShopList } from '@/src/api'
import { initCurrentAddress } from '@/src/redux/actions/user'
import {
  actionGetBatchFilter,
  actionShopParams,
  actionCategoriesId,
} from '@/src/redux/actions/filterShop'
import FooterBar from '@/src/components/FooterBar/FooterBar'
import TipNull from '@/src/components/TipNull/TipNull'
import Shop from '@/src/components/Shop/Shop'

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
  // 请求商品列表参数
  const shopParams = useSelector(state => state.shopParams)
  // dispatch
  const dispatch = useDispatch()
  // 导航数据
  const [navList, setNavList] = useState([])
  // 商家列表数据
  const [shopList, setShopList] = useState([])
  // 收货地址 默认:隐藏
  const [addressShow, setAddressShow] = useState(false)
  // 城市选择 默认:隐藏
  const [cityShow, setCityShow] = useState(false)
  // 初始化 商家top值
  const [initTop, setInitTop] = useState(0)
  const [top, setTop] = useState(0)
  // 滚动/禁止滚动
  const [weiScroll, setWeiScroll] = useState(true)
  // 节流
  const [bottomFlag, setBottomFlag] = useState(false)

  // 用户是否登录,是否有收货地址,是否加载商家筛选条
  const isLogin = useMemo(() => {
    return token && batchFilter.sort.length > 0 && currentAddress.latitude
  }, [token, batchFilter, currentAddress])

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

  // 获取ip地址 经纬度
  useEffect(() => {
    // 不存在地址则重新获取
    if (!currentAddress.latitude && !currentAddress.longitude) {
      onLocationCity()
    }
  }, [onLocationCity, currentAddress])

  // 获取导航数据
  useEffect(() => {
    const { latitude, longitude } = currentAddress
    if (latitude && longitude) {
      reqNavList({ latitude, longitude }).then(res => {
        if (res.code === 0) {
          setNavList(res.data)
        } else {
          Taro.showToast({ title: res.message, icon: 'none' })
        }
      })
    }
  }, [currentAddress])

  // 跳转登录
  const goLogin = () => {
    Taro.redirectTo({ url: '/pages/login/index' })
  }

  // 跳转商家列表
  const goFood = navItem => {
    dispatch(actionCategoriesId(navItem.id))
    Taro.redirectTo({ url: '/pages/food/index' })
  }

  // 获取首页筛选条数据
  useEffect(() => {
    const { latitude, longitude } = currentAddress
    if (latitude && longitude && !batchFilter.sort.length) {
      dispatch(actionGetBatchFilter({ latitude, longitude }))
    }
  }, [dispatch, currentAddress, batchFilter])

  // 获取筛选据顶部距离
  useEffect(() => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery()
      query.select('#filtershops').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(res => {
        if (res[0]) {
          const domTop = res[0].top
          if (initTop === 0) {
            setInitTop(domTop + 2)
          }
        }
      })
    }, 0)
  })

  // 设置滚动条位置,每次要不同值否则无效
  const onFilterTop = () => {
    const myInitTop = initTop - 1
    if (initTop === top) {
      setTop(myInitTop)
    } else {
      setTop(myInitTop + 1)
    }
  }

  // 禁止滚动
  const weSetScroll = flag => {
    if (process.env.TARO_ENV === 'h5') {
      const body = document.querySelector('.msite')
      if (flag) {
        body.style.overflowY = 'scroll'
      } else {
        body.style.overflowY = 'hidden'
      }
    }
    setWeiScroll(flag)
  }

  // 获取商家列表
  useEffect(() => {
    if (isLogin && currentAddress.latitude && currentAddress.longitude) {
      reqGetMsiteShopList({
        latitude: currentAddress.latitude,
        longitude: currentAddress.longitude,
        ...shopParams,
      }).then(res => {
        if (res.code === 0) {
          if (shopParams.offset === 0) {
            setShopList(res.data)
          } else {
            if (res.data.length) {
              setShopList(data => [...data, ...res.data])
            } else {
              Taro.showToast({ title: '没有更多了', icon: 'none' })
            }
          }
          setBottomFlag(true)
        }
      })
    }
  }, [isLogin, shopParams, currentAddress])

  // 滚动到底部加载更多商家列表
  const scrolltolower = useCallback(() => {
    if (bottomFlag && isLogin) {
      dispatch(
        // 0 8 16 24 32 40
        actionShopParams({ offset: shopParams.offset + shopParams.limit })
      )
      setBottomFlag(false)
    }
  }, [dispatch, isLogin, bottomFlag, shopParams])

  return (
    <ScrollView
      scrollY={weiScroll}
      scrollTop={top}
      className='msite'
      lowerThreshold={100}
      onScrollToLower={scrolltolower}
    >
      <View className='msite-main'>
        {/* 头部地址,搜索 */}
        <MsiteHeader
          onSetAddressShow={onSetAddressShow}
          currentAddress={currentAddress}
        />

        {/* switch 导航 */}
        <MsiteSwiper navList={navList} onGoFood={goFood} />

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
        {isLogin && (
          <>
            <FilterShops
              batchFilter={batchFilter}
              onFilterTop={onFilterTop}
              weSetScroll={weSetScroll}
            />
            <View className='shop-list'>
              {shopList.map(shop => {
                return (
                  <Shop key={shop.restaurant.id} restaurant={shop.restaurant} />
                )
              })}

              {/* <Loading title='加载中...' /> */}
            </View>
          </>
        )}

        {/* 未登录提示登录 */}
        {!isLogin && (
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
      </View>
    </ScrollView>
  )
}

Msite.defaultProps = {
  setCurrentAddress: () => {},
  address: {},
}

export default Msite
