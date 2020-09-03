import React, { FC } from 'react'
import { View, Input } from '@tarojs/components'
import { InputProps } from '@tarojs/components/types/Input'

import classnames from 'classnames'
import './MyInput.scss'

interface MyInputProps extends Omit<InputProps, 'onInput'> {
  tip: string | null
  onInput: (value: string) => void
}

const MyInput: FC<MyInputProps> = (props) => {
  const { placeholder, type, tip, onInput, value } = props
  return (
    <View className='myinput'>
      <Input
        className={classnames('password-input', {
          'password-error': tip,
        })}
        placeholder={placeholder}
        type={type}
        maxlength={20}
        value={value}
        onInput={(e) => onInput(e.detail.value)}
      />
      {tip && <View className='password-tip'>{tip}</View>}
    </View>
  )
}

export default MyInput
