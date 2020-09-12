// 首页
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { removeToken } from '../../redux/actions/user'
import API from '../../api'
import { Reducers } from '../../redux/interface'

import EScroll from '../../components/EScroll/EScroll'
import FilterBar, { FilterParams } from '../../components/FilterBar/FilterBar'
import ShopList from '../../components/ShopList/ShopList'
import ELoading from '../../components/ELoading/ELoading'
import FooterNav from '../../components/FooterNav/FooterNav'

import MsiteNavBar from './components/MsiteNavBar/MsiteNavBar'
import MsiteSearchBar from './components/SearchBar/SearchBar'
import MsiteNavSwipe from './components/NavSwipe/NavSwipe'
import MsiteAdvertising from './components/Advertising/Advertising'
import MsiteSvip from './components/Svip/Svip'
import MsiteTip from './components/Tip/Tip'

import { Ifilter, IShopList } from '../../api/interface'

import './index.scss'

const Msite = () => {
  const dispatch = useDispatch()
  const [shopList, setShopList] = useState<IShopList[]>([])
  const [scrollTop, setScrollTop] = useState(0)
  const [isScrollY, setIsScrollY] = useState(true)
  const { currentAddress, token } = useSelector((state: Reducers) => state)
  const [filterParams, setFilterParams] = useState({} as FilterParams)
  const [offset, setOffset] = useState(0)
  const [isMove, setIsMove] = useState(true)
  const isBottom = useRef(false)
  const limit = useRef(6)
  const shopLoading = useRef(false)


  // 获取商家列表
  useEffect(() => {
    if (
      isMove &&
      currentAddress.latitude &&
      currentAddress.longitude &&
      filterParams.sotr
    ) {
      shopLoading.current = false
      API.reqGetMsiteShopList({
        latitude: currentAddress.latitude,
        longitude: currentAddress.longitude,
        ...filterParams,
        offset: offset,
        limit: limit.current,
      }).then(({ err, res }) => {
        if (err) {
          if (err.code === 401) {
            dispatch(removeToken())
          }
          return
        }
        if (res.code === 0) {
          shopLoading.current = true
          if (res.data.length) {
            setShopList((data) => {
              return [...data, ...res.data]
            })
            isBottom.current = false
          } else {
            setIsMove(false)
          }
        }
      })
    }
  }, [currentAddress, offset, filterParams, isMove, dispatch])

  // 筛选参数
  const handleFilterChange = useCallback(
    (result: FilterParams) => {
      _init()
      setFilterParams(result)
    },
    [setFilterParams]
  )

  // 初始化商家数据参数
  const _init = () => {
    setIsMove(true)
    setOffset(0)
    setShopList([])
    isBottom.current = false
  }

  // 到达底部
  const handleLower = () => {
    isBottom.current = true
    if (shopLoading.current) {
      setOffset((num) => {
        return num + limit.current
      })
    }
  }
  // 商家列表下拉底部加载数据 loading
  const handleLoading = useCallback(() => {
    if (isBottom.current) {
      return (
        <ELoading
          move
          icon={isMove && shopLoading.current}
          title={
            isMove ? '正在加载...' : shopLoading.current ? '没有更多了' : ''
          }
        />
      )
    } else {
      return null
    }
  }, [isMove])

  // 定位位置
  const handleScrollTop = useCallback((top: number) => {
    setScrollTop(top + Math.random())
  }, [])
  // 是否允许滚动
  const handleIsScroll = useCallback((isScroll: boolean) => {
    setIsScrollY(isScroll)
  }, [])

  return (
    <View className='msite'>
      <EScroll
        className='msite'
        id='msite'
        scrollY={isScrollY}
        lowerThreshold={100}
        onScrollToLower={handleLower}
        scrollTop={scrollTop}
      >
        <View>
          {/* 头部定位收货地址 */}
          <MsiteNavBar />
          {/* 搜索 */}
          <MsiteSearchBar
            icon='sousuo'
            title='搜索饿了么商家、商品名称'
            url='/pages/search/index'
          />

          {/* 导航分类 */}
          <MsiteNavSwipe />

          {/* 广告 */}
          <MsiteAdvertising
            title='品质套餐'
            detail='搭配齐全吃得好'
            img='https://cube.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png'
            url='/pages/ranking'
          />

          {/* Svip */}
          <MsiteSvip />

          {/* 筛选  && 商家列表 */}
          {token && currentAddress.latitude && (
            <View id='filter'>
              <FilterBar
                title='推荐商家'
                onChange={handleFilterChange}
                onScrollTop={handleScrollTop}
                onIsScroll={handleIsScroll}
                topDomName='.searchbar'
                className='msite-filter'
              />
              <ShopList
                shopListData={shopList}
                renderLoading={handleLoading()}
              />
            </View>
          )}
          {/* 未登录 || 无收货地址 */}
          <MsiteTip />
        </View>
      </EScroll>
      {/* 底部导航 */}
      <FooterNav />
    </View>
  )
}

export default Msite
