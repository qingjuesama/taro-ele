// 修改密码
import Taro from '@tarojs/taro'
import React, { useState, useMemo, useCallback } from 'react'
import { View, Button, Icon } from '@tarojs/components'
import { reqSetPassWord } from '@/src/api'
import MyInput from './components/Input/MyInput'

import './index.scss'

const PassWord = () => {
  const [oldPassWord, setOldPassWord] = useState('')
  const [newPassWord1, setNewPassWord1] = useState('')
  const [newPassWord2, setNewPassWord2] = useState('')
  const [oldTip, setOldTip] = useState('')
  const [newTip1, setNewTip1] = useState('')
  const [newTip2, setNewTip2] = useState('')

  // 旧密码
  const oldInput = useCallback(value => {
    if (value.length < 6) {
      setOldTip('密码长度为6-20位')
    } else {
      setOldPassWord(value)
      setOldTip('')
    }
  }, [])

  // 新密码
  const newInput1 = useCallback(value => {
    if (value.length < 6) {
      setNewTip1('密码长度为6-20位')
    } else {
      setNewPassWord1(value)
      setNewTip1('')
    }
  }, [])

  // 确认密码
  const newInput2 = useCallback(
    value => {
      if (value.length < 6) {
        setNewTip2('密码长度为6-20位')
      } else if (value !== newPassWord1) {
        setNewTip2('两次密码输入不一致')
      } else {
        setNewPassWord2(value)
        setNewTip2('')
      }
    },
    [newPassWord1]
  )

  // 验证是否通过
  const flag = useMemo(() => {
    if (oldPassWord && newPassWord1 && newPassWord2) {
      return false
    } else {
      return true
    }
  }, [oldPassWord, newPassWord1, newPassWord2])

  // 提交
  const submit = useCallback(async () => {
    if (flag) {
      return
    }
    const params = {
      oldPassWord: oldPassWord,
      newPassWord: newPassWord1,
    }
    const result = await reqSetPassWord(params)
    const { code, message } = result
    if (code === 0) {
      Taro.showToast({
        title: message,
        icon: 'success',
        success() {
          Taro.navigateBack({ delta: 1 })
        },
      })
    } else {
      Taro.showToast({ title: message, icon: 'none' })
    }
  }, [oldPassWord, newPassWord1, flag])

  return (
    <View className='password'>
      <View className='passowrd-main clearfix'>
        <View className='passowrd-item'>
          <MyInput
            placeholder='旧密码'
            type='password'
            tip={oldTip}
            value={oldPassWord}
            onInput={oldInput}
          />
        </View>
        <View className='passowrd-item'>
          <MyInput
            placeholder='新密码'
            type='password'
            tip={newTip1}
            value={newPassWord1}
            onInput={newInput1}
          />
        </View>
        <View className='passowrd-item'>
          <MyInput
            placeholder='确认密码'
            type='password'
            tip={newTip2}
            value={newPassWord2}
            onInput={newInput2}
          />
        </View>
      </View>
      <View className='password-button-main'>
        <Button className='password-button' disabled={flag} onClick={submit}>
          确认并保存
        </Button>
      </View>
    </View>
  )
}

export default PassWord
