// 修改用户名
import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import { View, Input, Button } from '@tarojs/components'
import { reqSetUserName } from '@/src/api'
import './index.scss'

const UserName = () => {
  const [userName, setUserName] = useState('')
  const [flag, setFlag] = useState(true)

  // 修改用户名
  const handleSetUserName = e => {
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

    const result = await reqSetUserName({ userName })
    if (result.code === 0) {
      Taro.navigateBack({ delta: 1 })
    } else {
      Taro.showToast({ title: result.message, icon: 'none' })
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
