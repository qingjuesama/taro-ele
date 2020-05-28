// 筛选城市
import React from 'react'
import classnames from 'classnames'
import { ScrollView, View } from '@tarojs/components'
import './SelectCityFilterList.scss'

const SelectCityFilterList = ({ cityValue, resultCityList, onSelectCity }) => {
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
          hide: resultCityList.length > 0 || cityValue,
        })}
      >
        无结果
      </View>
    </ScrollView>
  )
}
SelectCityFilterList.defaultProps = {
  resultCityList: [],
  onSelectCity: () => {},
}

export default SelectCityFilterList
