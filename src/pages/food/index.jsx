import Taro from '@tarojs/taro'
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, ScrollView } from '@tarojs/components'
import { getFoodsClass, reqGetFoodsPage, reqGetMsiteShopList } from '@/src/api'
import { actionGetBatchFilter } from '@/src/redux/actions/filterShop'

import Categories from '@/src/components/Categories/Categories'
import FilterShops from '@/src/components/FilterShops/FilterShops'
import Shop from '@/src/components/Shop/Shop'
import Loading from '@/src/components/Loading/Loading'

import './index.scss'

const Food = () => {
  const dispatch = useDispatch()
  const currentAddress = useSelector(state => state.currentAddress)
  let categoriesId = useSelector(state => state.categoriesId)
  // 用户token
  const token = useSelector(state => state.token)
  // 商家列表请求参数
  const shopParams = useSelector(state => state.shopParams)
  // 筛选条数据
  const batchFilter = useSelector(state => state.batchFilter)
  // 微信 滚动/禁止滚动
  const [weiScroll, setWeiScroll] = useState(true)
  // 头部分类数据
  const [foodsPage, setFoodsPage] = useState([])
  // 当前选择的分类
  const [activeFoodPage, setActiveFoodPage] = useState({})
  // 更多分类数据
  const [foodsClass, setFoodsClass] = useState([])
  // 商家列表
  const [shopList, setShopList] = useState([])
  // 请求条初始区间 + linmit
  const [offset, setOffset] = useState(0)
  // 节流
  const [bottomFlag, setBottomFlag] = useState(true)
  // 筛选ref
  const clearRef = useRef()
  // 复位距离
  const [scTop, setscTop] = useState(0)
  // 是否还有更多
  const [isMore, setIsMore] = useState(true)

  // 用户是否登录,是否有收货地址,是否加载商家筛选条
  const isLogin = useMemo(() => {
    return token && batchFilter.sort.length > 0 && currentAddress.latitude
  }, [token, batchFilter, currentAddress])

  // 获取头部page,更多class 数据
  useEffect(() => {
    const { latitude, longitude } = currentAddress
    reqGetFoodsPage({ latitude, longitude, entry_id: categoriesId }).then(
      res => {
        if (res.code === 0) {
          setFoodsPage(res.data)
          setActiveFoodPage(res.data[0])
        }
      }
    )

    getFoodsClass({ latitude, longitude }).then(res => {
      if (res.code === 0) {
        const newData = res.data.filter(item => item.id)
        setFoodsClass(newData)
      }
    })
  }, [currentAddress, categoriesId])

  // 修改当前快捷导航选中分类
  const onfoodPage = food => {
    setActiveFoodPage(food)
  }

  // 修改当前快捷导航数据
  const onSetFoodsPage = (activeClassContent, item) => {
    setFoodsPage(activeClassContent)
    setActiveFoodPage(item)
  }

  // 获取商家列表
  useEffect(() => {
    if (isLogin && isMore) {
      reqGetMsiteShopList({
        latitude: currentAddress.latitude,
        longitude: currentAddress.longitude,
        ...shopParams,
        offset,
        id: activeFoodPage.id,
      }).then(res => {
        if (res.code === 0) {
          if (offset === 0) {
            setShopList(res.data)
          } else {
            if (res.data.length) {
              setShopList(data => [...data, ...res.data])
            } else {
              // Taro.showToast({ title: '没有更多了', icon: 'none' })
              setIsMore(false)
            }
          }
          setBottomFlag(true)
        }
      })
    }
  }, [isLogin, shopParams, currentAddress, offset, activeFoodPage, isMore])

  // 滚动到底部加载更多商家列表
  const scrolltolower = useCallback(() => {
    if (bottomFlag && isLogin) {
      setOffset(num => {
        return num + shopParams.limit
      })
      setBottomFlag(false)
    }
  }, [isLogin, bottomFlag, shopParams])

  // 清空offset
  const removeOffset = () => {
    setOffset(0)
    setIsMore(true)
    setscTop(num => {
      if (num === 0) {
        return 0.1
      } else {
        return 0
      }
    })
  }

  // 获取首页筛选条数据
  useEffect(() => {
    const { latitude, longitude } = currentAddress
    if (latitude && longitude && !batchFilter.sort.length) {
      dispatch(actionGetBatchFilter({ latitude, longitude }))
    }
  }, [dispatch, currentAddress, batchFilter])

  // 禁止滚动
  const weSetScroll = flag => {
    if (process.env.TARO_ENV === 'h5') {
      const body = document.querySelector('.food')
      if (flag) {
        body.style.overflowY = 'scroll'
      } else {
        body.style.overflowY = 'hidden'
      }
    } else {
      setWeiScroll(flag)
    }
  }

  // 关闭筛选层
  const filterClear = () => {
    const { onClear } = clearRef.current
    onClear()
  }

  return (
    <View className='food'>
      <View className='food-topbar'>
        {foodsPage.length > 0 && foodsClass.length > 0 && (
          <Categories
            foodsPage={foodsPage}
            foodsClass={foodsClass}
            categoriesId={categoriesId}
            onfoodPage={onfoodPage}
            activeFoodPage={activeFoodPage}
            onSetFoodsPage={onSetFoodsPage}
            onRemoveOffset={removeOffset}
            onFilterClear={filterClear}
          />
        )}
        <FilterShops
          ref={clearRef}
          batchFilter={batchFilter}
          weSetScroll={weSetScroll}
          onRemoveOffset={removeOffset}
        />
      </View>
      <ScrollView
        className='food-shoplist'
        scrollY={weiScroll}
        lowerThreshold={150}
        onScrollToLower={scrolltolower}
        scrollTop={scTop}
      >
        {shopList.map(shop => {
          return <Shop key={shop.restaurant.id} restaurant={shop.restaurant} />
        })}
        {!isMore && <Loading title='没有更多了...'></Loading>}
      </ScrollView>
      
    </View>
  )
}

export default Food
