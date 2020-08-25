import React, { FC } from 'react'
import { View, Text } from '@tarojs/components'

import EIcon, { EIconProps } from '../../../../components/EIcon/EIcon'

import './SearchBar.scss'

interface SearchBarProps extends Omit<EIconProps, 'type'> {
  title: string
  icon: EIconProps['type']
}

const SearchBar: FC<SearchBarProps> = (props) => {
  const { title, icon } = props
  return (
    <View className='searchbar'>
      <View className='searchbar-main'>
        <EIcon className='searchbar-icon' type={icon} color='#999' size={30} />
        <Text className='searchbar-title'>{title}</Text>
      </View>
    </View>
  )
}

export default SearchBar
