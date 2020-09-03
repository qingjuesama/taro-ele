import React, { FC, memo } from 'react'
import { ScrollView, View } from '@tarojs/components'
import { Address } from '../../../../redux/interface'
import {
  CityList as CityListInterface,
  Cities,
} from '../../../../api/interface'
import setstylepx from '../../../../utils/setstylepx'

import './List.scss'

interface ListProps {
  currentAddress: Address
  cityList: CityListInterface[]
  onSelectCity: (city: Cities) => void
  infoView: string
}

const List: FC<ListProps> = (props) => {
  const { currentAddress, cityList, onSelectCity, infoView } = props
  return (
    <ScrollView
      scrollY
      className='selectcity-main-content-city'
      scrollIntoView={infoView}
    >
      <View className='selectcity-main-content-city-item dom'>
        <View className='selectcity-main-content-city-a'>当前定位城市</View>
        <View className='selectcity-main-content-city-name'>
          {currentAddress.city ? currentAddress.city : '定位当前城市失败'}
        </View>
      </View>
      {cityList.map((cityItem) => {
        return (
          <View
            className='selectcity-main-content-city-item'
            key={cityItem.idx}
            id={`city${cityItem.idx}`}
          >
            <View className='selectcity-main-content-city-a'>
              {cityItem.idx}
            </View>

            {cityItem.cities.map((city) => {
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

export default memo(List)
