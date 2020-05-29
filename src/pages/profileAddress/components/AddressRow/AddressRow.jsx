import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './AddressRow.scss'

const AddressRow = ({ address, onDelAddress, onEditAddress }) => {
  return (
    <View className='addressrow'>
      <View className='addressrow-left'>
        <View className='myinfo'>
          <View className='myname'>{address.name}</View>
          <View className='mysex'>{address.sex === 1 ? '先生' : '女士'}</View>
          <View className='myphone'>{address.phone}</View>
        </View>
        <View className='myaddress'>
          {address.address + address.address_detail}
        </View>
      </View>
      <View className='addressrow-right'>
        <View
          className='addressrow-right-icon'
          onClick={() => onEditAddress(address)}
        >
          <AtIcon prefixClass='icon' value='bianji' size='16' />
        </View>
        <View className='addressrow-right-icon'>
          <AtIcon
            prefixClass='icon'
            value='guanbi'
            size='16'
            onClick={() => onDelAddress(address.id)}
          />
        </View>
      </View>
    </View>
  )
}

export default AddressRow
