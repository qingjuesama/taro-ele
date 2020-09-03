import Taro from '@tarojs/taro'
import React, { useEffect, useState, Fragment } from 'react'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { InputProps } from '@tarojs/components/types/Input'
import { BaseEventOrig } from '@tarojs/components/types/common'
import { Reducers } from '../../redux/interface'
import { H5 } from '../../config/base'
import API from '../../api'
import { HotSearchWords } from '../../api/interface'

import SearchBack from './components/Back/Back'
import SearchBar from './components/SearchBar/SearchBar'
import SearchItem from './components/SearchItem/SearchItem'

import useDebounce from '../../hooks/useDebounce'

import './index.scss'

const Search = () => {
  // 热门搜索
  const [hotList, setHotList] = useState<HotSearchWords[]>([])
  // 搜索结果
  const [searchData, setSearchData] = useState<any>({})
  // 搜索关键词
  const [keyword, setKeyWord] = useState('')
  const searchKey = useDebounce(keyword)
  // 搜索历史
  const [historyList, setHistoryList] = useState(() => {
    return Taro.getStorageSync('searchHistory') || []
  })

  const { latitude, longitude } = useSelector(
    (data: Reducers) => data.currentAddress
  )
  useEffect(() => {
    if (latitude && longitude) {
      API.reqHotSearchWords({ latitude, longitude }).then(({ err, res }) => {
        if (err) {
          Taro.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 1000,
            success() {
              setTimeout(() => {
                Taro.reLaunch({ url: '/pages/login/index' })
              }, 1000)
            },
          })
          return
        }

        if (res.code === 0) {
          setHotList(res.data)
        }
      })
    }
  }, [latitude, longitude])

  // 返回
  const onBack = () => {
    Taro.navigateBack({ delta: 1 })
  }

  // 搜索input
  const handleInput = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    const { value } = e.detail
    if (!value) {
      clearKeyWord()
    } else {
      setKeyWord(value)
    }
  }

  // 清空搜索关键词
  const clearKeyWord = () => {
    setKeyWord('')
    setSearchData({})
  }

  // 请求搜索结果
  const typeaHead = (value: string) => {
    if (value.trim()) {
      API.reqTypeaHead({ value }).then(({ err, res }) => {
        if (err) {
          console.log(err)
          return
        }

        if (res.code === 0) {
          setSearchData(res.data)
        } else {
          console.log(res)
        }
      })
      setKeyWord(value)
      saveHistory(value)
    }
  }

  // 保存历史到历史记录
  const saveHistory = (value: string) => {
    const searchHistorys = Taro.getStorageSync('searchHistory')
    if (searchHistorys) {
      const result = searchHistorys.some(
        (searchHistory) => searchHistory === value
      )
      if (!result) {
        Taro.setStorage({
          key: 'searchHistory',
          data: [...searchHistorys, value],
        })
        setHistoryList((list) => [...list, value])
      }
    } else {
      Taro.setStorage({
        key: 'searchHistory',
        data: [value],
      })
      setHistoryList((list) => [...list, value])
    }
  }

  // 清空历史
  const clearHistory = () => {
    Taro.removeStorage({ key: 'searchHistory' })
    setHistoryList([])
  }

  return (
    <View className='search'>
      {H5 && <View className='icon icon-fanhui' onClick={onBack}></View>}
      <SearchBar
        onSearch={typeaHead}
        onInput={handleInput}
        keyword={searchKey}
        onClearKeyWord={clearKeyWord}
      />
      {searchData.restaurants ? (
        <View className='search-list'>
          {searchData.restaurants.map((item) => {
            return (
              <SearchItem
                key={item.id}
                restaurant={item}
                keyword={searchData.search_word}
              />
            )
          })}
        </View>
      ) : (
        <Fragment>
          {!!historyList.length && (
            <SearchBack
              title='搜索历史'
              clear
              onClearHistory={clearHistory}
              dataList={historyList}
              onTypeaHead={typeaHead}
            />
          )}
          <SearchBack
            title='热门搜索'
            dataList={hotList}
            onTypeaHead={typeaHead}
          />
        </Fragment>
      )}
    </View>
  )
}

export default Search
