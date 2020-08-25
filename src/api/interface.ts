// Ip地址
export interface Ip {
  city: string
  latitude: number
  longitude: number
  recommend: string
}

// 筛选条
export interface Ifilter {
  filter: {
    activity: IFilterFilter
    expenditure: IFilterFilter
    serve: IFilterServe
  }
  nav: {
    distance: INavAndSort
    filter: INavAndSort
    sales: INavAndSort
    sort: INavAndSort
  }
  sort: INavAndSort[]
}

export interface IFilterFilter {
  title: string
  main: INavAndSort[]
}

export interface INavAndSort {
  id: string
  name: string
  value: string
  active?: boolean
}

export interface IFilterServe {
  title: string
  main: IFilterMain[]
}

export interface IFilterMain extends INavAndSort {
  icon: string
  active: boolean
}

// 商家列表
export interface IShopList {
  restaurant: IShopRestaurant
}

export interface IShopRestaurant {
  id: string
  image_path: string
  is_premium: boolean
  distance: number
  name: string
  rating: number
  recent_order_num: number
  order_lead_time: number
  activities: IShopActivities[]
  flavors: IShopFlavors[]
  piecewise_agent_fee: IShopPiecewiseAgentFee
  supports: IShopSupports[]
}

interface IShopActivities {
  attribute: string
  background: IShopActivitiesBackground
  border: string
  description: string
  icon_color: string
  icon_name: string
  id: number
  image_hash: null
  is_exclusive_with_food_activity: boolean
  name: string
  text_color: string
  tips: string
  type: number
}

interface IShopActivitiesBackground {
  rgb_from: string
  rgb_to: string
}

interface IShopFlavors {
  id: number
  name: string
}

interface IShopPiecewiseAgentFee {
  description: string
  extra_fee: number
  is_extra: boolean
  no_subsidy_fee: string
  rules: IShopPiecewiseAgentFeeRules[]
  tips: string
}

interface IShopPiecewiseAgentFeeRules {
  fee: number
  price: number
}

interface IShopSupports {
  border: string
  description: string
  icon_color: string
  icon_name: string
  id: number
  name: string
  text_color: string
  two_characters_icon_name: string
}

// 注册
export interface IRegisterParams {
  phone: string
  password: string
  password2: string
}

export interface IRegister {
  code: number
  message: string
}

// 登录
export interface ILoginParams {
  phone: string
  password: string
}
export interface ILogin {
  code: number
  message: string
  token: string
}
