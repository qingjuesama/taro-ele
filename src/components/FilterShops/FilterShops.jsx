import React, { useState } from 'react'
import classnames from 'classnames'
import { View, Text, Image } from '@tarojs/components'
import imgUrl from '@/src/utils/imgUrl'
import {
  actionUpNavSort,
  actionUpDistance,
  actionUpSales,
  actionUpFilter,
  actionShopParams,
} from '@/src/redux/actions/filterShop'
import { useDispatch } from 'react-redux'

import './FilterShops.scss'

const FilterShops = ({ batchFilter, onFilterTop, weSetScroll }) => {
  const { nav, sort, filter } = batchFilter
  const [myFilter, setMyFilter] = useState(() => {
    // 深拷贝
    const str = JSON.stringify(filter)
    return JSON.parse(str)
  })
  const dispatch = useDispatch()
  // 排序 状态
  const [sortHide, setSortHide] = useState(true)
  // 筛选 状态
  const [filterHide, setFilterHide] = useState(true)

  // 打开/关闭 综合排序
  const handleOpenSort = () => {
    sortHide && onFilterTop && onFilterTop()
    setSortHide(data => !data)
    setFilterHide(true)
    weSetScroll(!sortHide)
  }

  // 选中综合排序
  const handleSortItem = item => {
    // 增加选中状态
    item.active = true
    dispatch(actionUpNavSort(item))
    handleClear()
    dispatch(actionShopParams({ sort: item.value, offset: 0 }))
  }

  // 选中/取消 距离最近
  const handleDistance = () => {
    if (nav.distance.active) {
      dispatch(actionUpDistance({ ...nav.distance, active: false }))
      dispatch(actionShopParams({ distance: '', offset: 0 }))
    } else {
      dispatch(actionUpDistance({ ...nav.distance, active: true }))
      dispatch(actionShopParams({ distance: nav.distance.value, offset: 0 }))
    }
    handleClear()
  }

  // 选中/取消 销量最高
  const handleSales = () => {
    if (nav.sales.active) {
      dispatch(actionUpSales({ ...nav.sales, active: false }))
      dispatch(actionShopParams({ sales: '', offset: 0 }))
    } else {
      dispatch(actionUpSales({ ...nav.sales, active: true }))
      dispatch(actionShopParams({ sales: nav.sales.value, offset: 0 }))
    }
    handleClear()
  }

  // 打开/关闭 筛选
  const handleOpenFilter = () => {
    filterHide && onFilterTop && onFilterTop()
    setFilterHide(data => !data)
    setSortHide(true)
    weSetScroll(!filterHide)
  }

  // 商家服务
  const activeServe = item => {
    item.active = !item.active
    setMyFilter(data => ({ ...data }))
  }

  // 优惠活动
  const activeActivity = item => {
    myFilter.activity.main.forEach(activity => {
      activity.active = false
    })
    item.active = true
    setMyFilter(data => ({ ...data }))
  }

  // 人均消费
  const activeExpenditure = item => {
    myFilter.expenditure.main.forEach(expenditure => {
      expenditure.active = false
    })
    item.active = true
    setMyFilter(data => ({ ...data }))
  }

  // 关闭排序,筛选层,恢复滚动条
  const handleClear = () => {
    setSortHide(true)
    setFilterHide(true)
    weSetScroll(true)
  }

  // 筛选是否有被选中的的都选项
  const isFilterActive = atFilter => {
    const newList = [
      ...atFilter.activity.main,
      ...atFilter.expenditure.main,
      ...atFilter.serve.main,
    ]
    const flag = newList.some(item => item.active === true)
    return flag
  }

  // 提交筛选
  const filterSubmit = () => {
    dispatch(actionUpFilter(myFilter))
    handleClear()

    // 商家服务
    const serves = myFilter.serve.main.reduce((pre, item) => {
      if (item.active) {
        pre.push(item.value)
      }
      return pre
    }, [])
    // 优惠活动
    const activity = myFilter.activity.main.find(item => item.active)
    // 人均消费
    const expenditure = myFilter.expenditure.main.find(item => item.active)
    const filterParams = {
      serves,
      activity: activity.value ? activity.value : '',
      expenditure: expenditure.value ? expenditure.value : '',
      offset: 0,
    }
    dispatch(actionShopParams(filterParams))
  }

  // 清空筛选选项
  const resetFilterActive = () => {
    const newList = [
      ...myFilter.activity.main,
      ...myFilter.expenditure.main,
      ...myFilter.serve.main,
    ]
    newList.forEach(item => (item.active = false))
    setMyFilter(data => ({ ...data }))
  }

  return (
    <View id='filtershops'>
      <View className='filtershops'>
        <View className='filtershops-head'>
          <View className='filtershops-head-item' onClick={handleOpenSort}>
            <Text
              className={classnames('title', {
                active: nav.sort.active,
                atactive: !sortHide,
              })}
            >
              {nav.sort.name}
            </Text>
            <Text
              className={classnames(
                'icon icon-xiajiantou filtershops-xiajiantou',
                {
                  atactive: !sortHide,
                }
              )}
            ></Text>
          </View>
          <View className='filtershops-head-item' onClick={handleDistance}>
            <Text
              className={classnames('title', {
                active: nav.distance.active,
              })}
            >
              {nav.distance.name}
            </Text>
          </View>
          <View className='filtershops-head-item' onClick={handleSales}>
            <Text
              className={classnames('title', {
                active: nav.sales.active,
              })}
            >
              {nav.sales.name}
            </Text>
          </View>
          <View className='filtershops-head-item' onClick={handleOpenFilter}>
            <Text
              className={classnames('title', {
                atactive: !filterHide,
                active: isFilterActive(filter),
              })}
            >
              {nav.filter.name}
            </Text>
            <Text
              className={classnames('icon icon-funnel filtershops-funnel', {
                atactive: !filterHide,
                active: isFilterActive(filter),
              })}
            ></Text>
          </View>
        </View>
        {/* 排序 */}
        <View
          className={classnames('filtershops-sort', {
            'ele-hide': sortHide,
          })}
        >
          {sort.map(item => {
            return (
              <View
                className={classnames('sort-item', {
                  atactive: item.value === nav.sort.value,
                })}
                key={item.value}
                onClick={() => handleSortItem(item)}
              >
                {item.name}
              </View>
            )
          })}
        </View>
        {/* 筛选 */}
        <View
          className={classnames('filtershops-filter', {
            'ele-hide': filterHide,
          })}
        >
          {/* 商家服务 */}
          <View className='filter-item'>
            <View className='filter-item-title'>{filter.serve.title}</View>
            <View className='filter-item-main'>
              {myFilter.serve.main.map(item => {
                return (
                  <View
                    className={classnames('filter-item-main-item', {
                      'filter-active': item.active,
                    })}
                    key={item.id}
                    onClick={() => activeServe(item)}
                  >
                    {item.active}
                    <View className='filter-item-main-item-icon'>
                      <Image
                        src={imgUrl(item.icon)}
                        className='filter-item-main-item-icon-img'
                      />
                    </View>
                    <View className='filter-item-main-item-name'>
                      {item.name}
                    </View>
                  </View>
                )
              })}
            </View>
          </View>

          {/* 优惠活动 */}
          <View className='filter-item'>
            <View className='filter-item-title'>{filter.activity.title}</View>
            <View className='filter-item-main'>
              {myFilter.activity.main.map(item => {
                return (
                  <View
                    className={classnames('filter-item-main-item', {
                      'filter-active': item.active,
                    })}
                    key={item.id}
                    onClick={() => activeActivity(item)}
                  >
                    <View className='filter-item-main-item-name'>
                      {item.name}
                    </View>
                  </View>
                )
              })}
            </View>
          </View>

          {/* 人均消费 */}
          <View className='filter-item'>
            <View className='filter-item-title'>
              {filter.expenditure.title}
            </View>
            <View className='filter-item-main'>
              {myFilter.expenditure.main.map(item => {
                return (
                  <View
                    className={classnames('filter-item-main-item', {
                      'filter-active': item.active,
                    })}
                    key={item.id}
                    onClick={() => activeExpenditure(item)}
                  >
                    <View className='filter-item-main-item-name'>
                      {item.name}
                    </View>
                  </View>
                )
              })}
            </View>
          </View>

          <View className='ressub'>
            <View
              className={classnames('ressub-reset', {
                'reset-active': isFilterActive(myFilter),
              })}
              onClick={resetFilterActive}
            >
              清空
            </View>
            <View className='ressub-submit' onClick={filterSubmit}>
              确定
            </View>
          </View>
        </View>
      </View>
      <View
        className={classnames('shade', {
          'ele-hide': filterHide && sortHide,
        })}
        onClick={handleClear}
      ></View>
    </View>
  )
}

export default FilterShops
