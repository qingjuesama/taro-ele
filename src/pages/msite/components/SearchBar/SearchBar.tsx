import React, { FC } from 'react'
import { View, Text, Navigator } from '@tarojs/components'

import EIcon, { EIconProps } from '../../../../components/EIcon/EIcon'

import './SearchBar.scss'

interface SearchBarProps extends Omit<EIconProps, 'type'> {
  title: string
  icon: EIconProps['type']
  url: string
}

const SearchBar: FC<SearchBarProps> = (props) => {
  const { title, icon, url } = props
  return (
    <Navigator className='searchbar' url={url}>
      <View className='searchbar-main'>
        <EIcon className='searchbar-icon' type={icon} color='#999' size={30} />
        <Text className='searchbar-title'>{title}</Text>
      </View>
    </Navigator>
  )
}

export default SearchBar
