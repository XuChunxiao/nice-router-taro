import React from 'react'
import { ScrollView } from '@tarojs/components'
import { useState } from 'react'
import { AtCurtain } from 'taro-ui'

import EleFlex from './ele-flex'

export default function ElePopup(props) {
  const [show, setShow] = useState(true)
  const onClose = () => setShow(false)

  return (
    <AtCurtain isOpened={show} onClose={onClose}>
      <ScrollView scrollY scrollWithAnimation scrollTop='0' style='max-height: 750rpx;'>
        <EleFlex {...props} />
      </ScrollView>
    </AtCurtain>
  )
}
