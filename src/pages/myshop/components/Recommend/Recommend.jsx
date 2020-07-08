import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import imgUrl from '@/src/utils/imgUrl'
import ShopButton from '@/src/components/ShopButton/ShopButton'
import './Recommend.scss'

const Recommend = ({ onUpdateCart, recData, count }) => {
  return (
    <View className='recommend'>
      <Image className='recommend-img' src={imgUrl(recData.image_path)} />
      <View className='recommend-main'>
        <View className='recommend-main-title'>{recData.name}</View>
        <View className='recommend-main-pingjia'>
          月售{recData.month_sales} 好评率{recData.satisfy_rate}%
        </View>
        <View className='recommend-main-numpice'>
          <View className='recommend-main-numpice-price'>
            <Text className='price-fuhao'>¥</Text>
            {recData.price}
          </View>
          <ShopButton
            onUpdateCart={onUpdateCart}
            good={recData}
            count={count}
          />
        </View>
      </View>
    </View>
  )
}

export default Recommend
