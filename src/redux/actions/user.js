import { USERADDRESS } from '../action-types'

export const atUserAddress = userAddress => ({
  type: USERADDRESS,
  payload: userAddress,
})
