import Taro from '@tarojs/taro'
import React, { FC, useState } from 'react'
import { View, Text, Image, ScrollView, RichText } from '@tarojs/components'
import _ from 'lodash'
import classnames from 'classnames'
import Star from '../../../../components/Star/Star'
import imgUrl from '../../../../utils/imgUrl'
import getDom from '../../../../utils/getDom'
import API from '../../../../api'
import { H5, defaultImg } from '../../../../config/base'

import './Estimate.scss'

interface EstimateProps {
  userEstimate
}

const Estimate: FC<EstimateProps> = (props) => {
  const { userEstimate } = props
  const { comments, rating, tags } = userEstimate
  // 当前分类
  const [activeTagName, setActiveTagName] = useState(tags[0].name)
  // 是否查看有内容的评价
  const [avtiveContent, setActiveContent] = useState(true)
  // 评价列表[全部分类里]
  const [commentsList, setCommentsList] = useState(comments)
  const [offset, setOffset] = useState(0)
  // 请求状态,是否还有数据
  const [isMore, setIsMore] = useState(true)
  // 请求条数
  const limit = 10

  // 初始化数据
  const initParams = () => {
    setCommentsList([])
    setOffset(0)
    setIsMore(true)
  }

  // 切换选项卡
  const toggleTag = (name) => {
    initParams()
    setActiveTagName(name)
    getRatings(true, name, 0, avtiveContent)
  }

  // 切换只看内容评价
  const toggleContent = (flag) => {
    initParams()
    setActiveContent(!flag)
    getRatings(true, activeTagName, 0, !flag)
  }

  // 评价内容
  const evaluationContent = (comment) => {
    const obj = comment.highlights_v2
    let text = comment.rating_text
    for (let key in obj) {
      text = text.replace(key, `<span class='good'>${key}</span>`)
    }
    return text
  }

  // 预览大图
  const openImg = (img, imgs) => {
    const urls = imgs.map((mimg) => imgUrl(mimg.image_hash))
    Taro.previewImage({
      current: imgUrl(img.image_hash),
      urls,
    })
  }

  // 请求数据
  const getRatings = async (
    pisMore,
    pactiveTagName,
    poffset,
    pavtiveContent
  ) => {
    if (pisMore) {
      const { err, res } = await API.reqRatings({
        name: pactiveTagName,
        offset: poffset,
        limit: limit,
        has_content: pavtiveContent,
      })

      if (err) {
        console.log(err)
        return
      }

      if (res.code === 0) {
        if (res.data.length > 0) {
          setOffset((count) => count + limit)
          setCommentsList((list) => [...list, ...res.data])
        } else {
          setIsMore(false)
          Taro.showToast({ title: '没有更多了', icon: 'none', mask: true })
        }
      }
    }
  }

  const commentsScrolly = () => {
    getRatings(isMore, activeTagName, offset, avtiveContent)
  }

  // 1吐槽 2较差 3一般 4较差 5吐槽
  const textTip = (comment) => {
    let color, text
    switch (comment.rating) {
      case 5:
        color = '#ff6000'
        text = '超赞'
        break
      case 4:
        color = '#ff6000'
        text = '满意'
        break
      case 3:
        color = '#fb9a0b'
        text = '一般'
        break
      case 2:
        color = '#899fbc'
        text = '较差'
        break
      case 1:
        color = '#899fbc'
        text = '吐槽'
        break
    }

    return (
      <Text className='grade-tip' style={{ color: color }}>
        {text}
      </Text>
    )
  }

  // 滚动监听
  const onScroll = _.throttle(async () => {
    const [result] = await getDom('.tags')
    if (result[0].top > 115) {
      !H5 &&
        Taro.pageScrollTo({
          scrollTop: 9999,
        })
      H5 && window.scrollTo(0, 9999)
    }
  }, 200)

  return (
    <ScrollView
      scrollY
      lowerThreshold={100}
      onScrollToLower={commentsScrolly}
      className='estimate'
      onScroll={onScroll}
    >
      <View className='rating'>
        <View className='rating-left'>
          <View className='total'>{rating.overall_score}</View>
          <View className='total-xx'>
            <View className='total-xx-title'>商家评分</View>
            <Star rating={rating.overall_score} />
          </View>
        </View>
        <View className='rating-right'>
          <View className='estimate-right-item'>
            <View className='estimate-right-item-title'>味道</View>
            <View className='estimate-right-item-rating'>
              {rating.taste_score}
            </View>
          </View>
          <View className='estimate-right-item'>
            <View className='estimate-right-item-title'>包装</View>
            <View className='estimate-right-item-rating'>
              {rating.package_score}
            </View>
          </View>
          <View className='estimate-right-item'>
            <View className='estimate-right-item-title'>配送</View>
            <View className='estimate-right-item-rating'>
              {rating.rider_score}
            </View>
          </View>
        </View>
      </View>
      <View className='comments'>
        <View className='tags'>
          {tags.map((tag) => {
            return (
              <View
                className={classnames('tag', {
                  'tag-active': activeTagName === tag.name,
                })}
                onClick={() => toggleTag(tag.name)}
                key={tag.name}
              >
                {tag.name}
                {tag.count >= 0 && tag.count}
              </View>
            )
          })}
        </View>
        <View
          className='content-rating'
          onClick={() => toggleContent(avtiveContent)}
        >
          <Text
            className={classnames('icon icon-success_fill', {
              'active-icon': avtiveContent === true,
            })}
          ></Text>
          <Text className='content-rating-text'>只看有内容的评价</Text>
        </View>
        <View className='comments-list'>
          {commentsList.map((comment, index) => {
            return (
              <View className='comments-item' key={comment.order_id + index}>
                <View className='avatar'>
                  {comment.avatar ? (
                    <Image
                      className='avatar-img'
                      src={imgUrl(comment.avatar)}
                    />
                  ) : (
                    <Image className='avatar-img' src={defaultImg} />
                  )}
                </View>
                <View className='comments-item-content'>
                  <View className='usernametime'>
                    <View className='usernametime-name'>
                      {comment.username}
                    </View>
                    <View className='usertime'>{comment.rated_at}</View>
                  </View>
                  <View className='grade'>
                    <Star rating={comment.rating} />
                    {textTip(comment)}
                  </View>
                  <View className='leaveword'>
                    <RichText
                      nodes={evaluationContent(comment)}
                      className='leaveword-text'
                    ></RichText>
                    <View className='leaveword-images'>
                      {comment?.order_images?.map((img) => {
                        return (
                          <View
                            className='leaveword-images-item'
                            key={img.image_hash}
                          >
                            <Image
                              src={imgUrl(img.image_hash)}
                              className='leaveword-images-img'
                              onClick={() => openImg(img, comment.order_images)}
                            />
                          </View>
                        )
                      })}
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

export default Estimate
