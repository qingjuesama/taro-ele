import { ADDCART } from '../action-types'

const initCart = {
  totalPrice: 0, // (现)总价
  originalPrice: 0, // (原)总价
  boxPrice: 0, // 餐盒费
  foodTotal: 0, // 总数量
  foods: [],
}
const cart = (state = initCart, action) => {
  const { type, payload } = action
  switch (type) {
    case ADDCART:
      const index = state.foods.findIndex()
      state.foods.push(payload)
      return { ...state }
    default:
      return state
  }
}

export default { cart }
