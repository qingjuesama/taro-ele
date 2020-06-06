import React from 'react'
import { ScrollView, View } from '@tarojs/components'

import './SelectCityList.scss'

const SelectCityList = ({ atScrollTop, currentAddress, cityList, onSelectCity }) => {

  return (
    <ScrollView
      scrollY
      scrollTop={atScrollTop}
      className='selectcity-main-content-city'
    >
      <View className='selectcity-main-content-city-item dom'>
        <View className='selectcity-main-content-city-a'>当前定位城市</View>
        <View className='selectcity-main-content-city-name'>
          {currentAddress.city ? currentAddress.city : '定位当前城市失败'}
        </View>
      </View>
      {cityList.map(cityItem => {
        return (
          <View
            className='selectcity-main-content-city-item dom'
            key={cityItem.idx}
          >
            <View className='selectcity-main-content-city-a'>
              {cityItem.idx}
            </View>

            {cityItem.cities.map(city => {
              return (
                <View
                  className='selectcity-main-content-city-name'
                  key={city.id}
                  onClick={() => onSelectCity(city)}
                >
                  {city.name}
                </View>
              )
            })}
          </View>
        )
      })}
    </ScrollView>
  )
}

SelectCityList.defaultProps = {
  atScrollTop: 0,
  address: {},
  cityList: [],
  onSelectCity: () => {},
}

export default SelectCityList
