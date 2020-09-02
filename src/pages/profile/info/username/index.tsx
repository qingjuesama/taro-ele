// 修改用户名
import Taro, { FC } from '@tarojs/taro'
import React, { useState } from 'react'
import { View, Input, Button } from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'
import { BaseEventOrig } from '@tarojs/components/types/common'
import API from '../../../../api'

import './index.scss'

const UserName: FC = () => {
  const [userName, setUserName] = useState('')
  const [flag, setFlag] = useState(true)

  // 修改用户名
  const handleSetUserName = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    const { value } = e.detail
    if (value.length >= 5 && value.length <= 24) {
      setUserName(value)
      setFlag(false)
    } else {
      setFlag(true)
    }
  }

  // 提交
  const handleSubmit = async () => {
    if (flag) {
      return
    }

    const { err, res } = await API.reqSetUserName({ userName })

    if (err) {
      console.log(err)
      return
    }

    if (res.code === 0) {
      Taro.navigateBack({ delta: 1 })
    }
  }

  return (
    <View className='username'>
      <View className='username-main'>
        <Input
          className='username-input'
          value={userName}
          onInput={handleSetUserName}
          placeholder='用户名'
        />
        <View className='username-text'>修改用户名(5-24个字)</View>
        <Button
          disabled={flag}
          className='username-button'
          onClick={handleSubmit}
        >
          确认修改
        </Button>
      </View>
    </View>
  )
}

export default UserName
