import React from 'react'
import { Navigator } from '@tarojs/components'
import { useSelector } from 'react-redux'
import NavBar from '../../../../components/NavBar/NavBar'
import EIcon from '../../../../components/EIcon/EIcon'
import { Reducers } from '../../../../redux/interface'

import './MsiteNavBar.scss'

const MsiteNavBar = () => {
  const { currentAddress } = useSelector((state: Reducers) => state)
  return (
    <NavBar className='msite-navbar'>
      {/* 图标 */}
      <EIcon type='daohangdizhi' size={34} color='#fff' />
      {/* 地址信息 */}
      <Navigator
        url='/pages/address/index'
        openType='redirect'
        className='msite-navbar-title ellipsis'
      >
        {currentAddress.address || '手动选择收货地址'}
      </Navigator>
      {/* 图标 */}
      <EIcon type='xiajiantou' size={16} color='#fff' />
    </NavBar>
  )
}

export default MsiteNavBar
