import React, { useState } from 'react'
import { View, ScrollView } from '@tarojs/components'

import './index.scss'

const Test = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const [viewId, setViewId] = useState('')

  const handleViewId = (id) => {
    setViewId(`test${id}`)
  }

  return (
    <ScrollView scrollIntoView={viewId} style={{ height: '100vh' }}>
      <View
        key={1}
        className='test'
        id={`test${1}`}
        onClick={() => handleViewId(1)}
      >
        1
      </View>
      <View
        key={2}
        className='test'
        id={`test${2}`}
        onClick={() => handleViewId(2)}
      >
        2
      </View>
      <View
        key={3}
        className='test'
        id={`test${3}`}
        onClick={() => handleViewId(3)}
      >
        3
      </View>
      <View
        key={4}
        className='test'
        id={`test${4}`}
        onClick={() => handleViewId(4)}
      >
        4
      </View>
      <View
        key={5}
        className='test'
        id={`test${5}`}
        onClick={() => handleViewId(5)}
      >
        5
      </View>
    </ScrollView>
  )
}

export default Test
