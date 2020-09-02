import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames'

import './ETabs.scss'

const ETabs = ({ tabs, children }) => {
  const [tabIndex, setTabIndex] = useState(0)

  const activeTabs = i => {
    setTabIndex(i)
  }

  return (
    <View className='tabs'>
      <View className='tabs-bar'>
        {tabs.map((tab, i) => (
          <View
            className='tabs-bar-item'
            key={tab.title}
            onClick={() => activeTabs(i)}
          >
            <Text
              className={classnames('tabs-bar-item-title', {
                'tabs-active': i === tabIndex,
              })}
            >
              {tab.title}
            </Text>
          </View>
        ))}
      </View>
      <View className='tabs-content'>
        {children.map((item, i) => {
          return (
            <View
              className={classnames({
                'ele-hide': i !== tabIndex,
              })}
              key={'cart' + i}
            >
              {item}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default ETabs
