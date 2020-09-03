import Taro from '@tarojs/taro'
import React, { FC, useState, useCallback, useMemo } from 'react'
import {
  View,
  Image,
  Form,
  Input,
  Button,
  Text,
  Navigator,
} from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'
import { BaseEventOrig } from '@tarojs/components/types/common'
import classnames from 'classnames'
import API from '../../api'

import './index.scss'

const Register: FC = () => {
  const [inpActive, setInpActive] = useState({
    usernameActive: 0,
    passwordActive: 0,
    password2Active: 0,
  })
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  // 手机号
  const handleSetPhone = useCallback((e) => {
    const { value } = e.detail
    setPhone(value)
  }, [])

  // 验证手机号
  const verifyPhone = useMemo(() => {
    const regPhone = /^1[0-9]{10}$/
    if (regPhone.test(phone)) {
      return true
    } else {
      return false
    }
  }, [phone])

  // 密码验证
  const verifypwass = useMemo(() => {
    const regPass = /^([0-9]|[A-z])*$/
    if (password.length >= 6 && regPass.test(password)) {
      return true
    } else {
      return false
    }
  }, [password])

  // 密码比对
  const comparePassWord = useMemo(() => {
    if (password === password2) {
      return true
    } else {
      return false
    }
  }, [password, password2])

  // 密码
  const verifyPassword = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    const { value } = e.detail
    setPassword(value)
  }
  // 确认密码
  const verifyPassword2 = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    const { value } = e.detail
    setPassword2(value)
  }

  // 注册
  const handleSubmit = useCallback(async () => {
    if (comparePassWord && verifyPhone) {
      const { err, res } = await API.reqRegister({
        phone,
        password,
        password2,
      })

      if (err) {
        console.log(err)
        return
      }

      if (res.code === 0) {
        Taro.showLoading({
          title: res.message,
          mask: true,
          success() {
            setTimeout(() => {
              Taro.hideLoading()
              Taro.redirectTo({ url: '/pages/login/index' })
            }, 1000)
          },
        })
      } else {
        Taro.showToast({ title: res.message, icon: 'none' })
      }
    } else {
      let title: string
      if (!comparePassWord) {
        title = '请检查密码'
      } else if (!verifyPhone) {
        title = '请检查手机号'
      } else {
        title = '请检查提交信息'
      }
      Taro.showToast({
        title,
        icon: 'none',
      })
    }
  }, [comparePassWord, verifyPhone, phone, password, password2])

  // 选中input
  const handleFocus = useCallback((inputName, num) => {
    setInpActive((inp) => {
      return { ...inp, [inputName]: num }
    })
  }, [])

  // 离开input
  const handleBlur = useCallback((inputName, num) => {
    setInpActive((inp) => {
      return { ...inp, [inputName]: num }
    })
  }, [])

  return (
    <View className='register'>
      <View className='logo'>
        <View className='logo-content'>
          <Image
            className='logo-image'
            src='//gw.alicdn.com/tfs/TB13RU4trj1gK0jSZFOXXc7GpXa-1000-405.png'
          />
        </View>
      </View>
      <View className='form'>
        <Form onSubmit={handleSubmit}>
          <View className='input-row'>
            <Input
              name='username'
              placeholder='手机号'
              value={phone}
              className={classnames('input', {
                inputactive: inpActive.usernameActive === 1,
                pass: verifyPhone,
                error: !!phone.length && !verifyPhone,
              })}
              type='number'
              placeholderClass='placeholder'
              maxlength={11}
              onInput={handleSetPhone}
              onFocus={() => handleFocus('usernameActive', 1)}
              onBlur={() => handleBlur('usernameActive', 2)}
            />
          </View>
          <View className='input-row'>
            <Input
              name='password'
              placeholder='密码'
              value={password}
              type='password'
              placeholderClass='placeholder'
              maxlength={11}
              className={classnames('input', {
                inputactive: inpActive.passwordActive === 1,
                pass: verifypwass,
                error: !!password.length && !verifypwass,
              })}
              onInput={verifyPassword}
              onFocus={() => handleFocus('passwordActive', 1)}
              onBlur={() => handleBlur('passwordActive', 2)}
            />
          </View>
          <View className='input-row'>
            <Input
              name='password'
              placeholder='确认密码'
              type='password'
              value={password2}
              placeholderClass='placeholder'
              maxlength={11}
              className={classnames('input', {
                inputactive: inpActive.password2Active === 1,
                pass: verifypwass && comparePassWord,
                error:
                  !!password2.length && !!password.length && !comparePassWord,
              })}
              onInput={verifyPassword2}
              onFocus={() => handleFocus('password2Active', 1)}
              onBlur={() => handleBlur('password2Active', 2)}
            />
          </View>
          <View className='tiptext'>
            新用户注册，并表示已同意
            <Text className='text'>《用户服务协议》</Text>和
            <Text className='text'>《隐私权政策》</Text>
          </View>
          <Button className='submit' formType='submit'>
            注册
          </Button>
          <Navigator
            url='/pages/login/index'
            openType='redirect'
            className='login'
          >
            已有帐号？ 点此登录
          </Navigator>
        </Form>
      </View>
    </View>
  )
}

export default Register
