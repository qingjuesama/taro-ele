// 编辑地址
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import NavBar from '../../components/NavBar/NavBar'
import UserAddress from '../../components/UserAddress/UserAddress'
import './index.scss'

const ProfileAddressEdit = () => {
  return (
    <View>
      <NavBar title='编辑地址' />
      <UserAddress />
    </View>
  )
}

export default ProfileAddressEdit
