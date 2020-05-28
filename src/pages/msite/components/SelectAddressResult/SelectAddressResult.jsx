// 搜索地址
import React, { useMemo, memo } from 'react'
import classnames from 'classnames'
import { ScrollView, View } from '@tarojs/components'
import SelectAddressResultItem from '../SelectAddressResultItem/SelectAddressResultItem'
import './SelectAddressResult.scss'

const SelectAddressResult = ({ detailList, onSaveAddress }) => {
  const flag = useMemo(() => {
    if (detailList.length > 0) {
      return true
    } else {
      return false
    }
  }, [detailList])

  return (
    <ScrollView
      scrollY
      className={classnames('search-result', {
        'search-hide': !flag,
      })}
    >
      {detailList.map(detail => (
        <SelectAddressResultItem
          key={detail.id}
          onSaveAddress={onSaveAddress}
          detail={detail}
        />
      ))}

      <View className='search-main-tip'>
        <View className='tip-title'>找不到地址？</View>
        <View>请尝试只输入小区、写字楼或学校名</View>
        <View>详细地址（如门牌号）可稍后输入</View>
      </View>
    </ScrollView>
  )
}

SelectAddressResult.defaultProps = {
  detailList: [],
  onSaveAddress: () => {},
}

export default memo(SelectAddressResult)
