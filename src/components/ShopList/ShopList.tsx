import React, { FC, ReactElement } from 'react'
import { View } from '@tarojs/components'
import ShopItem from '../ShopItem/ShopItem'
import ELoading from '../ELoading/ELoading'

import { IShopList } from '../../api/interface'
import './ShopList.scss'

interface ShopListProps {
  shopListData: IShopList[]
  renderLoading: ReactElement | null
}

const ShopList: FC<ShopListProps> = (props) => {
  const { shopListData, renderLoading } = props

  if (!shopListData.length) {
    return <ELoading />
  }

  return (
    <View>
      {shopListData.map((shopdata) => {
        return (
          <ShopItem
            shopdata={shopdata.restaurant}
            key={shopdata.restaurant.id}
          />
        )
      })}
      <View className='ele-shoplist-bottom'>{renderLoading}</View>
    </View>
  )
}

export default ShopList
