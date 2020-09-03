// 筛选城市
import React from 'react'
import classnames from 'classnames'
import { ScrollView, View } from '@tarojs/components'
import './FilterList.scss'

const FilterList = ({ cityValue, resultCityList, onSelectCity }) => {
  return (
    <ScrollView scrollY className='result-city'>
      {resultCityList.map(city => {
        return (
          <View
            className='result-city-item'
            key={city.id}
            onClick={() => onSelectCity(city)}
          >
            {city.name}
          </View>
        )
      })}
      <View
        className={classnames('result-city-null', {
          'ele-hide': resultCityList.length > 0 ,
        })}
      >
        无结果
      </View>
    </ScrollView>
  )
}
export default FilterList
