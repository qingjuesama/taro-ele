import Taro, { Current, useDidShow } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, ScrollView } from '@tarojs/components'
import { getFoodsClass, reqGetFoodsPage } from '@/src/api'
import {
  actionCategoriesId,
  actionGetBatchFilter,
} from '@/src/redux/actions/filterShop'

import Categories from '@/src/components/Categories/Categories'
import FilterShops from '@/src/components/FilterShops/FilterShops'

import './index.scss'

const Food = () => {
  const dispatch = useDispatch()
  const currentAddress = useSelector(state => state.currentAddress)
  let categoriesId = useSelector(state => state.categoriesId)
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

  useEffect(() => {
    let { latitude, longitude } = currentAddress

    // latitude = 41.67718
    // longitude = 123.4631
    // categoriesId = 20133249
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

  return (
    <ScrollView scrollY={weiScroll} className='food'>
      {foodsPage.length > 0 && foodsClass.length > 0 && (
        <Categories
          foodsPage={foodsPage}
          foodsClass={foodsClass}
          categoriesId={categoriesId}
          onfoodPage={onfoodPage}
          activeFoodPage={activeFoodPage}
          onSetFoodsPage={onSetFoodsPage}
        />
      )}
      <FilterShops batchFilter={batchFilter} weSetScroll={weSetScroll} />
      <View style={{ height: '500px', background: 'red' }}></View>
      <View style={{ height: '500px', background: 'blue' }}></View>
    </ScrollView>
  )
}

export default Food
