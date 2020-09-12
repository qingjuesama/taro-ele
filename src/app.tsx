import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import configStore from './redux/store'
import { initCurrentAddress } from './redux/actions/user'

import './app.scss'

const store = configStore()

const App = (props) => {
  useEffect(() => {
    // 获取ip地址 经纬度
    const { currentAddress } = store.getState()
    if (!currentAddress.latitude && !currentAddress.longitude) {
      store.dispatch<any>(initCurrentAddress())
    }
  }, [])

  // 请勿修改此函数
  return <Provider store={store}>{props.children}</Provider>
}

export default App
