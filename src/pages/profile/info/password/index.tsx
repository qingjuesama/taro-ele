// 修改密码
import Taro from '@tarojs/taro'
import React, { useState, useMemo, useCallback } from 'react'
import { View, Button } from '@tarojs/components'
import API from '../../../../api'
import MyInput from './components/Input/MyInput'

import './index.scss'

const PassWord = () => {
  const [oldPassWord, setOldPassWord] = useState('')
  const [newPassWord1, setNewPassWord1] = useState('')
  const [newPassWord2, setNewPassWord2] = useState('')

  // 旧密码
  const oldInput = useCallback((value: string) => {
    setOldPassWord(value)
  }, [])

  const oldTip = useMemo(() => {
    if (oldPassWord.length > 1 && oldPassWord.length < 6) {
      return '密码长度为6-20位'
    } else {
      return null
    }
  }, [oldPassWord])

  // 新密码
  const newInput1 = useCallback((value: string) => {
    setNewPassWord1(value)
  }, [])

  const newTip1 = useMemo(() => {
    if (newPassWord1.length > 1 && newPassWord1.length < 6) {
      return '密码长度为6-20位'
    } else {
      return null
    }
  }, [newPassWord1])

  // 确认密码
  const newInput2 = useCallback((value) => {
    setNewPassWord2(value)
  }, [])

  const newTip2 = useMemo(() => {
    if (newPassWord2.length > 1 && newPassWord2.length < 6) {
      return '密码长度为6-20位'
    } else if (newPassWord2 !== newPassWord1) {
      return '两次密码输入不一致'
    } else {
      return null
    }
  }, [newPassWord2, newPassWord1])

  // 验证是否通过
  const flag = useMemo(() => {
    if (
      oldPassWord &&
      newPassWord1 &&
      newPassWord2 &&
      !oldTip &&
      !newTip1 &&
      !newTip2
    ) {
      return false
    } else {
      return true
    }
  }, [oldPassWord, newPassWord1, newPassWord2, oldTip, newTip1, newTip2])

  // 提交
  const submit = useCallback(async () => {
    if (flag) {
      return
    }
    const params = {
      oldPassWord: oldPassWord,
      newPassWord: newPassWord1,
    }
    const { err, res } = await API.reqSetPassWord(params)

    if (err) {
      console.log(err)
      return
    }

    if (res.code === 0) {
      Taro.showToast({
        title: res.message,
        icon: 'success',
        success() {
          Taro.navigateBack({ delta: 1 })
        },
      })
    }
  }, [oldPassWord, newPassWord1, flag])

  return (
    <View className='password'>
      {console.log('旧密码', oldPassWord)}
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
