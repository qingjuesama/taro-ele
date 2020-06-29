import Taro from '@tarojs/taro'
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react'
import { View, Image, Text, ScrollView, Button } from '@tarojs/components'
import { Transition } from 'react-spring/renderprops'
import { reqGetShop } from '@/src/api'
import imgUrl from '@/src/utils/imgUrl'
import Tabs from '@/src/components/Tabs/Tabs'
import defaultShopImg from '@/src/assets/images/default-shop.svg'
import Modal from './components/Modal/Modal'
import Recommend from './components/Recommend/Recommend'
import LeftBar from './components/LeftBar/LeftBar'
import ShopItem from './components/ShopItem/ShopItem'
import Cart from './components/Cart/Cart'

import './index.scss'

const MyShop = () => {
  // 商品列表
  const [goods, setGoods] = useState([])
  // 商家信息
  const [shopInfo, setShopInfo] = useState({})
  // 推荐商品
  const [recommend, setRecommend] = useState([])
  // 加载完毕
  const [isOk, setIsOk] = useState(false)
  // 商家标题弹出层
  const [modalHide, setModalHide] = useState(true)
  // 滚动到底部
  const [scrollNum, setScrollNum] = useState(0)
  // 节流
  const flagRef = useRef()
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
  const [rightScrollArr, setRightScrollArr] = useState([])
  const [rightTop, setRightTop] = useState(0)
  const [leftIndex, setLeftIndex] = useState(0)
  const [cartInfo, setCartInfo] = useState({
    foods: [],
  })

  // 发送请求获取商家信息
  useEffect(() => {
    reqGetShop().then(res => {
      if (res.code === 0) {
        setGoods(res.data.menu)
        setShopInfo(res.data.rst)
        setRecommend(res.data.recommend[0])
        setIsOk(true)
        initRightScrollTop()
      } else {
        Taro.redirectTo({ url: '/pages/msite/index' })
      }
    })
  }, [])

  // 打开商家弹出层
  const openModal = () => {
    setModalHide(flag => !flag)
  }

  // 获取筛选据顶部距离
  const onScroll = useCallback(
    e => {
      if (scrollNum === 0) {
        setScrollNum(999)
      }

      const atScroll = e.detail.scrollTop
      const atIndex = rightScrollArr.findIndex((item, index, arr) => {
        return atScroll >= item && atScroll < arr[index + 1]
      })
      setLeftIndex(atIndex)
    },
    [scrollNum, rightScrollArr]
  )

  // 左侧选中 右侧滚动
  const setRightScroll = i => {
    setRightTop(rightScrollArr[i])
  }

  // 初始化 右侧商品Top值
  const initRightScrollTop = () => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery()
      query.selectAll('.myshop-order-main-right-block').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(res => {
        if (res[0][0]) {
          const initTop = res[0][0].top
          const newRes = res[0].map(item => Math.ceil(item.top - initTop))
          setRightScrollArr(newRes)
        }
      })
    }, 0)
  }

  // 推荐增加
  const goodAdd = good => {
    setCartInfo(data => {
      // 初始
      if (good.count >= 1) {
        data.foods.some(item => {
          if (item.vfood_id === good.vfood_id) {
            item.count++
          }
        })
      } else {
        good.count = 1
        data.foods.push(good)
      }
      return { ...data }
    })
  }
  // 推荐减少
  const goodDec = good => {
    setCartInfo(data => {
      if (good.count > 1) {
        data.foods.some(item => {
          if (item.vfood_id === good.vfood_id) {
            item.count--
          }
        })
      } else {
        // 删除商品
        good.count = 0
        const index = data.foods.findIndex(
          item => item.vfood_id === good.vfood_id
        )
        data.foods.splice(index, 1)
      }
      return { ...data }
    })
  }

  // 单个商品购买数量
  const count = useCallback(
    good => {
      const newCount = cartInfo.foods.find(
        mygood => mygood.vfood_id === good.vfood_id
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
    good => {
      let result = 0
      cartInfo.foods.forEach(item => {
        good.foods.forEach(citem => {
          if (item.vfood_id === citem.vfood_id) {
            result += item.count
          }
        }, 0)
      })
      return result
    },
    [cartInfo]
  )

  if (!isOk) {
    return <Image className='default-shop-img' src={defaultShopImg} />
  }

  return (
    <ScrollView scrollY scrollTop={scrollNum} className='myshop'>
      {/* {console.log(scrollNum)} */}
      {/* {console.log(shopInfo)} */}
      {/* {console.log(goods)} */}
      {/* {console.log(recommend)} */}
      <View className='myshop-top'>
        <View
          className='myshop-top-bg'
          style={{
            background: `url(${imgUrl(shopInfo.shop_sign.image_hash)})`,
          }}
        >
          <View className='icon icon-fanhui'></View>
        </View>
        <View className='myshop-top-main'>
          <View className='myshop-logo'>
            <View className='myshop-logo-pinpai'>品牌</View>
            <Image
              className='myshop-logo-img'
              src={imgUrl(shopInfo.image_path)}
            />
          </View>
          <View className='myshop-name' onClick={openModal}>
            <View className='myshop-name-title'>{shopInfo.name}</View>
            <View className='icon icon-jiantou'></View>
          </View>
          <View className='myshop-pingjia'>
            <Text className='myshop-pingjia-item'>评价{shopInfo.rating}</Text>
            <Text className='myshop-pingjia-item myshop-pingjia-item-c'>
              月售{shopInfo.recent_order_num}单
            </Text>
            <Text className='myshop-pingjia-item'>
              {shopInfo.delivery_mode.text}约{shopInfo.order_lead_time}分钟
            </Text>
          </View>
          <View className='myshop-tags'>
            <View className='myshop-tags-left'>
              {shopInfo.activity_tags.map(tag => {
                return (
                  <Text className='myshop-tags-left-tag' key={tag.text}>
                    {tag.text}
                  </Text>
                )
              })}
            </View>
            <View className='myshop-tags-right'>
              <View className='myshop-tags-right-title'>6个优惠</View>
              <View className='icon icon-xiajiantou'></View>
            </View>
          </View>
          <View className='myshop-notice'>
            <Text className='myshop-notice-content'>
              公告：助力环保，我们做起！我们的打包袋是可降解环保袋；为了减少一次性餐具使用，筷子是可循环使用的，请您在结算备注处填写餐具数量，或者选择无需餐具，感谢支持！
            </Text>
          </View>
        </View>
      </View>

      {/* 商家简单介绍弹出层 */}
      <Modal
        shopInfo={shopInfo}
        onOpenModal={openModal}
        modalHide={modalHide}
      />
      <View className='myshop-content'>
        <Tabs tabs={tabs}>
          <View className='myshop-order'>
            <View className='myshop-order-banner'>
              <Image
                className='myshop-order-banner-img'
                src={imgUrl(shopInfo.posters[0].image_hash)}
              />
            </View>
            <View className='myshop-order-recommend'>
              <View className='myshop-order-recommend-title'>
                {recommend.name}
              </View>
              <ScrollView scrollX className='myshop-order-recommend-main'>
                {recommend.items.map(item => {
                  return (
                    <Recommend
                      key={item.item_id}
                      recData={item}
                      onRecAdd={goodAdd}
                      onRecDec={goodDec}
                      count={count(item)}
                    />
                  )
                })}
              </ScrollView>
            </View>

            <View id='order-scroll' className='myshop-order-main'>
              <ScrollView
                scrollY
                scrollIntoView=''
                className='myshop-order-main-left'
              >
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
                {goods.map(good => {
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

                      {good.foods.map(food => (
                        <ShopItem
                          key={food.item_id}
                          food={food}
                          count={count(food)}
                          onAdd={goodAdd}
                          onDec={goodDec}
                        />
                      ))}
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          </View>
          <View className='myshop-appraise'>2</View>
          <View className='myshop-shopinfo'>3</View>
        </Tabs>
      </View>

      {/* 购物车 */}
      <Cart />
    </ScrollView>
  )
}

export default MyShop
