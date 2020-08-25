import React, {
  FC,
  Fragment,
  useState,
  useMemo,
  useEffect,
  useRef,
} from 'react'
import { View, Text, Image } from '@tarojs/components'
import classnames from 'classnames'

import imgUrl from '../../../src/utils/imgUrl'
import { H5 } from '../../config/base'
import getDom from '../../utils/getDom'

import EIcon from '../EIcon/EIcon'
import Etransition from '../ETransition/ETransition'
import ELoading from '../ELoading/ELoading'

import { Ifilter, INavAndSort, IFilterMain } from '../../api/interface'
import './FilterBar.scss'

interface FilterBarProps {
  title?: string
  filterData: Ifilter
  onChange: (result: any) => void
  onScrollTop?: (top: number) => void
  onIsScroll: (isScroll: boolean) => void
}

export interface FilterParams {
  sotr: string
  distance: string
  sales: string
  serves: string[]
  activity: string
  expenditure: string
}

if (H5) {
  var tuaScroll = require('tua-body-scroll-lock')
}

const FilterBar: FC<FilterBarProps> = (props) => {
  const { title, filterData, onChange, onScrollTop, onIsScroll } = props
  // 排序状态
  const [sortShow, setSortShow] = useState(false)
  // 排序 选择项
  const [activeSort, setActiveSort] = useState<INavAndSort>({
    id: '',
    name: '',
    value: '',
  })
  // 距离最近
  const [distanceActive, setDistanceActive] = useState(false)
  // 销量最高
  const [salesActive, setSalesActive] = useState(false)
  // 筛选 状态
  const [filterShow, setFilterShow] = useState(false)
  // 遮罩状态
  const shadeShow = useMemo(() => {
    if (sortShow || filterShow) {
      return true
    } else {
      return false
    }
  }, [sortShow, filterShow])
  const shadeDom = document.getElementById('shade')

  // 参数
  const [filterParams, setFilterParams] = useState<FilterParams>({
    sotr: '1',
    distance: '',
    sales: '',
    serves: [],
    activity: '',
    expenditure: '',
  })
  // 当前新筛选数据
  const DOM = useRef<any>(null)
  const [atFilter, setAtFilter] = useState<Ifilter['filter']>({
    serve: { title: '', main: [] },
    activity: { title: '', main: [] },
    expenditure: { title: '', main: [] },
  })
  // 深拷贝筛选 更新当前筛选数据
  useEffect(() => {
    if (filterData.filter?.activity?.title) {
      let filter = JSON.parse(JSON.stringify(filterData.filter))
      setAtFilter(filter)
      setTimeout(_getDom, 0)
    }
  }, [filterData])

  // 筛选 -> 当前拷贝数据是否已经有选项
  const isAtFilterActive = useMemo(() => {
    const mainList = [
      ...atFilter.activity.main,
      ...atFilter.expenditure.main,
      ...atFilter.serve.main,
    ]
    return mainList.some((item) => item.active)
  }, [atFilter])

  // 筛选 -> 是否已有筛选选项
  const isFilterActive = useMemo(() => {
    return (
      filterParams.serves.length ||
      filterParams.activity ||
      filterParams.expenditure
    )
  }, [filterParams])

  useEffect(() => {
    onChange(filterParams)
  }, [onChange, filterParams])

  // 禁止/允许 滚动条
  useEffect(() => {
    if (shadeDom) {
      if (sortShow || filterShow) {
        if (H5) {
          tuaScroll.unlock(shadeDom)
          setTimeout(() => {
            tuaScroll.lock(shadeDom)
          }, 200)
        } else {
          onIsScroll(false)
        }
      } else {
        if (H5) {
          tuaScroll.unlock(shadeDom)
        } else {
          onIsScroll(true)
        }
      }
    }
  }, [sortShow, filterShow, onIsScroll, shadeDom])

  // 获取筛选条DOM
  const _getDom = async () => {
    const res: any = await getDom('#filterbar')
    const res1: any = await getDom('.searchbar')
    DOM.current = res[0][0].top - res1[0][0].height
  }

  if (!filterData.nav) {
    return <ELoading />
  } else {
    const { nav, sort } = filterData

    // 打开/关闭 综合排序
    const handleSort = () => {
      setSortShow(!sortShow)
      if (!sortShow) {
        _setFilterTop()
        setFilterShow(false)
      }
    }
    // 选中综合排序
    const handleSortActive = (sortItem: INavAndSort) => {
      setActiveSort(sortItem)
      setFilterParams((params) => {
        return { ...params, sotr: sortItem.value }
      })
      closeFilter()
    }

    // 选中/取消 距离最近
    const handleDistance = (distance: INavAndSort) => {
      setDistanceActive(!distanceActive)
      if (distanceActive) {
        setFilterParams((params) => {
          return { ...params, distance: '' }
        })
      } else {
        setFilterParams((params) => {
          return { ...params, distance: distance.value }
        })
        _setFilterTop()
      }
      closeFilter()
    }

    // 选中/取消 销量最高
    const handleSales = (salesItem: INavAndSort) => {
      setSalesActive(!salesActive)
      if (salesActive) {
        setFilterParams((params) => {
          return { ...params, sales: '' }
        })
      } else {
        setFilterParams((params) => {
          return { ...params, sales: salesItem.value }
        })
        _setFilterTop()
      }
      closeFilter()
    }

    // 筛选 -> 商家服务(多选)
    const serveActive = (item: IFilterMain) => {
      item.active = !item.active
      setAtFilter((atfilter) => ({ ...atfilter }))
    }
    // 筛选 -> 优惠活动(单选)
    const expenditureActive = (item: INavAndSort) => {
      atFilter.expenditure.main.forEach((citem) => (citem.active = false))
      item.active = true
      setAtFilter((atfilter) => ({ ...atfilter }))
    }
    // 筛选 -> 人均消费(单选)
    const activityActive = (item: INavAndSort) => {
      atFilter.activity.main.forEach((citem) => (citem.active = false))
      item.active = true
      setAtFilter((atfilter) => ({ ...atfilter }))
    }
    // 筛选 -> 清空
    const clearFilter = () => {
      const mainList = [
        ...atFilter.activity.main,
        ...atFilter.expenditure.main,
        ...atFilter.serve.main,
      ]
      mainList.forEach((item) => (item.active = false))
      setAtFilter((atfilter) => ({ ...atfilter }))
    }

    // 筛选 -> 提交
    const submitFilter = () => {
      const { serve, activity, expenditure } = atFilter
      const _serves = serve.main
        .filter((item) => item.active)
        .map((item) => item.value)
      const _activity = activity.main.find((item) => item.active)?.value || ''
      const _expenditure =
        expenditure.main.find((item) => item.active)?.value || ''

      setFilterParams((params) => {
        return {
          ...params,
          serves: _serves,
          activity: _activity,
          expenditure: _expenditure,
        }
      })
      closeFilter()
    }

    // 打开/关闭 筛选
    const handleFilter = () => {
      setFilterShow(!filterShow)
      if (!filterShow) {
        setSortShow(false)
        _setFilterTop()
      }
    }

    // 关闭 排序/筛选层
    const closeFilter = () => {
      setSortShow(false)
      setFilterShow(false)
    }

    // 设置滚动条位置
    const _setFilterTop = () => {
      if (onScrollTop) {
        onScrollTop(DOM.current)
      }
    }

    return (
      <Fragment>
        {title && <View className='filterbar-title'>{title}</View>}
        <View id='filterbar' className='filterbar'>
          <View className='filterbar-head'>
            <View
              className={classnames('filterbar-head-item', {
                'filter-active': activeSort.id,
                'filter-atactive': sortShow,
              })}
              onClick={handleSort}
            >
              <Text>{activeSort.name ? activeSort.name : nav.sort.name}</Text>
              <EIcon type='xiajiantou' size={16} />
            </View>

            <View
              className='filterbar-head-item'
              onClick={() => handleDistance(nav.distance)}
            >
              <Text
                className={classnames({
                  'filter-active': distanceActive,
                })}
              >
                {nav.distance.name}
              </Text>
            </View>

            <View
              className='filterbar-head-item'
              onClick={() => handleSales(nav.sales)}
            >
              <Text
                className={classnames({
                  'filter-active': salesActive,
                })}
              >
                {nav.sales.name}
              </Text>
            </View>

            <View
              className={classnames('filterbar-head-item', {
                'filter-active': isFilterActive,
                'filter-atactive': filterShow,
              })}
              onClick={handleFilter}
            >
              <Text className={classnames('title')}>{nav.filter.name}</Text>
              <EIcon type='funnel' size={26} />
            </View>
          </View>

          {/* 排序 */}
          <Etransition animation='ele-top' in={sortShow} timeout={300}>
            <View className={classnames('filterbar-sort')}>
              {sort.map((sortItem) => {
                return (
                  <View
                    className={classnames('sort-item', {
                      'filter-atactive': sortItem.id === activeSort.id,
                    })}
                    key={sortItem.id}
                    onClick={() => {
                      handleSortActive(sortItem)
                    }}
                  >
                    {sortItem.name}
                  </View>
                )
              })}
            </View>
          </Etransition>

          {/* 筛选 */}
          <Etransition in={filterShow} timeout={300} animation='ele-top'>
            <View className={classnames('filterbar-filter')}>
              {/* 商家服务 */}
              <View className='filter-item'>
                <View className='filter-item-title'>
                  {atFilter.serve.title}
                </View>
                <View className='filter-item-main'>
                  {atFilter.serve.main.map((item) => {
                    return (
                      <View
                        key={item.id}
                        className={classnames('filter-item-main-item', {
                          'filter-item-active': item.active,
                        })}
                        onClick={() => serveActive(item)}
                      >
                        <View className='filter-item-main-item-icon'>
                          <Image
                            src={imgUrl(item.icon as string)}
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
                <View className='filter-item-title'>
                  {atFilter.activity.title}
                </View>
                <View className='filter-item-main'>
                  {atFilter.activity.main.map((item) => {
                    return (
                      <View
                        key={item.id}
                        className={classnames('filter-item-main-item', {
                          'filter-item-active': item.active,
                        })}
                        onClick={() => activityActive(item)}
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
                  {atFilter.expenditure.title}
                </View>
                <View className='filter-item-main'>
                  {atFilter.expenditure.main.map((item) => {
                    return (
                      <View
                        key={item.id}
                        className={classnames('filter-item-main-item', {
                          'filter-item-active': item.active,
                        })}
                        onClick={() => expenditureActive(item)}
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
                    'filter-active': isAtFilterActive,
                  })}
                  onClick={clearFilter}
                >
                  清空
                </View>
                <View className='ressub-submit' onClick={submitFilter}>
                  确定
                </View>
              </View>
            </View>
          </Etransition>
        </View>
        {shadeShow && (
          <View
            id='shade'
            className={classnames('shade')}
            onClick={closeFilter}
          ></View>
        )}
      </Fragment>
    )
  }
}

export default FilterBar
