import { FC } from 'react'

import EList, { EListProps } from './EList'
import EItem, { EItemProps } from './EItem'

type TransListProps = FC<EListProps> & {
  EItem: FC<EItemProps>
}

const TransList = EList as TransListProps

TransList.EItem = EItem

export default TransList
