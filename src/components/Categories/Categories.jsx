import Taro from '@tarojs/taro'
import React, { useMemo, useState, useEffect } from 'react'
import classnames from 'classnames'
import { View, ScrollView, Text, Image } from '@tarojs/components'
import imgUrl from '@/src/utils/imgUrl'
import { defaultImg } from '@/src/utils/img'

import './Categories.scss'

const Categories = ({
  foodsPage,
  foodsClass,
  activeFoodPage,
  onfoodPage,
  onSetFoodsPage,
  categoriesId,
}) => {
  // 选中的Class分类
  const [activeClass, setActiveClass] = useState({})
  // 选中的class分类右侧详情
  const [activeClassContent, setActiveClassContent] = useState([])
  const [isShow, setIsShow] = useState(true)
  //
  const [test, setTest] = useState('')
  // 初始化选中的Class第一个分类
  useEffect(() => {
    setActiveClass(foodsClass[0])
    setActiveClassContent(foodsClass[0].sub_categories)
  }, [foodsClass])

  // 切换左侧分类
  const totallClass = categorie => {
    // 更新左侧数据
    setActiveClass(categorie)
    // 更新右侧数据
    setActiveClassContent(categorie.sub_categories)
    // onfoodPage(categorie.sub_categories[0])
  }

  // 打开关闭更多分类
  const openClass = () => {
    setIsShow(flag => !flag)
  }

  // 选中右侧分类更新头部快捷导航及选中项
  const upFoodsPage = (list, item) => {
    onfoodPage(item)
    onSetFoodsPage(list, item)
    openClass()
    setTest('categorie' + item.id)
  }

  // 选中头部分类导航
  const activeFood = categorie => {
    onfoodPage(categorie)
    setTest('categorie' + categorie.id)
  }



  return (
    <View className='categories'>
      <View className='categories-nav'>
        <ScrollView
          scrollX
          className='categories-scroll'
          scrollIntoView={test}
          scrollWithAnimation
        >
          {foodsPage.map(categorie => {
            return (
              <View
                className='categorie'
                key={categorie.id}
                id={'categorie' + categorie.id}
                onClick={() => activeFood(categorie)}
              >
                <Text
                  className={classnames({
                    'categorie-active': activeFoodPage.name === categorie.name,
                  })}
                >
                  {categorie.name}
                </Text>
              </View>
            )
          })}
        </ScrollView>
        <View className='categories-move' onClick={openClass}>
          <Text className='icon icon-jiantou-copy-copy'></Text>
        </View>
      </View>

      <View
        className={classnames('categories-modal', {
          'ele-hide': isShow,
        })}
      >
        <View className='modal-bar'>
          <View className='modal-bar-title'>请选择分类</View>
          <View className='icon icon-guanbi' onClick={openClass}></View>
        </View>
        <View className='modal-main'>
          <ScrollView scrollY className='modal-main-left'>
            {foodsClass.map(categorie => {
              return (
                <View
                  className={classnames('modal-main-left-item', {
                    'modal-active': categorie.id === activeClass.id,
                  })}
                  key={categorie.id}
                  onClick={() => totallClass(categorie)}
                >
                  <View className='modal-main-left-item-text'>
                    {categorie.name}
                  </View>
                  <View className='modal-main-left-item-count'>
                    {categorie.count}
                  </View>
                </View>
              )
            })}
          </ScrollView>
          <ScrollView scrollY className='modal-main-right'>
            {activeClassContent.map(item => {
              return (
                <View
                  className={classnames('modal-main-right-title', {
                    'modal-active': activeFoodPage.name === item.name,
                  })}
                  key={item.id}
                  onClick={() => upFoodsPage(activeClassContent, item)}
                >
                  <Image
                    className='image'
                    src={item.image_url ? imgUrl(item.image_url) : defaultImg}
                  />
                  <View className='modal-main-right-title-text'>
                    {item.name}
                  </View>
                  <View className='modal-main-right-title-count'>
                    {item.count}
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
      <View
        className={classnames('bg', {
          'ele-hide': isShow,
        })}
        onClick={openClass}
      ></View>
    </View>
  )
}

Categories.defaultProps = {
  categories: [],
  categoriesPage: '',
}

export default Categories
