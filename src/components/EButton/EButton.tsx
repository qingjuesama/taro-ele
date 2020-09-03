import React, { FC, Fragment } from 'react'
import { Text, Button } from '@tarojs/components'
import { ButtonProps } from '@tarojs/components/types/Button'
import classnames from 'classnames'

import './EButton.scss'

type EButtonType = 'default' | 'green' | 'blue' | 'href'

interface EButtonProps extends ButtonProps {
  className?: string
  btnType: EButtonType
  children: React.ReactNode
  loading?: boolean
  href?: string
}

const EButton: FC<EButtonProps> = (props) => {
  const { className, btnType, loading, children, ...restProps } = props

  const classes = classnames('ele-ebutton', className, {
    [`ele-ebutton-${btnType}`]: btnType,
  })

  return (
    <Button className={classes} {...restProps}>
      {loading && <Text className='ele-ebutton-loading' />}
      {children}
    </Button>
  )
}

export default EButton
