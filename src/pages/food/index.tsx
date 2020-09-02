import Taro, { useRouter } from '@tarojs/taro'
import React, {
  useEffect,
  useState,
  Fragment,
  useCallback,
  useRef,
} from 'react'
import { useSelector } from 'react-redux'
import { View, ScrollView } from '@tarojs/components'
import API from '../../api'

import FilterBar, { FilterParams } from '../../components/FilterBar/FilterBar'
import ShopList from '../../components/ShopList/ShopList'

import Categories from '../../components/Categories/Categories'

import ELoading from '../../components/ELoading/ELoading'
import { Ifilter, IShopList, FoodsPage, FoodsClass } from '../../api/interface'
import { Reducers } from '../../redux/interface'

import './index.scss'

const Food = () => {
  const router = useRouter()
  const { currentAddress, token } = useSelector((state: Reducers) => state)
  // 头部分类数据
  const [foodsPage, setFoodsPage] = useState<FoodsPage[]>([])
  // 当前选择的分类
  const [activeFoodPage, setActiveFoodPage] = useState({})
  // 更多分类数据
  const [foodsClass, setFoodsClass] = useState<FoodsClass[]>([])

  const [shopList, setShopList] = useState<IShopList[]>([])
  const [filterData, setFilterData] = useState({} as Ifilter)
  const [filterParams, setFilterParams] = useState({} as FilterParams)
  const [isMove, setIsMove] = useState(true)
  const [offset, setOffset] = useState(0)
  const shopLoading = useRef(false)
  const limit = useRef(6)
  const isBottom = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [isScrollY, setIsScrollY] = useState(true)
  const [shadeShow, setShadeShow] = useState(true)

  // 获取头部page,更多class 数据
  useEffect(() => {
    const { latitude, longitude } = currentAddress
    const { params } = router
    if (latitude && longitude) {
      Promise.all([
        API.reqGetFoodsPage({ latitude, longitude, entry_id: params.id }),
        API.reqGetFoodsClass({ latitude, longitude }),
      ]).then((resArr) => {
        const [resFoodsPages, resFoodsClass] = resArr
        const { err: pagesErr, res: pagesRes } = resFoodsPages
        const { err: classErr, res: classRes } = resFoodsClass

        if (pagesErr || classErr) {
          console.log(pagesErr)
          Taro.showToast({ title: '请先登录', icon: 'none', duration: 1500 })
          setTimeout(() => {
            Taro.reLaunch({ url: '/pages/login/index' })
          }, 1500)
          return
        }

        if (pagesRes.code === 0) {
          setFoodsPage(pagesRes.data)
          setActiveFoodPage(pagesRes.data[0])
        }

        if (classRes.code === 0) {
          const newData = classRes.data.filter((item) => item.id)
          setFoodsClass(newData)
        }
      })
    }
  }, [currentAddress, router])

  // 修改当前快捷导航选中分类
  const onfoodPage = useCallback((food) => {
    setActiveFoodPage(food)
    _init()
  }, [])

  // 修改当前快捷导航数据
  const onSetFoodsPage = useCallback((activeClassContent, item) => {
    setFoodsPage(activeClassContent)
    setActiveFoodPage(item)
  }, [])

  // 关闭筛选层
  const filterClear = () => {
    setShadeShow(!shadeShow)
  }

  // 初始数据
  const removeOffset = () => {}

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
    _getFilter()
  }, [])

  // 获取商家列表
  useEffect(() => {
    let foodPageId
    if (activeFoodPage) {
      foodPageId = activeFoodPage.id
    } else {
      foodPageId = true
    }
    if (
      isMove &&
      currentAddress.latitude &&
      currentAddress.longitude &&
      filterParams.sotr &&
      foodPageId
    ) {
      shopLoading.current = false
      API.reqGetMsiteShopList({
        latitude: currentAddress.latitude,
        longitude: currentAddress.longitude,
        ...filterParams,
        offset: offset,
        limit: limit.current,
        classPage: foodPageId === true ? null : activeFoodPage.id,
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
  }, [currentAddress, offset, filterParams, isMove, activeFoodPage])
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

  // 定位位置
  const handleScrollTop = useCallback((top: number) => {
    setScrollTop(top + Math.random())
  }, [])
  // 是否允许滚动
  const handleIsScroll = useCallback((isScroll: boolean) => {
    setIsScrollY(isScroll)
  }, [])
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

  // 到达底部
  const handleLower = () => {
    isBottom.current = true
    if (shopLoading.current) {
      setOffset((num) => {
        return num + limit.current
      })
    }
  }

  return (
    <ScrollView
      className='food'
      scrollY={isScrollY}
      scrollTop={scrollTop}
      lowerThreshold={100}
      onScrollToLower={handleLower}
    >
      <View className='food-topbar'>
        {foodsPage.length > 0 && foodsClass.length > 0 && (
          <Categories
            foodsPage={foodsPage}
            foodsClass={foodsClass}
            onfoodPage={onfoodPage}
            activeFoodPage={activeFoodPage}
            onSetFoodsPage={onSetFoodsPage}
            onRemoveOffset={removeOffset}
            onFilterClear={filterClear}
          />
        )}
        {token && currentAddress.latitude && (
          <Fragment>
            {console.log()}
            <FilterBar
              filterData={filterData}
              onChange={handleFilterChange}
              onScrollTop={handleScrollTop}
              onIsScroll={handleIsScroll}
              className={!activeFoodPage ? 'no-page' : 'food-filterbar'}
              clearShade={shadeShow}
            />
            <ShopList shopListData={shopList} renderLoading={handleLoading()} />
          </Fragment>
        )}
      </View>
    </ScrollView>
  )
}

export default Food
