import React, { FC } from 'react'
import { View } from '@tarojs/components'

import './ABC.scss'

interface ABCProps {
  alphabet: string[]
  onLinkCity: (alp: string) => void
}

const ABC: FC<ABCProps> = (props) => {
  const { alphabet, onLinkCity } = props
  return (
    <View className='selectcity-main-content-abc'>
      {alphabet.map((alp) => {
        return (
          <View
            className='selectcity-main-content-abc-item'
            key={alp}
            onClick={() => onLinkCity(alp)}
          >
            {alp}
          </View>
        )
      })}
    </View>
  )
}

export default ABC
