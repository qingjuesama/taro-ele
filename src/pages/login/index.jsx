import Taro from '@tarojs/taro'
import React, { useState, useCallback, useMemo } from 'react'
import { View, Image, Form, Input, Button, Navigator } from '@tarojs/components'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import { reqLogin } from '@/src/api'
import { setToken } from '@/src/redux/actions/token'
import './index.scss'

const Login = () => {
  // dispatch
  const dispatch = useDispatch()
  // 选中手机号,密码
  const [inpActive, setInpActive] = useState({
    usernameActive: 0,
    passwordActive: 0,
  })
  // 手机号
  const [phone, setPhone] = useState('')
  // 密码
  const [password, setPassword] = useState('')

  // 手机号
  const handleSetPhone = useCallback(e => {
    const { value } = e.detail
    setPhone(value)
  }, [])

  // 密码
  const handleSetPassword = e => {
    const { value } = e.detail
    setPassword(value)
  }

  // 验证手机号,通过可以发送请求
  const verifyPhone = useMemo(() => {
    const regPhone = /^1[0-9]{10}$/
    if (regPhone.test(phone)) {
      return true
    } else {
      return false
    }
  }, [phone])

  // 登录
  const handleSubmit = useCallback(async () => {
    if (verifyPhone && password.length >= 6) {
      const result = await reqLogin({
        phone,
        password,
      })
      const { code, message, token } = result
      if (code === 0) {
        dispatch(setToken(token))
        Taro.showLoading({
          title: '登录成功',
          mask: true,
          success() {
            setTimeout(() => {
              Taro.hideLoading()
              Taro.redirectTo({
                url: '/pages/profile/index',
              })
            }, 1000)
          },
        })
      } else {
        Taro.showToast({ title: message, icon: 'none' })
      }
      return
    }
    Taro.showToast({
      title: '手机号或密码不合法!',
      icon: 'none',
    })
  }, [verifyPhone, phone, password, dispatch])

  // 选中input
  const handleFocus = useCallback((inputName, num) => {
    setInpActive(inp => {
      return { ...inp, [inputName]: num }
    })
  }, [])

  // 离开input
  const handleBlur = useCallback((inputName, num) => {
    setInpActive(inp => {
      return { ...inp, [inputName]: num }
    })
  }, [])

  return (
    <View className='login'>
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
              })}
              type='number'
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
              maxlength={11}
              className={classnames('input', {
                inputactive: inpActive.passwordActive === 1,
              })}
              onInput={handleSetPassword}
              onFocus={() => handleFocus('passwordActive', 1)}
              onBlur={() => handleBlur('passwordActive', 2)}
            />
          </View>
          <Button className='submit' formType='submit'>
            登录
          </Button>
          <Navigator
            url='/pages/register/index'
            openType='redirect'
            className='register'
          >
            没有帐号？ 点此注册
          </Navigator>
        </Form>
      </View>
    </View>
  )
}
export default Login
