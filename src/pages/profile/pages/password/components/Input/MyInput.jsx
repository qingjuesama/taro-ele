import React from 'react'
import { View, Input } from '@tarojs/components'
import classnames from 'classnames'
import './MyInput.scss'

const MyInput = ({ placeholder, type, tip, onInput, value }) => {
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
        onInput={e => onInput(e.detail.value)}
      />
      {tip && <View className='password-tip'>{tip}</View>}
    </View>
  )
}

export default MyInput
