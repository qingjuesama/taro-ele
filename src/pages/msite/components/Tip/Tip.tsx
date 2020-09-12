import React from 'react'
import Taro from '@tarojs/taro'
import { useSelector } from 'react-redux'
import NoDataTip from '../../../../components/NoDataTip/NoDataTip'
import { Reducers } from '../../../../redux/interface'

const Tip = () => {
  const { token, currentAddress } = useSelector((state: Reducers) => state)
  // 跳转到登录
  const handleToLogin = () => {
    Taro.reLaunch({ url: '/pages/login/index' })
  }
  // 跳转到选择地址
  const handleSelectAddress = () => {
    Taro.reLaunch({ url: '/pages/address/index' })
  }

  if (!token && currentAddress.latitude) {
    return (
      <NoDataTip
        className='nologin'
        img='//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png'
        title='没有结果'
        info='登录后查看更多商家'
        btnContent='登录'
        onButtonClick={handleToLogin}
      />
    )
  }

  if (!currentAddress.latitude) {
    return (
      <NoDataTip
        className='nologin'
        img='//fuss10.elemecdn.com/2/67/64f199059800f254c47e16495442bgif.gif'
        title='输入地址后才能订餐哦'
        btnContent='手动选择地址'
        onButtonClick={handleSelectAddress}
      />
    )
  }
  return null
}

export default Tip
