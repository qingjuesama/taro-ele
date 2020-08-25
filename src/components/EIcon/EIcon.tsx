import React, { FC } from 'react'
import { Text } from '@tarojs/components'
import { StandardProps } from '@tarojs/components/types/common'
import classnames from 'classnames'
import setstylepx from '../../utils/setstylepx'

import './EIcon.scss'

type EIconType =
  | 'jiazailoading'
  | 'daohangshouye'
  | 'jianshao'
  | 'zengjia'
  | 'tianjia'
  | 'bianji'
  | 'miaozhun'
  | 'icon-test'
  | 'dianpu1'
  | 'jiantou-copy-copy'
  | 'jiantou-copy-copy-copy'
  | 'shouji'
  | 'iconset0143'
  | 'jiantou1'
  | 'zan'
  | 'success_fill'
  | 'ai-cart'
  | 'lajitong'
  | 'guanbi'
  | 'close'
  | 'huangguan'
  | 'jiantou'
  | 'jiazai'
  | 'shangjiantou'
  | 'safetycertificate-f'
  | 'xiazai9'
  | 'duihao'
  | 'funnel'
  | 'daohangdizhi'
  | 'xiajiantou'
  | 'fanhui'
  | 'sousuo'
  | 'loading'

export interface EIconProps extends StandardProps {
  black?: boolean
  type: EIconType
  size?: number
  color?: string
}

const EIcon: FC<EIconProps> = (props) => {
  const { black, type, size, className, color, ...restProps } = props
  const classes = classnames('icon', `icon-${type}`, className)
  const styles = {
    display: black ? 'block' : '',
    fontSize: setstylepx(size),
    color,
  }
  return <Text className={classes} style={styles} {...restProps} />
}

EIcon.defaultProps = {
  black: false,
  size: 38,
}
export default EIcon
