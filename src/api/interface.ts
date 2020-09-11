// Ip地址
export interface Ip {
  city: string
  latitude: number
  longitude: number
  recommend: string
}

// 导航分类
export interface INavSwiper {
  id: number
  name: string
  image_hash: string
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

// 用户信息
export interface IUserInfo {
  headImg: string
  id?: string
  phone: string
  userName: string
}

// 修改用户名
export interface IUserNameParams {
  userName: string
}
// 修改密码
export interface PasswordParams {
  oldPassWord: string
  newPassWord: string
}
// 获取地址
export interface IUserAddressParams {
  id: string
}

// 地址
export interface Address {
  address: string
  address_detail: string
  city: string
  id: string
  latitude: string
  longitude: string
  name: string
  phone: string
  sex: string
}

// 城市列表
export interface GETCityList {
  alphabet: string[]
  cityList: CityList[]
}

export interface Cities {
  id: string
  latitude: string
  longitude: string
  name: string
  pinyin: string
}
export interface CityList {
  cities: Cities[]
  idx: string
}

// 热门搜索
export interface HotSearchWords {
  word: string
}

// 商家列表详情 筛选头
export interface FoodsPage {
  id: number
  name: string
  restaurant_category_ids: number[]
}

// 商家列表详情 筛选头
export interface FoodsClass {
  count: number
  id: number | null
  ids: number[]
  level: number
  name: string
  sub_categories: SubCategories[]
}
export interface SubCategories {
  count: number
  id: number
  ids: null
  image_url: string
  level: number
  name: string
  sub_categories: any[]
}
