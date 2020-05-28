import React from 'react'
import { View } from '@tarojs/components'
import './SelectCityABC.scss'

const SelectCityABC = ({ alphabet, onLinkCity }) => {
  return (
    <View className='selectcity-main-content-abc'>
      {alphabet.map((alp, index) => {
        return (
          <View
            className='selectcity-main-content-abc-item'
            key={alp}
            onClick={() => onLinkCity(alp, index)}
          >
            {alp}
          </View>
        )
      })}
    </View>
  )
}
SelectCityABC.defaultProps = {
  alphabet: [],
  onLinkCity: () => {},
}

export default SelectCityABC
