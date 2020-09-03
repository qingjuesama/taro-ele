import React, { FC } from 'react'
import { View, ScrollView, Text } from '@tarojs/components'

import './ActivityModal.scss'

interface ActivityModalProps {
  activities
  onActivityHide
}

const ActivityModal: FC<ActivityModalProps> = (props) => {
  const { activities, onActivityHide } = props
  return (
    <View className='activitymodal'>
      <View className='activitymodal-main'>
        <View className='activitymodal-title'>优惠活动</View>
        <View className='icon icon-guanbi' onClick={onActivityHide}></View>
        <ScrollView scrollY className='activitymodal-list'>
          {activities.map((activitie) => {
            return (
              <View className='activitymodal-item' key={activitie.id}>
                <Text
                  className='activitymodal-item-left'
                  style={{
                    border: `1px ${activitie.border} solid`,
                    color: activitie.text_color,
                  }}
                >
                  {activitie.icon_name}
                </Text>
                <Text className='activitymodal-item-right'>
                  {activitie.description}
                </Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View className='activitymodal-bg' onClick={onActivityHide}></View>
    </View>
  )
}

export default ActivityModal
