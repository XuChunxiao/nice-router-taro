import React from 'react'
import EleCarousel from '@/components/elements/ele-carousel'
import ActionFloor from '@/components/navigation/action-floor'
import SectionBar from '@/components/section-bar/section-bar'
import Listof from '@/listof/listof'
import MockService from '@/nice-router/request/mock-service'
import { usePageTitle, usePullDown } from '@/service/use.service'
import { View } from '@tarojs/components'

import { useSelector } from 'react-redux'
import mockForm1Data from '../biz/mock-data/mock-form.data'
import mockForm2Data from '../biz/mock-data/mock-form2.data'
import mockGenericPageData from '../biz/mock-data/mock-genericpage.data'
import { mockProductList, mockUserList } from '../biz/mock-data/mock-list.data'

import './home.scss'

function HomePage(props) {
  const root = useSelector((state) => state.home)
  const { pageTitle } = root
  usePageTitle(pageTitle)
  usePullDown(props)

  // useAsyncEffect(() => NavigationService.view('page:///pages/biz/listof-test-page'))

  const { slideList = mockUserList, actionList = defaultActionList } = root

  return (
    <View className='home-page'>
      <EleCarousel className='home-page-carousel' items={slideList} />
      <View className='home-page-action-floor'>
        <ActionFloor actions={actionList} />
        <SectionBar title='促销抢购' linkToUrl='page:///pages/biz/listof-test-page' />
        <Listof list={mockProductList} displayMode='product' />
      </View>
    </View>
  )
}

export default HomePage

MockService.mockResp('mock-generic-page/', mockGenericPageData)
MockService.mockResp('mock-generic-form/', mockForm1Data)
MockService.mockResp('mock-generic-form-2/', mockForm2Data)

const defaultActionList = [
  {
    id: 1,
    title: 'Listof 测试',
    brief: '有惊喜',
    linkToUrl: 'page:///pages/biz/listof-test-page',
  },
  {
    id: 2,
    title: 'GenericPage 测试',
    brief: '省心',
    linkToUrl: 'mock-generic-page/',
  },
  {
    id: 3,
    title: 'GenericForm 测试',
    brief: '牛逼',
    linkToUrl: 'mock-generic-form/',
  },
  {
    id: 4,
    title: 'H5 测试',
    brief: '某度',
    linkToUrl: 'https://www.baidu.com',
  },
  {
    id: 5,
    title: 'Login 页面',
    brief: '通用',
    linkToUrl: 'page:///pages/login/login-page',
  },
]
