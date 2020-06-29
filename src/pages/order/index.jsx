// 订单
import React, { useState } from 'react'
import { View, Button } from '@tarojs/components'
import { Transition } from 'react-spring/renderprops'

import FooterBar from '@/src/components/FooterBar/FooterBar'
import './index.scss'

const Order = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <View className='order'>
      <Button onClick={() => setToggle(flag => !flag)}>333</Button>
      <Transition
        items={toggle}
        from={{
          position: 'absolute',
          transform: 'translateX(100%)',
        }}
        enter={{ opacity: 1, transform: 'translateX(0)' }}
        leave={{ opacity: 0, transform: 'translateX(100%)' }}
      >
        {flag =>
          flag &&
          (props => (
            <View style={props} className='test'>
              😄
            </View>
          ))
        }
      </Transition>

      <FooterBar />
    </View>
  )
}
export default Order
