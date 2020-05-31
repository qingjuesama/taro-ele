import { USERADDRESS, SETUSERADDRESS, REMOVEUSERADDRESS } from '../action-types'

// 编辑地址
export const atUserAddress = userAddress => ({
  type: USERADDRESS,
  payload: userAddress,
})

// 修改地址
export const setAtUserAddress = userAddress => ({
  type: SETUSERADDRESS,
  payload: userAddress,
})

// 清空
export const removeUserAddress = () => ({ type: REMOVEUSERADDRESS })
