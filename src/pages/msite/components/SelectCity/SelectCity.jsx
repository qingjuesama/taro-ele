import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentAddress } from '@/src/redux/actions/user'
import { actionShopParams } from '@/src/redux/actions/filterShop'
import { reqCityList } from '@/src/api'
import NavBar from '@/src/components/NavBar/NavBar'
import SelectCitySearch from '../SelectCitySearch/SelectCitySearch'
import SelectCityABC from '../SelectCityABC/SelectCityABC'
import SelectCityList from '../SelectCityList/SelectCityList'
import SelectCityFilterList from '../SelectCityFilterList/SelectCityFilterList'

import './SelectCity.scss'

const SelectCity = props => {
  const { cityShow, onSetCityShow, onRemoveOffset } = props
  const currentAddress = useSelector(state => state.currentAddress)
  const dispatch = useDispatch()
  // 城市列表数据
  const [cityList, setCityList] = useState([])
  // 城市字母索引
  const [alphabet, setAlphabet] = useState([])

  // 每个字母索引距离
  const [cityTop, setCityTop] = useState([])
  // 当前滚动条位置
  const [atScrollTop, setAtScrollTop] = useState(0)
  // 搜索城市值
  const [cityValue, setCityValue] = useState('')
  // 搜索的城市数组
  const [resultCityList, setResultCityList] = useState([])
  // 定时器
  const time = useRef()
  const current = getCurrentInstance()

  // 发送请求
  const getCity = useCallback(async () => {
    const result = await reqCityList()
    if (result.code === 0) {
      // 创建时间戳 十分钟
      const now = Date.now() + 1000 * 60 * 10
      // 保存数据到本地
      Taro.setStorageSync('cityList', {
        now,
        data: result.data,
      })
      _cityList(result)
    } else {
      Taro.showToast({ title: result.message, icon: 'none' })
    }
  }, [])

  useEffect(() => {
    const localCityList = Taro.getStorageSync('cityList')
    // 本地没有保存数据
    if (!localCityList) {
      getCity()
      return
    }
    // 对比时间戳
    const atNow = Date.now()
    const { now } = localCityList
    if (atNow > now) {
      getCity()
      return
    }
    // 从本地获取数据
    _cityList(localCityList)
  }, [getCity])

  // 提取城市数据及字母索引
  const _cityList = result => {
    // 保存数据到state
    setAlphabet(result.data.alphabet)
    setCityList(result.data.cityList)
  }

  // 扁平化城市数组,方便搜索
  const oneCityList = useMemo(() => {
    return cityList.reduce((pre, city) => {
      return (pre = [...pre, ...city.cities])
    }, [])
  }, [cityList])

  // 清空搜索内容,过滤城市
  const initCity = flag => {
    setCityValue('')
    setResultCityList([])
    // 关闭选择城市
    onSetCityShow(flag)
  }

  // 选择城市
  const onSelectCity = city => {
    const { name, latitude, longitude } = city
    onRemoveOffset()
    // 保存当前城市信息到redux
    dispatch(
      setCurrentAddress({
        city: name,
        address: name,
        latitude,
        longitude,
      })
    )
    initCity()
  }

  // 搜索城市
  const onInput = e => {
    let value = e.detail.value
    setCityValue(value)
    value = value.trim()
    if (!value) {
      setResultCityList([])
      return
    }
    clearTimeout(time.current)
    time.current = setTimeout(() => {
      const resultCitys = oneCityList.reduce((pre, city) => {
        if (city.name.includes(value) || city.pinyin.includes(value)) {
          pre.push(city)
        }
        return pre
      }, [])
      setResultCityList(resultCitys)
    }, 200)
  }

  // 初始化每个索引城市offsetTop
  useEffect(() => {
    if (cityShow) {
      if (process.env.TARO_ENV === 'weapp') {
        setTimeout(() => {
          const query = Taro.createSelectorQuery().in(current.page)
          query.selectAll('.dom').boundingClientRect()
          query.exec(res => {
            const result = res[0].map(item => item.top - 95)
            setCityTop(result.splice(1))
          })
        }, 0) 
      } else {
        let offsetTopList = []
        const list = document.querySelectorAll('.dom')
        list.forEach(item => {
          offsetTopList.push(item.offsetTop - 90)
        })
        setCityTop(offsetTopList.splice(1))
      }
    }
  }, [cityShow, current])

  // 选择城市索引
  const onLinkCity = (alp, index) => {
    setAtScrollTop(cityTop[index])
  }

  return (
    <View
      className={classnames('selectcity', {
        'city-hide': !cityShow,
      })}
    >
      <NavBar onClose={initCity} title='选择城市' />
      <View className='selectcity-main'>
        {/* 搜索城市input */}
        <SelectCitySearch onInput={onInput} cityValue={cityValue} />

        {/* 城市列表 && 字母 */}
        <View
          className={classnames('selectcity-main-content', {
            'city-hide': resultCityList.length > 0 || cityValue,
          })}
        >
          {/* 左侧城市列表 */}
          <SelectCityList
            onSelectCity={onSelectCity}
            atScrollTop={atScrollTop}
            currentAddress={currentAddress}
            cityList={cityList}
          />

          {/* 右侧字母索引 */}
          <SelectCityABC onLinkCity={onLinkCity} alphabet={alphabet} />
        </View>
        {/* 筛选城市 */}
        <SelectCityFilterList
          onSelectCity={onSelectCity}
          resultCityList={resultCityList}
          cityValue={cityValue}
        />
      </View>
    </View>
  )
}

SelectCity.defaultProps = {
  cityShow: false,
  address: {},
  onSetCityShow: () => {},
  onSetAddress: () => {},
}

export default SelectCity
