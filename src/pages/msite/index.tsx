// 首页
import Taro from '@tarojs/taro'
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Fragment,
} from 'react'
import { View, ScrollView, Navigator } from '@tarojs/components'
import { useSelector } from 'react-redux'
import API from '../../api'
import { Reducers } from '../../redux/interface'

import NavBar from '../../components/NavBar/NavBar'
import EIcon from '../../components/EIcon/EIcon'
import FilterBar, { FilterParams } from '../../components/FilterBar/FilterBar'
import ShopList from '../../components/ShopList/ShopList'
import ELoading from '../../components/ELoading/ELoading'
import NoDataTip from '../../components/NoDataTip/NoDataTip'
import FooterNav from '../../components/FooterNav/FooterNav'

import MsiteSearchBar from './components/SearchBar/SearchBar'
import MsiteNavSwipe from './components/NavSwipe/NavSwipe'
import MsiteAdvertising from './components/Advertising/Advertising'
import MsiteSvip from './components/Svip/Svip'


import { Ifilter, IShopList } from '../../api/interface'

import './index.scss'

const Msite = () => {
  const [navSwipeList, setNavSwipeList] = useState([])
  const [filterData, setFilterData] = useState({} as Ifilter)
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

  // 导航
  const _getNavList = async () => {
    const params = {
      latitude: 41.138329,
      longitude: 123.052798,
    }
    const { err, res } = await API.reqNavList(params)
    if (err) {
      console.log(err)
      return
    }

    if (res.code === 0) {
      setNavSwipeList(res.data)
    }
  }
  // 筛选
  const _getFilter = async () => {
    const { err, res } = await API.reqGetBatchFilter()
    if (err) {
      if (err.code === 401) {
        console.log(err.message)
      }
      return
    }

    if (res.code === 0) {
      setFilterData(res.data)
    }
  }

  useEffect(() => {
    _getNavList()
    _getFilter()
  }, [])

  // 获取商家列表
  useEffect(() => {
    if (
      isMove &&
      currentAddress.latitude &&
      currentAddress.longitude &&
      filterParams.sotr &&
      navSwipeList.length > 0
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
          console.log(err)
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
  }, [currentAddress, offset, filterParams, isMove, navSwipeList])

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

  // 跳转到登录
  const handleToLogin = () => {
    Taro.reLaunch({ url: '/pages/login/index' })
  }
  // 跳转到选择地址
  const handleSelectAddress = () => {
    Taro.reLaunch({ url: '/pages/address/index' })
  }

  return (
    <ScrollView
      className='msite'
      id='msite'
      scrollY={isScrollY}
      scrollTop={scrollTop}
      lowerThreshold={100}
      onScrollToLower={handleLower}
    >
      <View>
        <NavBar className='msite-navbar'>
          <EIcon type='daohangdizhi' size={34} color='#fff' />
          <Navigator
            url='/pages/address/index'
            openType='redirect'
            className='msite-navbar-title ellipsis'
          >
            {currentAddress.address}
          </Navigator>
          <EIcon type='xiajiantou' size={16} color='#fff' />
        </NavBar>
        <MsiteSearchBar
          icon='sousuo'
          title='搜索饿了么商家、商品名称'
          url='/pages/search/index'
        />
        <MsiteNavSwipe navSwipeList={navSwipeList} />
        <MsiteAdvertising
          title='品质套餐'
          detail='搭配齐全吃得好'
          img='https://cube.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png'
          url='/pages/ranking'
        />
        <MsiteSvip />
        {token && currentAddress.latitude && (
          <Fragment>
            <FilterBar
              title='推荐商家'
              filterData={filterData}
              onChange={handleFilterChange}
              onScrollTop={handleScrollTop}
              onIsScroll={handleIsScroll}
              topDomName='.searchbar'
              className='msite-filter'
            />
            <ShopList shopListData={shopList} renderLoading={handleLoading()} />
          </Fragment>
        )}
        {!token && currentAddress.latitude && (
          <NoDataTip
            className='nologin'
            img='//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png'
            title='没有结果'
            info='登录后查看更多商家'
            btnContent='登录'
            onButtonClick={handleToLogin}
          />
        )}

        {!currentAddress.latitude && (
          <NoDataTip
            className='nologin'
            img='//fuss10.elemecdn.com/2/67/64f199059800f254c47e16495442bgif.gif'
            title='输入地址后才能订餐哦'
            btnContent='手动选择地址'
            onButtonClick={handleSelectAddress}
          />
        )}
        <FooterNav />
      </View>
    </ScrollView>
  )
}

export default Msite
