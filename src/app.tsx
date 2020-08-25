import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configStore from './redux/store'

import { initCurrentAddress } from './redux/actions/user'

import './app.scss'

const store = configStore()

class App extends Component {
  componentDidMount() {
    this.getAddress()
  }
  // 获取ip地址 经纬度
  getAddress = () => {
    const { currentAddress } = store.getState()
    if (!currentAddress.latitude && !currentAddress.longitude) {
      store.dispatch<any>(initCurrentAddress())
    }
  }
  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
