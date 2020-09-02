import Taro, { useRouter } from '@tarojs/taro'
import React, { useEffect, useState, useCallback } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import _ from 'lodash'

import { H5 } from '../../config/base'
import getDom from '../../utils/getDom'
import defaultShopImg from '../../assets/images/default-shop.svg'

import API from '../../api'
import imgUrl from '../../utils/imgUrl'
import ETabs from '../../components/ETabs/ETabs'
import ShopInfoModal from './components/ShopInfoModal/ShopInfoModal'
import ActivityModal from './components/ActivityModal/ActivityModal'
import Recommend from './components/Recommend/Recommend'
import LeftBar from './components/LeftBar/LeftBar'
import ShopItem from './components/ShopItem/ShopItem'
import Cart from './components/Cart/Cart'
import Estimate from './components/Estimate/Estimate'
import ShopInfo from './components/ShopInfo/ShopInfo'
import ShopHead from './components/Head/Head'

import './index.scss'

const MyShop = () => {
  const { params } = useRouter()
  // 商品列表
  const [goods, setGoods] = useState<any>([])
  // 商家信息
  const [shopInfo, setShopInfo] = useState<any>({})
  // 推荐商品
  const [recommend, setRecommend] = useState<any>({})
  // 加载完毕
  const [isOk, setIsOk] = useState(false)
  // 商家标题弹出层
  const [modalHide, setModalHide] = useState(true)
  // 优惠详情
  const [activityHide, setActivityHide] = useState(true)
  // Tabs
  const [tabs] = useState([
    {
      title: '点餐',
    },
    {
      title: '评价',
    },
    {
      title: '商家',
    },
  ])
  // 商品列表 右侧Top距离数组
  const [rightScrollArr, setRightScrollArr] = useState([])
  // 商品列表 右侧Top距离
  const [rightTop, setRightTop] = useState(0)
  // 商品列表  左侧滚动index
  const [leftIndex, setLeftIndex] = useState(0)
  const [fHeight, setFHeight] = useState(0)
  // 商家评价
  const [userEstimate, setUserEstimate] = useState({
    comments: [],
    rating: {},
    tags: [],
  })
  // 购物车信息
  const [cartInfo, setCartInfo] = useState<any>({
    boxPrice: 0, // 餐盒费
    deliveryPrice: 0, // 配送费
    goodTotal: 0, // 总数量
    totalPrice: 0, // 现总价格
    originalPrice: 0, // 原总价
    isInterval: false, // 是否有必选品
    isActiveInterval: false, // 是否选择必选品,
    foods: [], // 选择商品列表
    shopPhone: '',
  })

  // 发送请求
  useEffect(() => {
    const { id } = params
    // 发送请求获取 商家信息 , 商家评论
    Promise.all([API.reqGetShop({ id }), API.reqEstimate({ id })]).then(
      (dataArr) => {
        const [shop, estimate] = dataArr
        const { err: shopErr, res: shopData } = shop
        const { err: estimateErr, res: estimateData } = estimate

        if (shopErr || estimateErr) {
          Taro.reLaunch({ url: '/pages/msite/index' })
          return
        }

        if (shopData.code === 0) {
          setGoods(shopData.data.menu)
          setShopInfo(shopData.data.rst)
          shopData.data.recommend[0] && setRecommend(shopData.data.recommend[0])
          intervalFoods(shopData.data.menu)
        } else {
          console.log(shopData)
        }

        if (estimateData.code === 0) {
          setUserEstimate(estimateData.data)
          initRightScrollTop()
          setIsOk(true)
          _setHeight()
        } else {
          console.log(estimateData)
        }

        if (shopData.code !== 0 || estimateData.code !== 0) {
          Taro.redirectTo({ url: '/pages/msite/index' })
        }
      }
    )
  }, [params])

  // 打开商家弹出层
  const onOpenModal = () => {
    setModalHide((flag) => !flag)
  }
  const onActivityHide = () => {
    setActivityHide((flag) => !flag)
  }

  // 当前index 索引
  const _getIndex = (e) => {
    const atScroll = e.detail.scrollTop
    // 右侧index区间
    const atIndex = rightScrollArr.findIndex((item, index, arr) => {
      return atScroll >= item && atScroll < arr[index + 1]
    })
    // 设置左侧商品分类index
    setLeftIndex(atIndex === -1 ? rightScrollArr.length - 1 : atIndex)
  }

  // 商品展示区与是否在当前视口,更新top值
  const _setTop = async () => {
    const res: any = await getDom('#order-scroll')
    if (res[0][0].top > 40) {
      !H5 && Taro.pageScrollTo({ scrollTop: 9999 })
      H5 && window.scrollTo(0, 9999)
    }
  }

  // 右侧商品滚动事件
  const onScroll = _.throttle((e) => {
    _getIndex(e)
    _setTop()
  }, 200)

  // 左侧选中 右侧滚动
  const setRightScroll = (i) => {
    setRightTop(rightScrollArr[i])
  }

  // 初始化 右侧商品Top值
  const initRightScrollTop = () => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery()
      query.selectAll('.myshop-order-main-right-block').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec((res) => {
        if (res[0][0]) {
          const initTop = res[0][0].top
          const newRes = res[0].map((item) => Math.ceil(item.top - initTop))
          setRightScrollArr(newRes)
        }
      })
    }, 500)
  }

  // 单个商品购买数量
  const count = useCallback(
    (good) => {
      const newCount = cartInfo.foods.find(
        (mygood) => mygood.vfood_id === good.vfood_id
      )
      if (newCount) {
        return newCount.count
      }
      return 0
    },
    [cartInfo]
  )

  // 左侧分类数量
  const classCount = useCallback(
    (good) => {
      let result = 0
      cartInfo.foods.forEach((item) => {
        good.foods.forEach((citem) => {
          if (item.vfood_id === citem.vfood_id) {
            result += item.count
          }
        }, 0)
      })
      return result
    },
    [cartInfo]
  )

  // 更新购物车数据
  const updateCart = (good, name) => {
    setCartInfo((data) => {
      if (name === 'add') {
        addGood(data, good)
      } else if (name === 'dec') {
        decGood(data, good)
      }
      data.boxPrice = boxPrice(data)
      data.goodTotal = total(data)
      data.totalPrice = totalPrice(data)
      data.originalPrice = originalPrice(data)
      data.isActiveInterval = intervalIsFoods(data)
      data.deliveryPrice = shopInfo.float_delivery_fee
      data.shopPhone = shopInfo.phone
      return { ...data }
    })
  }

  // 增加商品
  const addGood = (data, good) => {
    const result = data.foods.find((food) => food.vfood_id == good.vfood_id)
    if (result) {
      result.count++
    } else {
      data.foods.push({ ...good, count: 1 })
    }
  }

  // 减少商品
  const decGood = (data, good) => {
    const result = data.foods.find((food) => food.vfood_id == good.vfood_id)
    const index = data.foods.findIndex(
      (item) => item.vfood_id === good.vfood_id
    )
    if (result.count > 1) {
      result.count--
    } else {
      data.foods.splice(index, 1)
    }
  }

  // 餐盒费
  const boxPrice = (data) => {
    return data.foods.reduce((pre, food) => {
      if (food.price > 1) {
        pre += food.count
      }
      return pre
    }, 0)
  }

  // 总数量
  const total = (data) => {
    return data.foods.reduce((pre, food) => {
      return (pre += food.count)
    }, 0)
  }

  // 现总价格
  const totalPrice = (data) => {
    const result = data.foods.reduce((pre, food) => {
      return (pre += Number.parseFloat(food.price) * 1000 * food.count)
    }, 0)
    return result / 1000
  }

  // 原总价
  const originalPrice = (data) => {
    const result = data.foods.reduce((pre, food) => {
      return (pre += Number.parseFloat(food.origin_price) * 1000 * food.count)
    }, 0)
    return result / 1000
  }

  // 是否存在必选品
  const intervalFoods = (menu) => {
    const myfood = menu.filter((good) => Number.parseInt(good.type) === 4)
    if (myfood.length) {
      setCartInfo((data) => ({ ...data, isInterval: true }))
    }
  }

  // 是否选择必选品
  const intervalIsFoods = (data) => {
    let flag = false
    if (data.isInterval) {
      const myfood = goods.filter((good) => Number.parseInt(good.type) === 4)
      myfood[0].foods.forEach((cfood) => {
        data.foods.forEach((food) => {
          if (cfood.vfood_id === food.vfood_id) {
            flag = true
          }
        })
      })
    }
    return flag
  }

  // 清空购物车
  const clearCart = () => {
    setCartInfo((data) => {
      data.boxPrice = 0 // 餐盒费
      data.deliveryPrice = 0 // 配送费
      data.goodTotal = 0 // 总数量
      data.totalPrice = 0 // 现总价格
      data.originalPrice = 0 // 原总价
      data.isActiveInterval = false // 是否选择必选品,
      data.foods = [] // 选择商品列表
      data.shopPhone = ''
      return { ...data }
    })
  }

  // 返回
  const onBack = () => {
    Taro.reLaunch({ url: '/pages/msite/index' })
  }

  // 结算
  const settleAccounts = () => {
    const clearing = { cartInfo, shopInfo }
    Taro.setStorageSync('clearing', clearing)
    Taro.navigateTo({
      url: `/pages/clearing/index`,
    })
  }

  const _setHeight = () => {
    Taro.getSystemInfo({
      success: (res) => {
        const height = res.windowHeight - 50 - 40
        setFHeight(height)
      },
    })
  }

  if (!isOk) {
    return <Image className='default-shop-img' src={defaultShopImg} />
  }

  return (
    <View className='myshop' id='myshop'>
      <ShopHead
        shopInfo={shopInfo}
        onOpenModal={onOpenModal}
        onActivityHide={onActivityHide}
        onBack={onBack}
      />
      {/* 商家介绍弹出层 */}
      <ShopInfoModal
        shopInfo={shopInfo}
        onOpenModal={onOpenModal}
        modalHide={modalHide}
      />
      {/* 优惠活动弹出层 */}
      {!activityHide && (
        <ActivityModal
          activities={shopInfo.activities}
          onActivityHide={onActivityHide}
        />
      )}

      <View className='myshop-content'>
        <ETabs tabs={tabs}>
          <View className='myshop-order'>
            {shopInfo.posters[0] && (
              <View className='myshop-order-banner'>
                <Image
                  className='myshop-order-banner-img'
                  src={imgUrl(shopInfo.posters[0].image_hash)}
                />
              </View>
            )}
            {recommend.name && (
              <View className='myshop-order-recommend'>
                <View className='myshop-order-recommend-title'>
                  {recommend.name}
                </View>
                <ScrollView scrollX className='myshop-order-recommend-main'>
                  {recommend.items.map((item) => {
                    return (
                      <Recommend
                        key={item.item_id}
                        onUpdateCart={updateCart}
                        recData={item}
                        count={count(item)}
                      />
                    )
                  })}
                </ScrollView>
              </View>
            )}

            <View id='order-scroll' className='myshop-order-main'>
              <View
                className='myshop-order-main-content'
                style={{ height: fHeight + 'px' }}
              >
                <ScrollView scrollY className='myshop-order-main-left'>
                  {goods.map((good, i) => {
                    return (
                      <LeftBar
                        key={good.id}
                        good={good}
                        isActive={i === leftIndex}
                        onActive={() => setRightScroll(i)}
                        classCount={classCount(good)}
                      />
                    )
                  })}
                </ScrollView>

                <ScrollView
                  scrollY
                  onScroll={onScroll}
                  scrollTop={rightTop}
                  className='myshop-order-main-right'
                >
                  {goods.map((good) => {
                    return (
                      <View
                        className='myshop-order-main-right-block'
                        key={good.id}
                      >
                        <View className='myshop-order-main-right-title'>
                          <View className='myshop-order-main-right-name'>
                            {good.name}
                          </View>
                          <View className='myshop-order-main-right-des'>
                            {good.description}
                          </View>
                        </View>

                        {good.foods.map((food, index) => (
                          <ShopItem
                            key={food.item_id + index}
                            food={food}
                            count={count(food)}
                            onUpdateCart={updateCart}
                          />
                        ))}
                      </View>
                    )
                  })}
                </ScrollView>
              </View>
              <View style={{ height: '50px' }}>
                {/* 购物车 */}
                <Cart
                  cartInfo={cartInfo}
                  onUpdateCart={updateCart}
                  count={count}
                  shopInfo={shopInfo}
                  onClearCart={clearCart}
                  onSettleAccounts={settleAccounts}
                />
              </View>
            </View>
          </View>

          <View className='myshop-appraise'>
            <Estimate userEstimate={userEstimate} />
          </View>

          <View className='myshop-shopinfo'>
            <ShopInfo shopInfo={shopInfo} />
          </View>
        </ETabs>
      </View>
    </View>
  )
}

export default MyShop
