import Taro from '@tarojs/taro'
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  Fragment,
} from 'react'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { InputProps } from '@tarojs/components/types/Input'
import { BaseEventOrig } from '@tarojs/components/types/common'
import { setCurrentAddress } from '../../redux/actions/user'
import API from '../../api'
import { Reducers } from '../../redux/interface'
import { CityList as CityListInterface, Cities } from '../../api/interface'
import getDom from '../../utils/getDom'

import NavBar from '../../components/NavBar/NavBar'

import CitySearch from './components/Search/Search'
import CityABC from './components/ABC/ABC'
import CityList from './components/List/List'
import CityFilterList from './components/FilterList/FilterList'

import './index.scss'

const SelectCity = () => {
  const currentAddress = useSelector((state: Reducers) => state.currentAddress)
  const dispatch = useDispatch()
  // 城市列表数据
  const [cityList, setCityList] = useState<CityListInterface[]>([])
  // 城市字母索引
  const [alphabet, setAlphabet] = useState<string[]>([])
  // 当前城市锚点
  const [infoView, setInfoView] = useState('')
  // 搜索城市值
  const [cityValue, setCityValue] = useState('')
  // 搜索的城市数组
  const [resultCityList, setResultCityList] = useState<Cities[]>([])
  const [cityHeight, setCityHeight] = useState(0)
  // 发送请求
  const getCity = useCallback(async () => {
    const { err, res } = await API.reqCityList()

    if (err) {
      console.log(err)
      return
    }

    if (res.code === 0) {
      // 创建时间戳 十分钟
      const now = Date.now() + 1000 * 60 * 10
      // 保存数据到本地
      Taro.setStorageSync('cityList', {
        now,
        data: res.data,
      })
      _cityList(res)
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
  const _cityList = (result) => {
    // 保存数据到state
    setAlphabet(result.data.alphabet)
    setCityList(result.data.cityList)
  }

  // 扁平化城市数组,方便搜索
  const oneCityList = useMemo(() => {
    return cityList.reduce((pre: Cities[], city) => {
      return (pre = [...pre, ...city.cities])
    }, [])
  }, [cityList])

  // 清空搜索内容,过滤城市
  const initCity = () => {
    setCityValue('')
    setResultCityList([])
    Taro.navigateBack({ delta: 1 })
  }

  // 选择城市
  const onSelectCity = (city: Cities) => {
    const { name, latitude, longitude } = city
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
  const onInput = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    let value = e.detail.value
    setCityValue(value)
    value = value.trim()
    if (!value) {
      setResultCityList([])
      return
    }

    const resultCitys = oneCityList.reduce((pre: Cities[], city: Cities) => {
      if (city.name.includes(value) || city.pinyin.includes(value)) {
        pre.push(city)
      }
      return pre
    }, [])
    setResultCityList(resultCitys)
  }

  // 选择城市索引
  const onLinkCity = (alp: string) => {
    setInfoView(`city${alp}`)
  }

  return (
    <View className='selectcity'>
      <NavBar icon='fanhui' title='选择城市' />
      {/* 搜索城市input */}
      <CitySearch onInput={onInput} cityValue={cityValue} />
      {!cityValue ? (
        <Fragment>
          {/* 左侧城市列表 */}
          <CityList
            onSelectCity={onSelectCity}
            currentAddress={currentAddress}
            cityList={cityList}
            infoView={infoView}
          />
          {/* 右侧字母索引 */}
          <CityABC onLinkCity={onLinkCity} alphabet={alphabet} />
        </Fragment>
      ) : (
        //  筛选城市
        <CityFilterList
          onSelectCity={onSelectCity}
          resultCityList={resultCityList}
          cityValue={cityValue}
        />
      )}
    </View>
  )
}

export default SelectCity
