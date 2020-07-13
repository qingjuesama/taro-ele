import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { reqHotSearchWords, reqTypeaHead } from '@/src/api'
import { useSelector } from 'react-redux'
import Back from './components/Back/Back'
import SearchBar from './components/SearchBar/SearchBar'
import SearchItem from './components/SearchItem/SearchItem'

import './index.scss'

const Search = () => {
  // 热门搜索
  const [hotList, setHotList] = useState([])
  // 搜索结果
  const [searchData, setSearchData] = useState({})
  // 搜索关键词
  const [keyword, setKeyWord] = useState('')
  // 搜索历史
  const [historyList, setHistoryList] = useState(() => {
    return Taro.getStorageSync('searchHistory') || []
  })

  const { latitude, longitude } = useSelector(data => data.currentAddress)
  useEffect(() => {
    if (latitude && longitude) {
      reqHotSearchWords({ latitude, longitude }).then(res => {
        if (res.code === 0) {
          setHotList(res.data)
        } else {
          Taro.redirectTo({ url: '/pages/login/index' })
        }
      })
    }
  }, [latitude, longitude])

  // 返回
  const onBack = () => {
    Taro.navigateBack({ delta: 1 })
  }

  // 搜索input
  const input = e => {
    const { value } = e.target
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
  const typeaHead = value => {
    if (value.trim()) {
      reqTypeaHead(value).then(res => {
        if (res.code === 0) {
          setSearchData(res.data)
        }
      })
      setKeyWord(value)
      saveHistory(value)
    }
  }

  // 保存历史到历史记录
  const saveHistory = value => {
    const searchHistorys = Taro.getStorageSync('searchHistory')
    if (searchHistorys) {
      const result = searchHistorys.some(
        searchHistory => searchHistory === value
      )
      if (!result) {
        Taro.setStorage({
          key: 'searchHistory',
          data: [...searchHistorys, value],
        })
        setHistoryList(list => [...list, value])
      }
    } else {
      Taro.setStorage({
        key: 'searchHistory',
        data: [value],
      })
      setHistoryList(list => [...list, value])
    }
  }

  // 清空历史
  const clearHistory = () => {
    Taro.removeStorage({ key: 'searchHistory' })
    setHistoryList([])
  }

  return (
    <View className='search'>
      <View className='icon icon-fanhui' onClick={onBack}></View>
      <SearchBar
        onSearch={typeaHead}
        input={input}
        keyword={keyword}
        onClearKeyWord={clearKeyWord}
      />
      {searchData.restaurants ? (
        <View className='search-list'>
          {searchData.restaurants.map(item => {
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
        <>
          {historyList.length > 0 && (
            <Back
              title='搜索历史'
              clear
              onClearHistory={clearHistory}
              dataList={historyList}
              onTypeaHead={typeaHead}
            />
          )}
          <Back title='热门搜索' dataList={hotList} onTypeaHead={typeaHead} />
        </>
      )}
    </View>
  )
}

export default Search
